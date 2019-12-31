export default {
  name: 'newWords',
  state: {
    byId: {},
    filter: {},
    addState: {},
    editState: {},
    deleteState: {}
  },
  reducers: {
    changeCollapsed: (state, payload) => {
      return {
        collapsed: payload.collapsed
      };
    }
  },
  actions: {
    changeCollapsed: collapsed => ({ collapsed })
  }
};
