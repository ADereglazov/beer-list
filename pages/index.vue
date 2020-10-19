<template>
  <div class="container">
    <div v-if="beerList.length > 0" class="beer">
      <ul class="beer__list">
        <li v-for="(item, index) in beerList" :key="item.id" class="beer__item">
          <p class="beer__title">{{ item.id }}. {{ item.name }}</p>
          <div class="beer__wrapper">
            <img :src="item.image_url" :alt="item.name" class="beer__img" />
            <button class="beer__button" type="button">Edit</button>
            <button
              class="beer__button"
              type="button"
              @click="handleDeleteItem(index)"
            >
              Delete
            </button>
          </div>
          <p class="beer__description">{{ item.description }}</p>
          <p class="beer__tips">{{ item.brewers_tips }}</p>
        </li>
      </ul>
      <LoaderWrapper v-if="isBeerAvailable">
        <ButtonLoader
          :pending="isPendingBeerList"
          @click-load-more="handleShowNextClick"
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
    this.getData({
      page: this.page,
      limit: this.limit,
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
    getData(params) {
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
    handleShowNextClick() {
      this.getData({
        page: this.page,
        limit: this.limit,
      })
    },
    handleDeleteItem(index) {
      this.beerList.splice(index, 1)
    },
  },
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  font-size: 16px;
  font-weight: bold;
}

.beer__img {
  display: block;
  width: auto;
  height: 200px;
  margin: 10px auto;
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
