<template>
  <span
    :class="['lazyload-picture-component', fitClass]"
    :style="{ backgroundColor: bgColor }"
  >
    <picture v-lazyload>
      <source
        srcset="@/assets/images/placeholder.png"
        :data-src="pathPc"
        :media="`(min-width: ${breakpoint}px)`"
      >
      <source
        srcset="@/assets/images/placeholder.png"
        :data-src="pathSp"
        :media="`(max-width: ${breakpoint - 0.1}px)`"
      >
      <img
        src="@/assets/images/placeholder.png"
        :data-src="pathPc"
        :alt="alt"
      >
    </picture>
    <!-- <noscript>
      <img :src="pathPc" :alt="alt">
    </noscript> -->
  </span>
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
    },
    bgColor: {
      type: String,
      default: '#eee'
    },
    fit: {
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
    },
    fitClass () {
      switch (this.fit) {
        case 'cover': {
          return 'img-fit-cover'
        }
        case 'contain': {
          return 'img-fit-contain'
        }
        default: {
          return ''
        }
      }
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
.lazyload-picture-component {
  display: block;
  position: relative;
}
img {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.img-fit-cover,
.img-fit-contain {
  height: 100%;
  img {
    height: 100%;
  }
}
.img-fit-cover img {
  object-fit: cover;
}
.img-fit-contain img {
  object-fit: cover;
}
// init
img {
  opacity: 0;
  transition: opacity .2s linear;
}
// loaded
.is-image-loaded img {
  opacity: 1;
}
</style>
