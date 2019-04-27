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
    envFilterSelected: { envLabel: "All Env.", envId: "ALL" },
    envFilters: [
      { envLabel: "All Env.", envId: "ALL" },
      { envLabel: "Production", envId: "PROD" },
      { envLabel: "Test", envId: "TEST" },
      { envLabel: "Development", envId: "DEV" }
    ],
    minDateFilter: moment()
      .utc()
      .startOf("day")
      .subtract(31, "days")
      .toISOString(),
    accountFilterSelected: { account_name: "All Accounts", id: "000000" }
  },
  mutations: {
    updateDateFilterSelected(state, dateFilterSelected) {
      state.dateFilterSelected = dateFilterSelected;
    },
    updateEnvFilterSelected(state, envFilterSelected) {
      state.envFilterSelected = envFilterSelected;
    },
    updateMinDateFilter(state, dateFilterSelected) {
      state.minDateFilter = moment()
        .utc()
        .startOf("day")
        .subtract(dateFilterSelected.nbDays, "days")
        .toISOString();
    },
    updateAccountFilterSelected(state, accountFilterSelected) {
      state.accountFilterSelected.account_name =
        accountFilterSelected.account_name;
      state.accountFilterSelected.id = accountFilterSelected.id;
    }
  },
  actions: {
    applyDateFilterSelected({ commit }, dateFilterSelected) {
      //Propagate the DateFilterSelected to the store
      commit("updateDateFilterSelected", dateFilterSelected);
      //Compute the minDate to apply from the DateFilterSelected
      commit("updateMinDateFilter", dateFilterSelected);
    },
    applyAccountFilterSelected({ commit }, accountFilterSelected) {
      commit("updateAccountFilterSelected", accountFilterSelected);
    },
    applyEnvFilterSelected({ commit }, envFilterSelected) {
      commit("updateEnvFilterSelected", envFilterSelected);
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
    },
    whereFilter(state) {
      let whereFilter = [];
      if (state.minDateFilter != undefined) {
        whereFilter.push(["dag_execution_date", ">=", state.minDateFilter]);
      } else {
        ["dag_execution_date", ">=", "2019-01-01T00:00:00.000Z"]
      }
      if (state.accountFilterSelected.id != "000000") {
        whereFilter.push(["account", "==", state.accountFilterSelected.id]);
      }
      if (state.envFilterSelected.envId != "ALL") {
        whereFilter.push(["environment", "==", state.envFilterSelected.envId]);
      }
      return whereFilter;
    }
  }
};

export default filters;
