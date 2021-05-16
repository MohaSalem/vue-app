<template>
  <div class="order-page">
  <h2>Order details #{{ order.id }}</h2>

    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col" colspan="2">Product</th>
          <th scope="col">Option</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Total</th>
          
        </tr>
      </thead>
      <tbody v-if="products.length">
        <tr v-for="(item, index) in order.items" :key="index + '-' + item.productId + '-' + item.optionCode">
          <th scope="row"><img :src="getOption(item.productId, item.optionCode).image" 
          class="order-image pointer-cursor" 
          @click="openProduct(item.productId)"> 
          </th>
          <td @click="openProduct(item.productId)" class="pointer-cursor">{{ getProduct(item.productId).title }}</td>
          <td>{{ getOption(item.productId, item.optionCode).title }}</td>
          <td><Price 
            :original="getOption(item.productId, item.optionCode).price"
            :discounted="getOption(item.productId, item.optionCode).priceDiscounted" 
            :discountPercentage="getOption(item.productId, item.optionCode).discountPercentage"/></td>
          <td> 
            {{ item.qty }}
          </td>
          
          <td><Price 
            :original="getOption(item.productId, item.optionCode).price * item.qty" 
            :discounted="getOption(item.productId, item.optionCode).priceDiscounted * item.qty" 
            :discountPercentage="getOption(item.productId, item.optionCode).discountPercentage"/>
            </td>
        </tr>
        <tr class="total-row">
          <td colspan="5">TOTAL</td>
          <td><Price 
            :original="totalAmount" 
            :discounted="totalAmountDiscounted"
            /></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Price from './Price.vue'
import axios from "axios";

export default {
  name: 'OrderPage',
  components: {
    Price
  },

 data () {
    return {
      order: {
        items: []
      },
      products: [],
    };
  },
  mounted () {
    axios
      .get("https://euas.person.ee/user/orders/" + this.$route.params.orderId)
      .then(response => {
        this.order = response.data;
      });

    axios
      .get("https://euas.person.ee/products/")
      .then(response => {
        this.products = response.data;
      });
  },

  computed: {

    totalAmount: function() {
      let total = 0
      for(let item of this.order.items) {
        total += item.qty * this.getOption(item.productId, item.optionCode).price
      }
      return total
    },

    totalAmountDiscounted: function() {
      let total = 0
      for(let item of this.order.items) {
        total += item.qty * this.effectiveOptionPrice(
          this.getOption(item.productId, item.optionCode)
        )
      }
      return total
    },
    
  },

   methods: {

     effectiveOptionPrice: function (option) {
      let finalPrice = option.price
        if(option.priceDiscounted) {
          finalPrice = option.priceDiscounted
        } else if(option.discountPercentage) {
          finalPrice = option.price * (1 - option.discountPercentage)
        }
        return finalPrice
    },

    getProduct: function (productId) {
      return this.products.find(product => product.id == productId);

    },

    getOption: function (productId, optionCode) {
      return this.getProduct(productId).options.find(option => option.code == optionCode);
    },  
    
    openProduct: function (productId) {
      this.$router.push('/products/' + productId);
    },   
    
   }

}
</script>

<style scoped>
.order-image {
  max-height: 100px;
}
.total-row {
  font-weight: bold;
}

.pointer-cursor {
  cursor: pointer;
}

</style>
