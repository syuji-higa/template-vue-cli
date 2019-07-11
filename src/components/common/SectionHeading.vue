<template>
  <h2 class="section-heading-component">{{ text }}</h2>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Section Heading',
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
