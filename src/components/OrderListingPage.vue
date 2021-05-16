<template>
  <div class="order-listing-page">
     <h3>Order Listing</h3>

    <table class ="table table-striped">
      <thead>
        <tr>
          <th scope="col">Order ID</th>
          <th scope="col">Items</th>
          <th scope="col"></th>
        </tr>
        </thead>
          <tbody v-if="orders.length">
            <tr v-for="order in orders" :key="order.id">
              <td> {{ order.id }} </td>
              <td>{{ order.items.length }} item(s)</td>
              <td class="text-right"> 
                <b-button variant="outline-info" @click="openOrderDetails(order.id)">Details</b-button>
              </td> 
            </tr>
          </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'OrderListingPage',
  components: {
  },
 data () {
    return {
     orders: {},  
    };
  },
  mounted () {
    axios
      .get("https://euas.person.ee/user/orders/")
      .then(response => {
        this.orders = response.data
      });
  },
  methods: {
  openOrderDetails: function (orderId) {
      this.$router.push('/profile/orders/' + orderId);
    },   
  },
}
</script>

<style scoped>
</style>
