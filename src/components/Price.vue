<template>
<p>
  <span class="original-price" :class="{ 'discounted-original-price': discountedPrice }">
    ${{ round(original) }}
  </span>
  &nbsp;&nbsp;
  <span v-if="discountedPrice" class="discounted-price">
    ${{ round(discountedPrice) }} 
  </span>
  <span v-if="discountPercentage"> {{  discountPercentage * 100}}% OFF</span>
</p>
</template>

<script>
export default {
  name: 'Price',
  components: {
  },
  computed: {
    discountedPrice: function () {
      return this.discounted || this.original * (1-this.discountPercentage)
    },
  },
  props: { 
    original: Number,
    discounted: Number,
    discountPercentage: Number
  },

  methods: {
    round: function (price) {
      return (Math.round(price * 100) / 100).toFixed(2)
    },
  }
}
</script>

<style scoped>
.original-price{
  color: green;
  font-weight: bold;
}
.discounted-price{
  color: orange;
  font-weight: bold;
}
.discounted-original-price{
  text-decoration: line-through;
}
</style>
