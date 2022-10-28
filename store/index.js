import Vue from 'vue'

export default {
  state: () => ({
    beerList: [],
    beerCount: 0,
    beerOffset: 0,
    isPendingBeerList: false,
    isError: false,
  }),

  getters: {
    isBeerAvailable(state) {
      return state.beerOffset <= state.beerCount
    },
  },

  mutations: {
    SET_BEER_PENDING(state, value) {
      Vue.set(state, 'isPendingBeerList', !!value)
    },

    SET_ERROR_STATE(state, value) {
      Vue.set(state, 'isError', !!value)
    },

    UPDATE_BEER_LIST(state, results) {
      Vue.set(state, 'beerList', [...state.beerList, ...results])
    },

    DELETE_BEER_LIST_ITEM(state, index) {
      state.beerList.splice(index, 1)
    },

    INCREMENT_BEER_OFFSET(state, value) {
      Vue.set(state, 'beerOffset', state.beerOffset + value)
    },

    UPDATE_BEER_COUNT(state, value) {
      Vue.set(state, 'beerCount', state.beerCount + value)
    },

    EDIT_BEER_LIST_ITEM_NAME(state, { value, index }) {
      const newItem = { ...state.beerList[index], name: value }
      Vue.set(state.beerList, index, newItem)
    },

    EDIT_BEER_LIST_ITEM_DESCRIPTION(state, { value, index }) {
      const newItem = { ...state.beerList[index], description: value }
      Vue.set(state.beerList, index, newItem)
    },
  },

  actions: {
    FETCH_BEER_LIST({ state, commit }, { page, limit }) {
      const params = {
        page,
        limit,
      }

      commit('SET_BEER_PENDING', true)
      commit('SET_ERROR_STATE', false)
      return this.$axios
        .$get('https://api.punkapi.com/v2/beers', { params })
        .then((response) => {
          commit('UPDATE_BEER_LIST', response)
          commit('INCREMENT_BEER_OFFSET', limit)
          commit('UPDATE_BEER_COUNT', response.length)
        })
        .catch(() => {
          commit('SET_ERROR_STATE', true)
        })
        .finally(() => {
          commit('SET_BEER_PENDING', false)
        })
    },
  },
}
