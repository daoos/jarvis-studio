import moment from "moment";
import _ from "lodash";

const filters = {
  state: {
    dateFilterSelected: { dateLabel: "Last 30 Days", nbDays: 31 },
    dateFilters: [
      { dateLabel: "Today", nbDays: 0 },
      { dateLabel: "Yesterday", nbDays: 1 },
      { dateLabel: "Last 7 Days", nbDays: 7 },
      { dateLabel: "Last 30 Days", nbDays: 31 },
      { dateLabel: "Last 90 Days", nbDays: 90 }
    ],
    minDateFilter: moment()
      .utc()
      .startOf("day")
      .subtract(31, "days")
      .toISOString()
  },
  mutations: {
    updateDateFilterSelected(state, dateFilterSelected) {
      state.dateFilterSelected = dateFilterSelected;
    },
    updateMinDateFilter(state, dateFilterSelected) {
      state.minDateFilter = moment()
        .utc()
        .startOf("day")
        .subtract(dateFilterSelected.nbDays, "days")
        .toISOString();
    }
  },
  actions: {
    applyDateFilterSelected({ commit }, dateFilterSelected) {
      //Propagate the DateFilterSelected to the store
      commit("updateDateFilterSelected", dateFilterSelected);
      //Compute the minDate to apply from the DateFilterSelected
      commit("updateMinDateFilter", dateFilterSelected);
    }
  },
  getters: {}
};

export default filters;
