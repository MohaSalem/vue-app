<template>
  <div class="main-page">
    
   <ProductPanel :categoryAlias="$route.params.categoryAlias" />
  </div>
</template>

<script>
import ProductPanel from './ProductPanel.vue'


export default {
  name: 'CategoryPage',
  components: {
    ProductPanel
  }
}
</script>

<style scoped>
</style>
