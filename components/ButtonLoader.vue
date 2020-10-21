<template>
  <button
    class="button-next"
    :disabled="pending"
    type="button"
    @click="$emit('show-next')"
  >
    {{ buttonContent }}
  </button>
</template>

<script>
export default {
  name: 'ButtonLoader',
  props: {
    pending: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    buttonContent() {
      return this.pending ? 'Loading' : 'Show next'
    },
  },
}
</script>

<style>
.button-next {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button-next:disabled {
  color: #7f828b;
  border-color: #7f828b;
}

.button-next:hover:not(:disabled) {
  color: #fff;
  background-color: #3b8070;
  cursor: pointer;
}

.button-next:active:not(:disabled) {
  opacity: 0.5;
}
</style>
