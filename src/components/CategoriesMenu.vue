<template>
  <div class="categories-menu">
    <div>
      <b-nav vertical>
        <b-nav-item 
        v-for="category in categories" 
        :key="category.alias" 
        :to="'/categories/' + category.alias"> {{ category.title }}
        </b-nav-item>
      </b-nav>
</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'CategoriesMenu',
  data () {
    return {
      categories: []
    };
  },
  mounted () {
    axios
      .get("https://euas.person.ee/categories")
      .then(response => {
        this.categories = response.data;
      });
  }
}
</script>

<style scoped>
</style>
