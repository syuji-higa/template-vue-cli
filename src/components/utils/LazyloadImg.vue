<template>
  <span
    :class="['lazyload-img-component', fitClass]"
    :style="{ backgroundColor: bgColor }"
  >
    <img
      v-lazyload
      src="@/assets/images/placeholder.png"
      :data-src="path"
      :alt="alt"
    >
    <!-- <noscript>
      <img :src="path" :alt="alt">
    </noscript> -->
  </span>
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
    path () {
      return require(`@/assets/images/${this.src}`)
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
  }
}
</script>

<style lang="scss" scoped>
.lazyload-img-component {
  display: block;
  position: relative;
  background-color: #eee;
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
