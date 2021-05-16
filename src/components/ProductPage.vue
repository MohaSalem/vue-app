<template>
<div>
  <b-row>
    <b-col cols="12"><h4>{{ product.title }}</h4></b-col>
  </b-row>
  <b-row>
    <b-col cols="5">
      <b-img :src="selectedOption.image" class="preview-image"/>
    </b-col>
    <b-col cols="7">
      <p>{{ product.description }}</p>

      <p>Select your product option: </p>
        <div>
          <b-button-group>
            <b-button v-for="option in product.options" 
            :key="option.code" :pressed="option.code == selectedOption.code"
            @click="changeOption(option)"
            >{{ option.title }}</b-button>
            
          </b-button-group>
        </div>

          <p>Price</p>
          <p><Price :original="selectedOption.price" 
          :discounted="selectedOption.priceDiscounted" 
          :discountPercentage="selectedOption.discountPercentage"/></p>

        <p>Number of items:</p>
        <b-alert :show="numberOfItems > selectedOption.qty" variant="warning">
          You have selected {{ numberOfItems }} which is greater than {{ selectedOption.qty }} we have in stock</b-alert>
        <b-input-group class="items-picker">
          <b-input-group-prepend>
            <b-button variant="outline-info"
            @click="decrease">-</b-button>
          </b-input-group-prepend>

          
          <b-form-input v-model.number="numberOfItems"
          type="number" ></b-form-input>
          

          <b-input-group-append>
            <b-button variant="outline-info"
            @click="increase">+</b-button>
          </b-input-group-append>
        </b-input-group>

        <p>Total Price</p>
        <p><Price :original="selectedOption.price * numberOfItems" 
        :discounted="selectedOption.priceDiscounted * numberOfItems" 
        :discountPercentage="selectedOption.discountPercentage * numberOfItems"/></p>
      
       <b-button size="md" variant="primary" class="product-button" @click="addToCart">Add to cart</b-button>
        <b-button size="md" variant="success" class="product-button" @click="buyNow">Buy now</b-button>
    
    </b-col>
  </b-row>
</div>
</template>

<script>
import axios from "axios";
import Price from './Price.vue'

export default {
  name: 'ProductPage',
  components: {
    Price
  },
   data () {
    return {
      product: {},
      numberOfItems: 1,
      selectedOption: {}
      
    };
  },
  mounted () {
    axios
      .get("https://euas.person.ee/products/" + this.$route.params.productId)
      .then(response => {
        this.product = response.data;
        this.selectedOption = this.product.options[0]
      });
  },
  methods: {
    decrease: function () {
      if (this.numberOfItems > 1) {
      this.numberOfItems -= 1;
        }
      },

    increase: function () {
      if(!this.numberOfItems) {
        this.numberOfItems = 0;
      }
      this.numberOfItems += 1;
    },

     changeOption: function (option) {
       this.numberOfItems = 1
       this.selectedOption = option
    },

     addToCart: function (event, callback) {
      let cart = this.$root.$options.cart
      this.$root.$options.cart
      cart.items.push({
        productId: this.product.id,
        qty: this.numberOfItems,
        optionCode: this.selectedOption.code,
        //optionImage: this.selectedOption.image,
        //price: this.selectedOption.price,
        //total: this.selectedOption.price * this.numberOfItems
      });

      axios
      .put("https://euas.person.ee/user/carts/" + cart.id, cart)
      .then(() => {
        if(callback) {
          callback()
        }
      });

    },

     buyNow: function () {
      this.addToCart(null, () => {
        //redirect code
        this.$router.push('/cart');
      })
     
    }
  }
}
</script>

<style scoped>
.preview-image {
  max-width: 300px;
}
.items-picker {
  max-width: 300px;
}
.product-button {
  margin: 15px 15px 15px 0;
}

</style>
