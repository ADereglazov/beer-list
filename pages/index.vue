<template>
  <div class="container">
    <h1 class="title">beer-list</h1>
    <LoaderWrapper v-if="$store.getters['beer/isBeerAvailable']">
      <ButtonLoader
        :pending="$store.state.beer.isPendingBeerList"
        @click-load-more="handleLoadMoreClick"
      />
    </LoaderWrapper>
  </div>
</template>

<script>
import ButtonLoader from '~/components/ButtonLoader'
import LoaderWrapper from '~/components/LoaderWrapper'

const BEER_LIST_LIMIT = 5

export default {
  components: { ButtonLoader, LoaderWrapper },
  /*
  fetch(store) {
    const promises = []

    if (store.state.beer.beerOffset < BEER_LIST_LIMIT) {
      promises.push(
        store.dispatch('beer/FETCH_BEER_LIST', {
          page: 1,
          limit: BEER_LIST_LIMIT,
        })
      )
    }

    if (promises.length === 0) {
      return null
    }
  },
  */
  methods: {
    handleLoadMoreClick() {
      if (this.$store.state.beer.isPendingBeerList) {
        return
      }
      this.$store.dispatch('beer/FETCH_BEER_LIST', {
        page: 1,
        limit: BEER_LIST_LIMIT,
      })
    },
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 60px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
