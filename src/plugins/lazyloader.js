import Vue from 'vue'
import { replaceImageSource } from '../modules/utils/source'

const targets = new Map()
const isImageSettedClassName = 'is-image-setted'
const isImageLoadedClassName = 'is-image-loaded'

const callback = (entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) {
      break
    }

    const { target } = entry
    const { unobserve } = targets.get(target)

    unobserve()
    target.classList.add(isImageSettedClassName)

    ;(async () => {
      await replaceImageSource(target)
      target.classList.add(isImageLoadedClassName)
    })()
  }
}

const observer = new IntersectionObserver(callback, {
  rootMargin: '0% 0% 0% 0%'
})

const getUnobserve = el => {
  return () => {
    observer.unobserve(el)
    targets.delete(el)
  }
}

Vue.directive('lazyload', {
  inserted (el, binding) {
    observer.observe(el)
    targets.set(el, {
      target: el,
      unobserve: getUnobserve(el),
      binding
    })
  },
  unbind (el) {
    if (targets.has(el)) {
      targets.get(el).unobserve()
    }
  }
})
