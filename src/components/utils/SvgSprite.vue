<template>
  <span class="svg-sprite-component" :style="wrapStyle">
    <svg :class="className">
      <title v-if="title">{{ title }}</title>
      <use :xlink:href="svgPath" />
    </svg>
  </span>
</template>

<script>
export default {
  name: 'svg-sprite',
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: null
    }
  },
  computed: {
    svgData () {
      let svg = require(`@/assets/sprite/${this.name}.svg`)
      if (Object.prototype.hasOwnProperty.call(svg, 'default')) {
        svg = svg.default
      }
      const [x1, y1, x2, y2] = svg.viewBox.split(' ')
      return {
        url: svg.url,
        width: x2 - x1,
        height: y2 - y1
      }
    },
    svgPath () {
      return this.svgData.url
    },
    svgAspectRatio () {
      return this.svgData.height / this.svgData.width
    },
    wrapStyle () {
      return {
        paddingTop: `${this.svgAspectRatio * 100}%`
      }
    },
    className () {
      return 'svg-sprite svg-sprite--' + this.name
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-sprite-component {
  display: block;
  position: relative;
}
.svg-sprite {
  height: 100%;
  width: 100%;
  fill: currentColor;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
