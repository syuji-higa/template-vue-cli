<template>
  <div id="app" :class="mediaClass">
    <TheHeader />
    <TheMain />
    <TheFooter />
  </div>
</template>

<script>
import 'sanitize.css'
import { platform } from '@/modules/utils/bowser'
import TheHeader from '@/components/TheHeader'
import TheMain from '@/components/TheMain'
import TheFooter from '@/components/TheFooter'

export default {
  name: 'App',
  components: {
    TheHeader,
    TheMain,
    TheFooter
  },
  computed: {
    mediaClass () {
      return `is-${platform.type}`
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/global.scss";
</style>
