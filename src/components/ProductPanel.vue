<template>
  <div class="product-panel">
    <h2 v-if="categoryAlias">Listing for category: {{  categoryAlias  }}</h2>
    <h2 v-if="!categoryAlias">{{  title  }}</h2>

  
      <b-card-group deck>
      <ProductItem v-for="productItem in products" 
          :product="productItem"  :key="productItem.id" />
      </b-card-group>
    
  </div>
</template>

<script>
import ProductItem from './ProductItem.vue'
import axios from "axios";

export default {
  name: 'ProductPanel',
  components: {
    ProductItem
  },
  props: { 
    title: String,
    categoryAlias: String,
    section: String
  },
  data () {
    return {
      products: []
    };
  },
  mounted () {
    if(this.categoryAlias) {
    axios
      .get("https://euas.person.ee/categories/" + this.categoryAlias + "/products")
      .then(response => {
        this.products = response.data;
      });
  } else if(this.section) {
    axios
      .get("https://euas.person.ee/sections/" + this.section + "/products")
      .then(response => {
        this.products = response.data;
      });
  }
 }
}
</script>

<style scoped>

</style>
