<template>
  <button
    :class="{ loading: pending }"
    class="button-more"
    :disabled="pending"
    type="button"
    @click="$emit('click-load-more')"
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
.button-more {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button-more:hover:not(:disabled) {
  color: #fff;
  background-color: #3b8070;
  cursor: pointer;
}

.button-more:active:not(:disabled) {
  opacity: 0.5;
}
</style>
