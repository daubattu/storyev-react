export default {
  name: 'ui',
  state: {
    collapsed: false,
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
