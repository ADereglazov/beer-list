<template>
  <div class="form">
    <button class="beer__button" type="button" @click="isOpened = true">
      Edit
    </button>
    <form v-if="isOpened" class="form__form">
      <textarea
        v-model="valueNameModel"
        class="form__field"
        name="name"
        autofocus
      ></textarea>
      <textarea
        v-model="valueDescriptionModel"
        class="form__field"
        name="description"
      ></textarea>
      <button class="form__close" type="button" @click="isOpened = false">
        Close
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FormEdit',
  props: {
    name: {
      type: String,
      required: false,
      default: '',
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      isOpened: false,
    }
  },
  computed: {
    valueNameModel: {
      get() {
        return this.name
      },
      set(value) {
        this.$emit('input-name', value)
      },
    },
    valueDescriptionModel: {
      get() {
        return this.description
      },
      set(value) {
        this.$emit('input-description', value)
      },
    },
  },
}
</script>

<style>
.form {
  display: inline-block;
}

.form__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  position: absolute;
  z-index: 10;
  top: 30px;
  left: 0;
  background-color: #fff;
  box-shadow: 0 7px 15px 0 rgba(0, 1, 1, 0.15);
}

.form__field {
  width: 260px;
  min-height: 100px;
}
</style>
