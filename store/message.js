export const state = () => ({
  List: [],
  Page: 1,
  Total: 0,
  Limit: 20,
});

export const mutations = {
  setList(state, data) {
    state.List = data;
  },
  updateList(state, data) {
    state.List.unshift(data);
  },
  setTotal(state, number) {
    state.Total = number;
  },
  setPage(state, number) {
    state.Page = number;
  }
};
