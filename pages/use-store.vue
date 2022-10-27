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
        <ButtonLoader
          :pending="isPendingBeerList"
          @show-next="handleShowNextClick"
        />
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
  computed: {
    beerList() {
      return this.$store.state.beerList
    },
    isBeerAvailable() {
      return this.$store.getters.isBeerAvailable
    },
    isPendingBeerList() {
      return this.$store.state.isPendingBeerList
    },
    isError() {
      return this.$store.state.isError
    },
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const page =
        Math.trunc(this.$store.state.beerOffset / BEER_ITEMS_LIMIT) + 1
      this.$store.dispatch('FETCH_BEER_LIST', { page, limit: BEER_ITEMS_LIMIT })
    },
    handleShowNextClick() {
      this.getData()
    },
    handleDeleteItem(index) {
      this.$store.commit('DELETE_BEER_LIST_ITEM', index)
    },
    handleEditName(value, index) {
      this.$store.commit('EDIT_BEER_LIST_ITEM_NAME', { value, index })
    },
    handleEditDescription(value, index) {
      this.$store.commit('EDIT_BEER_LIST_ITEM_DESCRIPTION', { value, index })
    },
  },
}
</script>

<style>
@import '~/assets/main.css';
</style>
