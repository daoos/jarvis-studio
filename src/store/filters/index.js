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
      //Compute the date array from minDateFilter to Now to build chart
    }
  },
  getters: {
    periodFiltered(state) {
      //Compute the date array from minDateFilter to Now to build chart
      let periodFiltered = [];
      var i;
      for (i = 0; i <= state.dateFilterSelected.nbDays; i++) {
        periodFiltered.push(
          moment()
            .utc()
            .startOf("day")
            .subtract(state.dateFilterSelected.nbDays - i, "days")
            .toISOString()
        );
      }
      return periodFiltered;
    }
  }
};

export default filters;
