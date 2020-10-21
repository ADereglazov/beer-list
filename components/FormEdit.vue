<template>
  <div class="form">
    <button
      class="form__button"
      type="button"
      :disabled="isOpened"
      @click="isOpened = true"
    >
      Edit
    </button>
    <button
      class="form__button"
      type="button"
      :disabled="isOpened"
      @click="$emit('item-delete')"
    >
      Delete
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

.form__button,
.form__close {
  display: inline-block;
  width: 100px;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.form__button:disabled {
  color: #7f828b;
  border-color: #7f828b;
}

.form__button:hover:not(:disabled),
.form__close:hover:not(:disabled) {
  color: #fff;
  background-color: #3b8070;
  cursor: pointer;
}

.form__button:active:not(:disabled),
.form__close:active:not(:disabled) {
  opacity: 0.5;
}

.form__field {
  width: 260px;
  min-height: 100px;
}
</style>
