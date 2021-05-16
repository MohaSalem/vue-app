<template>
  <div id="app">
    <b-container>
        <b-row>
          <b-col cols="12"><Navigation/></b-col>
        </b-row>
        <b-row>
          <b-col cols="3"><CategoriesMenu/></b-col>
          <b-col cols="9">
            <router-view :key="$route.fullPath"></router-view>
          </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import CategoriesMenu from './components/CategoriesMenu.vue'

export default {
  name: 'App',
  components: {
    Navigation,
    CategoriesMenu,
  }
}
</script>

<style>
</style>
