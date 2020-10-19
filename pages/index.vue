<template>
  <div class="container">
    <div v-if="beerList.length > 0" class="beer">
      <ul class="beer__list">
        <li v-for="(item, index) in beerList" :key="item.id" class="beer__item">
          <p class="beer__title">{{ item.id }}. {{ item.name }}</p>
          <div class="beer__wrapper">
            <img :src="item.image_url" :alt="item.name" class="beer__img" />
            <FormEdit
              :name="item.name"
              :description="item.description"
              @input-name="handleInputName"
              @input-description="handleInputDescription"
            />
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
          @show-next="handleShowNextClick"
        />
      </LoaderWrapper>
    </div>
    <span v-else-if="isError">Oops... no data found</span>
  </div>
</template>

<script>
import ButtonLoader from '~/components/ButtonLoader'
import LoaderWrapper from '~/components/LoaderWrapper'
import FormEdit from '~/components/FormEdit'
// import FormContainer from '~/components/FormContainer'

const FIRST_PAGE_NUMBER = 1
const BEER_ITEMS_LIMIT = 25

export default {
  components: { FormEdit, ButtonLoader, LoaderWrapper },
  data() {
    return {
      page: FIRST_PAGE_NUMBER,
      limit: BEER_ITEMS_LIMIT,
      beerList: [],
      beerCount: 0,
      beerOffset: 0,
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
    this.getData({
      page: FIRST_PAGE_NUMBER,
      limit: BEER_ITEMS_LIMIT,
    })
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
        .catch(() => {
          this.isError = true
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
    handleInputName(value) {
      console.log('>>>>>>>>>>>>>>>', value)
    },
    handleInputDescription(value) {
      console.log('>>>>>>>>>>>>>>>', value)
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

.beer__wrapper {
  position: relative;
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

.beer__button {
  display: inline-block;
  width: 100px;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.beer__button:hover:not(:disabled) {
  color: #fff;
  background-color: #3b8070;
  cursor: pointer;
}

.beer__button:active:not(:disabled) {
  opacity: 0.5;
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
