import { useState, useEffect } from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import isEqual from 'lodash.isequal';

const registry = {
  store: null,
  models: {},
  register(model) {
    if (!this.models[model.name]) {
      if (!model.name) {
        throw new Error('invalid model: Missing model name');
      }
      model.dispatch = action => {
        if (!action.type) {
          return;
        }
        action.type = `${model.name}/${action.type}`;
        this.store.dispatch(action);
      };
      model.getState = selector => {
        const state = this.store.getState()[model.name];
        if (!selector || typeof selector !== 'function') return state;
        return selector(state);
      };
      const actions = { ...model.actions };
      const patchedActions = Object.keys(actions).reduce(
        (v, a) => ({
          // @ts-ignore
          ...v,
          [a]: (...args) =>
            model.dispatch({ type: a, payload: actions[a](...args) })
        }),
        {}
      );
      model.actions = patchedActions;

      this.models[model.name] = model;
    }
  },
  getModel(m) {
    if (!this.models[m]) {
      throw new Error(`Model '${m}' not exists`);
    }
    return this.models[m];
  },
  initStore() {
    const modelNames = Object.keys(this.models);
    const initState = modelNames.reduce(
      (v, m) => ({ ...v, [m]: this.models[m].state || {} }),
      {}
    );
    const reducer = (state, { type, payload }) => {
      if (type === '@@INIT') {
        return state;
      }
      const [prefix, action, effectStatus] = type.split('/');
      try {
        if (prefix === '@@redux') {
          return state;
        }
        const m = this.getModel(prefix);
        if (!action || !m.reducers[action]) {
          return state;
        }
        return {
          ...state,
          [m.name]: {
            ...state[m.name],
            ...m.reducers[action](state[m.name], payload, effectStatus)
          }
        };
      } catch (e) {
        console.error(e);
        return state;
      }
    };
    const middleware = () => next => action => {
      const state = next(action);
      const [prefix, type, effectStatus] = action.type.split('/');
      if (!type || effectStatus) {
        return state;
      }
      try {
        const m = this.getModel(prefix);
        const effect = m.effects && m.effects[type] ? m.effects[type] : null;
        if (!effect) {
          return state;
        }
        const onFinished = status => payload =>
          m.dispatch({
            type: `${type}/${status}`,
            payload
          });
        effect.call(
          m,
          action.payload,
          onFinished('success'),
          onFinished('error')
        );
      } catch (e) {
        // do nothing
      }
      return state;
    };
    const enhencer =
      process.env.NODE_ENV === 'development' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;
    this.store = createStore(
      reducer,
      initState,
      enhencer(applyMiddleware(middleware))
    );
  }
};

export function registerModels(...models) {
  models.forEach(m => registry.register(m));
}

export function useModel(name, selector) {
  if (!registry.store) {
    registry.initStore();
  }

  const m = registry.getModel(name);
  const initState = m.getState(selector);
  const [state, setState] = useState(initState);

  useEffect(() => {
    let currentState = state;
    if (!isEqual(state, initState)) {
      setState(initState);
      currentState = initState;
    }

    const unsub = registry.store.subscribe(() => {
      const nextState = m.getState(selector);
      if (!isEqual(currentState, nextState)) {
        currentState = nextState;
        setState(currentState);
      }
    });
    return () => unsub();
  }, [selector, m, initState, state]);

  return [initState, m.actions];
}
