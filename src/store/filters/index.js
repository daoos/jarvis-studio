const filters = {
  state: {
    dateFilterSelected: { dateLabel: "Last 30 Days", nbDays: 30 },
    dateFilters: [
      { dateLabel: "Last 30 Days", nbDays: 31 },
      { dateLabel: "Last 7 Days", nbDays: 7 },
      { dateLabel: "Yesterday", nbDays: 1 },
      { dateLabel: "Today", nbDays: 0 },
      { dateLabel: "Last 90 Days", nbDays: 90 }
    ]
  },
  mutations: {
    updateDateFilterSelected(state, dateFilterSelected) {
      state.dateFilterSelected = dateFilterSelected;
    }
  },
  actions: {},
  getters: {
    dateFilterSelected(state) {
      return state.dateFilterSelected;
    },
    dateFilters(state) {
      return state.dateFilters;
    }
  }
};

export default filters;
