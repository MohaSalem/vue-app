<template>
  
    <b-card
    :title="product.title"
    :img-src="product.image"
    :img-alt="product.title"
    img-top
    tag="article"
    class="mb-2"
  >
    <b-card-text>
      {{ product.description }}
      <p>
        Starting from:
          <Price :original="cheapestOption().price" 
          :discounted="cheapestOption().priceDiscounted" 
          :discountPercentage="cheapestOption().discountPercentage"/>
      </p>
    </b-card-text>

    <b-button :to="'/products/' + product.id" variant="primary">Details</b-button>
  </b-card>
  
  
</template>

<script>

import Price from './Price.vue'

export default {
  name: 'ProductItem',
  components: {
    Price,
  },
  props: {
    product: Object
  },

  methods: {
    cheapestOption: function () {
      let cheapestPrice = undefined;
      let cheapestOptionObject = undefined;

      for(let option of this.product.options) {
        let finalPrice = this.optionPrice(option)
        
        if(!cheapestOptionObject || !cheapestPrice || finalPrice < cheapestPrice) {
          cheapestPrice = finalPrice
          cheapestOptionObject = option
        }
      }
      return cheapestOptionObject
    },
    optionPrice: function (option) {
      let finalPrice = option.price
        if(option.priceDiscounted) {
          finalPrice = option.priceDiscounted
        } else if(option.discountPercentage) {
          finalPrice = option.price * (1 - option.discountPercentage)
        }
        return finalPrice
    },

  }
}
</script>

<style scoped>
</style>
