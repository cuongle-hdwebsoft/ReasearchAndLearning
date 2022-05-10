export const store = {
  state: {
    name: '',
    age: 23,
    arr: [],
    arrObj: []
  },
  actions: {
    handleChangeName: ({ state }, payload) => {
      state.name = payload
    },
    handleChangeAge: ({ state }, payload) => {
      state.age = payload
    },
    handleChangeArr: ({ state }, payload) => {
      state.v = payload
    },
    handleChangeArrObj: ({ state }, payload) => {
      state.arrObj = payload
    }
  },
  modules: {
    USER_MODULE: {
      namespaced: true,
      state: function() {
        return {
          isLogin: false,
          user: null
        }
      },
      actions: {
        setLogin: function({ state }, payload) {
          state.isLogin = payload
        },
        setUser: function({ state }, payload) {
          state.user = payload
         }
      }
    }
  }
}