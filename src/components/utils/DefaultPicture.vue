<template>
  <picture>
    <source :srcset="pathPc" :media="`(min-width: ${breakpoint}px)`">
    <source :srcset="pathSp" :media="`(max-width: ${breakpoint - 0.1}px)`">
    <img :src="pathPc" :alt="alt">
  </picture>
</template>

<script>
import breakpointMixin from '@/mixins/breakpointMixin'

export default {
  mixins: [breakpointMixin],
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
    pathData () {
      const [path, ext] = this.src.split('.')
      return { path, ext }
    },
    pathPc () {
      return this.getPath('pc')
    },
    pathSp () {
      return this.getPath('sp')
    }
  },
  methods: {
    getPath (media) {
      const { path, ext } = this.pathData
      return require(`@/assets/images/${path}-${media}.${ext}`)
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}
</style>
