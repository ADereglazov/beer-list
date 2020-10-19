<template>
  <div class="container">
    <div v-if="beerList.length > 0" class="beer">
      <ul class="beer__list">
        <li v-for="item in beerList" :key="item.id" class="beer__item">
          <p class="beer__title">{{ item.id }}. {{ item.name }}</p>
          <img :src="item.image_url" :alt="item.name" class="beer__img" />
          <p class="beer__description">{{ item.description }}</p>
          <p class="beer__tips">{{ item.brewers_tips }}</p>
        </li>
      </ul>
      <LoaderWrapper v-if="isBeerAvailable">
        <ButtonLoader
          :pending="isPendingBeerList"
          @click-load-more="handleLoadMoreClick(page, limit)"
        />
      </LoaderWrapper>
    </div>
    <span v-else>Oops... no data found</span>
  </div>
</template>

<script>
import ButtonLoader from '~/components/ButtonLoader'
import LoaderWrapper from '~/components/LoaderWrapper'

export default {
  components: { ButtonLoader, LoaderWrapper },
  fetch() {
    const params = {
      page: this.page,
      limit: this.limit,
    }

    this.isPendingBeerList = true
    return this.$axios
      .$get('https://api.punkapi.com/v2/beers', { params })
      .then((response) => {
        const count = response.length
        this.beerList.push(...response)
        this.beerCount += count
        this.beerOffset += this.limit
        this.page++
      })
      .finally(() => {
        this.isPendingBeerList = false
      })
  },
  data() {
    return {
      page: 1,
      limit: 25,
      beerList: [],
      beerCount: 0,
      beerOffset: 0,
      isPendingBeerList: false,
    }
  },
  computed: {
    isBeerAvailable() {
      return this.beerOffset <= this.beerCount
    },
  },
  methods: {
    handleLoadMoreClick(page, limit) {
      const params = {
        page,
        limit,
      }

      this.isPendingBeerList = true
      return this.$axios
        .$get('https://api.punkapi.com/v2/beers', { params })
        .then((response) => {
          const count = response.length
          this.beerList.push(...response)
          this.beerCount += count
          this.beerOffset += limit
          this.page++
        })
        .finally(() => {
          this.isPendingBeerList = false
        })
    },
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
}

.beer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.beer__list {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.beer__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  border-bottom: 1px solid black;
}

.beer__title {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
}

.beer__img {
  display: block;
  width: auto;
  height: 200px;
  margin-bottom: 10px;
}

.beer__description {
  margin-bottom: 10px;
  font-style: italic;
  text-align: justify;
}

.beer__tips {
  margin-bottom: 10px;
  text-align: justify;
  color: blue;
}
</style>
