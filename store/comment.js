export const state = () => ({
    replayUser: {},
  });

  export const mutations = {
    setReplayUser(state, data) {
      state.replayUser = data;
    }
  };
