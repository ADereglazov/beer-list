import Vue from 'vue'

export default {
  state: () => ({
    beerList: [],
    beerCount: 0,
    beerOffset: 0,
    isPendingBeerList: false,
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

    UPDATE_BEER_LIST(state, { results }) {
      Vue.set(state, 'beerList', [...state.beerList, ...results])
    },

    INCREMENT_BEER_OFFSET(state, value) {
      Vue.set(state, 'beerOffset', state.beerOffset + value)
    },

    UPDATE_BEER_COUNT(state, value) {
      Vue.set(state, 'beerCount', value)
    },
  },

  action: {
    FETCH_BEER_LIST({ state, commit }, { page, limit }) {
      const params = {
        offset: state.beerOffset,
        page,
        limit,
      }
      commit('SET_BEER_PENDING', true)
      return this.$axios
        .$get('https://api.punkapi.com/v2/beers', { params })
        .then((response) => {
          const { results, count } = response
          commit('UPDATE_BEER_LIST', { results })
          commit('INCREMENT_BEER_OFFSET', limit)
          commit('UPDATE_BEER_COUNT', count)
          return response
        })
        .finally(() => {
          commit('SET_BEER_PENDING', false)
        })
    },
  },
}
