<template>
  <FormEdit v-model="isOpened" v-bind="{ ...$attrs, ...$props }" />
</template>

<script>
import FormEdit from './FormEdit'

export default {
  name: 'FormContainer',
  components: {
    FormEdit,
  },
  data() {
    return {
      isOpened: false,
    }
  },
}
</script>
