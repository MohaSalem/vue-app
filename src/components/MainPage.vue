<template>
  <div class="main-page">
    <Carousel/>
    <ProductPanel title="Top Selling" section="topselling"/>
    <ProductPanel title="Buy Now" section="buynow"/>
    <ProductPanel title="Recommended" section="recommended"/>
  </div>
</template>

<script>
import ProductPanel from './ProductPanel.vue'
import Carousel from './Carousel.vue'


export default {
  name: 'MainPage',
  components: {
    ProductPanel,
    Carousel
  }
}
</script>

<style scoped>
</style>
