<template>
  <div class="loader-wrapper">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'LoaderWrapper',
}
</script>

<style scoped>
.loader-wrapper {
  display: flex;
  align-items: center;
  height: 70px;
}
</style>
