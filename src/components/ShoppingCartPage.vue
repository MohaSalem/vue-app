<template>
  <div class="shopping-cart-page">
    <h2>Shopping Cart</h2>
   <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col" colspan="2">Product</th>
          <th scope="col">Option</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Total</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody v-if="products.length">
        <tr v-for="(item, index) in this.$root.$options.cart.items" :key="index + '-' + item.productId + '-' + item.optionCode">
          <th scope="row"><img :src="getOption(item.productId, item.optionCode).image" class="shopping-cart-image pointer-cursor" 
          @click="openProduct(item.productId)"> 
          </th>
          <td @click="openProduct(item.productId)" class="pointer-cursor">{{ getProduct(item.productId).title }}</td>
          <td>{{ getOption(item.productId, item.optionCode).title }}</td>
          <td><Price 
            :original="getOption(item.productId, item.optionCode).price"
            :discounted="getOption(item.productId, item.optionCode).priceDiscounted" 
            :discountPercentage="getOption(item.productId, item.optionCode).discountPercentage"/></td>
          <td> 
            <b-input-group class="items-picker">
              <b-input-group-prepend>
                <b-button variant="outline-info"
                @click="decrease(index)"
                >-</b-button>
              </b-input-group-prepend>

              
              <b-form-input v-model.number="item.qty"
              type="number" ></b-form-input>
              

              <b-input-group-append>
                <b-button variant="outline-info"
                @click="increase(index)"
                >+</b-button>
              </b-input-group-append>
            </b-input-group>
          </td>
          
          <td><Price 
            :original="getOption(item.productId, item.optionCode).price * item.qty" 
            :discounted="getOption(item.productId, item.optionCode).priceDiscounted * item.qty" 
            :discountPercentage="getOption(item.productId, item.optionCode).discountPercentage"/></td>
          <td>
            <b-button variant="outline-danger" @click="remove(index)">Remove</b-button>
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
    <b-button size="lg" variant="success" class="order-button"
      @click="orderNow">Order now </b-button>
  </div>
</template>

<script>
import axios from "axios";
import Price from './Price.vue'

export default {
  name: 'ShoppingCart',
  components: {
    Price
  },
  computed: {
    cart: function () {
      return this.$root.$options.cart
    },

    totalAmount: function() {
      let total = 0
      for(let item of this.cart.items) {
        total += item.qty * this.getOption(item.productId, item.optionCode).price
      }
      return total
    },

    totalAmountDiscounted: function() {
      let total = 0
      for(let item of this.cart.items) {
        total += item.qty * this.effectiveOptionPrice(
          this.getOption(item.productId, item.optionCode)
        )
      }
      return total
    },
    
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
    remove: function (index) {
      //console.log("Index " + index)
      //console.log("Before" + this.$root.$options.cart.item.length)
      this.$root.$options.cart.items.splice(index, index + 1)
      //console.log("After" + this.$root.$options.cart.item.length)
      this.save()
      },

    save: function () {
     axios.put("https://euas.person.ee/user/carts/" + this.cart.id, this.cart)
      .then(() => {
      //this.$forceUpdate();
      this.$forceCompute('totalAmount')
      this.$forceCompute('totalAmountDiscounted')
    });
    },

    decrease: function (index) {
      if( this.cart.items[index].qty < 2) { 
        return
      }
      this.cart.items[index].qty -= 1;
      this.save()
    },

    increase: function (index) {
      this.cart.items[index].qty += 1;
      this.save()
    },

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
    
    orderNow: function () {
      axios.post("https://euas.person.ee/user/carts/" + this.cart.id + "/orders", this.cart)
      .then(() => {
        axios
          .post("https://euas.person.ee/user/carts/")
          .then(response => {
            localStorage.shoppingCartId = response.data.id;
            this.$root.$options.cart = response.data
            this.$router.push('/profile/orders/' + this.cart.id);
          })
      })
     },
    }
  
  }

</script>

<style scoped>
.shopping-cart-image {
  max-height: 100px;
}
.total-row {
  font-weight: bold;
}
.items-picker {
  width: 130px;
}
.pointer-cursor {
  cursor: pointer;
}
</style>
