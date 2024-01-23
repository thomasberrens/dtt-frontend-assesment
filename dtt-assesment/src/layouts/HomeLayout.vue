<script setup>

import MobileNavbar from "../components/navbar/MobileNavbar.vue";
import DesktopNavbar from "../components/navbar/DesktopNavbar.vue";

</script>

<template>
  <div class="hide-on-mobile w-full h-full">
    <DesktopNavbar></DesktopNavbar>
    <div class="overflow-wrapper">
    <div class="content">
      <router-view></router-view>
    </div>
    </div>
  </div>

  <div class="hide-on-desktop w-full h-full">
    <MobileNavbar></MobileNavbar>
    <div class="overflow-wrapper">

      <div class="content">
    <router-view></router-view>
      </div>
    </div>

  </div>


</template>

<style scoped>

.overflow-wrapper {
  max-height: 100vh;
  max-width: 100vw;
  overflow-y: auto;
}

@media (min-width: 1024px) {


  .content {
    margin-left: 10rem;
    margin-right: 10rem;
  }
}

</style>
