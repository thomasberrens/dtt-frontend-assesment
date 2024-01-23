<script setup>
import Logo from "../../assets/img_logo_dtt@3x.png";
import {useRouter} from "vue-router";
import {RouteTypes} from "../../router/RouteTypes.js";

const router = useRouter();

function goToView(routeName) {
  router.push({name: routeName})
}

</script>

<template>
  <nav class="navbar flex">
    <div class="item-container content">
      <img :src="Logo" alt="Logo" class="logo"/>
      <div class="flex nav-links">
        <h3 @click="goToView(RouteTypes.HOME_PAGE.name)" :class="router.currentRoute.value.name !== RouteTypes.HOME_PAGE.name ? 'not-on-route cursor-pointer' : 'cursor-pointer'">Houses</h3>
        <h3 @click="goToView(RouteTypes.ABOUT_PAGE.name)" :class="router.currentRoute.value.name !== RouteTypes.ABOUT_PAGE.name ? 'not-on-route cursor-pointer' : ' cursor-pointer'">About</h3>
      </div>
    </div>
  </nav>
</template>


<style scoped>

.item-container {
  margin-left: 10rem;
  display: flex;
  align-items: center;
  width: 100%;
}
.navbar {
  background-color: white;
  padding: .5rem;
  top: 0;
  width: 100%;
  z-index: 10;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14);
  position: relative;
}



.not-on-route {
  font-weight: 500 !important;
  color: rgb(195, 195, 195);
}

.logo {
  height: 50px; /* Adjust as needed */
}

.nav-links {
  list-style: none;
  gap: 3rem;
  margin-left: 5rem;
}

.nav-links a {
  color: black;
  text-decoration: none;
}
</style>
