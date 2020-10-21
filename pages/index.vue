<template>
  <div class="container">
    <div v-if="beerList.length > 0" class="beer">
      <ul class="beer__list">
        <li v-for="(item, index) in beerList" :key="item.id" class="beer__item">
          <p class="beer__title">{{ item.id }}. {{ item.name }}</p>
          <img :src="item.image_url" :alt="item.name" class="beer__img" />
          <FormEdit
            :name="item.name"
            :description="item.description"
            class="beer__form"
            @input-name="handleInputName($event, index)"
            @input-description="handleInputDescription($event, index)"
            @item-delete="handleDeleteItem(index)"
          />
          <p class="beer__description">{{ item.description }}</p>
          <p class="beer__tips">{{ item.brewers_tips }}</p>
        </li>
      </ul>
      <LoaderWrapper v-if="isBeerAvailable">
        <ButtonLoader
          :pending="isPendingBeerList"
          @show-next="handleShowNextClick"
        />
      </LoaderWrapper>
    </div>
    <span v-else-if="isError">Oops... Error occurred</span>
  </div>
</template>

<script>
import ButtonLoader from '~/components/ButtonLoader'
import LoaderWrapper from '~/components/LoaderWrapper'
import FormEdit from '~/components/FormEdit'

const BEER_ITEMS_LIMIT = 25

export default {
  components: { FormEdit, ButtonLoader, LoaderWrapper },
  data() {
    return {
      beerList: [],
      beerOffset: 0,
      beerCount: 0,
      isPendingBeerList: false,
      isError: false,
    }
  },
  computed: {
    isBeerAvailable() {
      return this.beerOffset <= this.beerCount
    },
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const page = Math.trunc(this.beerOffset / BEER_ITEMS_LIMIT) + 1
      const params = { page, limit: BEER_ITEMS_LIMIT }
      this.isPendingBeerList = true
      return this.$axios
        .$get('https://api.punkapi.com/v2/beers', { params })
        .then((response) => {
          this.beerList.push(...response)
          this.beerCount += response.length
          this.beerOffset += BEER_ITEMS_LIMIT
        })
        .catch(() => {
          this.isError = true
        })
        .finally(() => {
          this.isPendingBeerList = false
        })
    },
    handleShowNextClick() {
      this.getData()
    },
    handleDeleteItem(index) {
      this.beerList.splice(index, 1)
    },
    handleInputName(value, index) {
      const newItem = { ...this.beerList[index], name: value }
      this.$set(this.beerList, index, newItem)
    },
    handleInputDescription(value, index) {
      const newItem = { ...this.beerList[index], description: value }
      this.$set(this.beerList, index, newItem)
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
  position: relative;
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

.beer__form {
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
