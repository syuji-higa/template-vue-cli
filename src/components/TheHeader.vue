<template>
  <header class="the-header-component">
    <h1>
      <SvgSprite name="logo" title="Sample Inc" />
    </h1>
  </header>
</template>

<script>
import SvgSprite from '@/components/utils/SvgSprite'

export default {
  components: {
    SvgSprite
  }
}
</script>

<style lang="scss" scoped></style>
