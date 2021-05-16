import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import MainPage from './components/MainPage'
import HelpPage from './components/HelpPage'
import CategoryPage from './components/CategoryPage'
import ProductPage from './components/ProductPage'
import ShoppingCartPage from './components/ShoppingCartPage'
import OrderListingPage from './components/OrderListingPage'
import OrderPage from './components/OrderPage'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from "axios";

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueRouter)
axios.defaults.headers.common['Authorization'] = 'Bearer me@muhnagy.com'
const router = new VueRouter({
    routes: [
        {path: '/', component: MainPage},
        {path: '/help', component: HelpPage},
        {path: '/categories/:categoryAlias', component: CategoryPage},
        {path: '/products/:productId', component: ProductPage},
        {path: '/cart', component: ShoppingCartPage},
        {path: '/profile/orders', component: OrderListingPage},
        {path: '/profile/orders/:orderId', component: OrderPage}
    ],
    mode: 'history'
});
//axios.defaults.headers.common['Authorization'] ='Bearer mohammad.ramadan.mahmoud@gmail.com'
if (localStorage.shoppingCartId) {
    axios
        .get("https://euas.person.ee/user/carts/" + localStorage.shoppingCartId)
        .then(response => {
            new Vue({
                render: h => h(App),
                router: router,
                cart: response.data
            }).$mount('#app')
        });
} else {
    axios
        .post("https://euas.person.ee/user/carts/")
        .then(response => {
            localStorage.shoppingCartId = response.data.id;
            new Vue({
                render: h => h(App),
                router: router,
                cart: response.data
            }).$mount('#app')
        });
}
Vue.prototype.$forceCompute = function (computedName, forceUpdate /* default: true */) {
    if (this._computedWatchers[computedName]) {
        this._computedWatchers[computedName].run();
        if (forceUpdate || typeof forceUpdate == 'undefined') this.$forceUpdate()
    }
}

