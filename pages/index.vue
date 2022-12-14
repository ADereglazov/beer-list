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
            @edit-name="handleEditName($event, index)"
            @edit-description="handleEditDescription($event, index)"
            @delete-item="handleDeleteItem(index)"
          />
          <p class="beer__description">{{ item.description }}</p>
          <p class="beer__tips">{{ item.brewers_tips }}</p>
        </li>
      </ul>
      <LoaderWrapper v-if="isBeerAvailable">
        <ButtonLoader :pending="pending" @show-next="handleShowNextClick" />
      </LoaderWrapper>
    </div>
    <div v-else-if="isError" class="beer__error">
      <span>Oops... Error occurred</span>
      <button class="beer__error-button" type="button" @click="getData">
        Try again
      </button>
    </div>
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
      pending: false,
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
      this.pending = true
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
          this.pending = false
        })
    },
    handleShowNextClick() {
      this.getData()
    },
    handleDeleteItem(index) {
      this.beerList.splice(index, 1)
    },
    handleEditName(value, index) {
      const newItem = { ...this.beerList[index], name: value }
      this.$set(this.beerList, index, newItem)
    },
    handleEditDescription(value, index) {
      const newItem = { ...this.beerList[index], description: value }
      this.$set(this.beerList, index, newItem)
    },
  },
}
</script>

<style>
@import '~/assets/main.css';
</style>
