<template>
  <img :src="path" :alt="alt">
</template>

<script>

export default {
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    }
  },
  computed: {
    path () {
      return require(`@/assets/images/${this.src}`)
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}
</style>
