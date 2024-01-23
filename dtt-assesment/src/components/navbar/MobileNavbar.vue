<script setup>
import HouseIcon from "../../assets/ic_mobile_navigarion_home@3x.png"
import HouseIconActive from "../../assets/ic_mobile_navigarion_home_active@3x.png"
import InfoIcon from "../../assets/ic_mobile_navigarion_info@3x.png"
import InfoIconActive from "../../assets/ic_mobile_navigarion_info_active@3x.png"
import {useRouter} from "vue-router";
import {RouteTypes} from "../../router/RouteTypes.js";

const router = useRouter();
</script>

<template>
  <nav class="bottom-navbar flex justify-center">
    <div class="navbar-content">
    <img :src="router.currentRoute.value.name === RouteTypes.HOME_PAGE.name ? HouseIconActive : HouseIcon" alt="Home" class="navbar-icon"/>
    <img :src="router.currentRoute.value.name === RouteTypes.ABOUT_PAGE.name ? InfoIconActive : InfoIcon" alt="About" class="navbar-icon"/>
    </div>
  </nav>
</template>

<style scoped>

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50vw;
  height: 100%;
}

.bottom-navbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 4rem;
  background-color: #fff;
  box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
  align-items: center;
  z-index: 1000;
}

.navbar-icon {
  width: 24px;
  height: 24px;

}
</style>

