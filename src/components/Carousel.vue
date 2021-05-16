<template>
  <div>
    <b-carousel
      id="carousel-fade"
      style="text-shadow: 0px 0px 2px #000"
      fade
      indicators
      img-width="1024"
      img-height="480"
      >
        <b-carousel-slide v-for="product in products" 
          :key="product.id"
          :caption="product.title"
          :img-src="product.image"
          @click="navigateToProduct(product.id)"
        ></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Carousel',
  components: {
  },

   data () {
    return {
      products: []
    };
  },
  mounted () {
    axios
      .get("https://euas.person.ee/products")
      .then(response => {
        this.products = response.data;
      });
  },

    methods: {
    navigateToProduct: function (productId) {
        this.$router.push('/products/' + productId)
      }
    }
}
</script>

<style scoped>
</style>
