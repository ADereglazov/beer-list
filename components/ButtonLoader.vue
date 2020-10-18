<template>
  <button
    :class="{ spinner: pending }"
    class="button-more"
    :disabled="pending"
    type="button"
    @click="$emit('click-load-more')"
  >
    Load more...
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
}
</script>

<style>
.button-more.spinner {
  position: relative;
  min-width: 30px;
  min-height: 30px;
  color: transparent;
}

.button-more.spinner::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 24px;
  height: 24px;
  margin-top: -12px;
  margin-left: -12px;
  border-radius: 50%;
  border: 2px solid #ccc;
  border-top-color: #0087cc;
  box-sizing: border-box;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}

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
