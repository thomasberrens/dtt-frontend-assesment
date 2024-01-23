<script setup>

import HousePreview from "./HousePreview.vue";
import {useHouseStore} from "../store/HouseStore.js";
import {RouteTypes} from "../router/RouteTypes.js";
import {useRouter} from "vue-router";

const houseStore = useHouseStore()
const router = useRouter()

function getRecommendedHouses() {
  return houseStore.getHouses.slice(0, 3);
}

function goToHouseView(houseId) {
  router.push({name: RouteTypes.HOUSE_DETAIL_PAGE.name, params: {id: houseId}})
}

</script>

<template>
  <div>
<h3>Recommended for you</h3>
  <div @click="goToHouseView(house.id)" class="house-container cursor-pointer" v-for="house in getRecommendedHouses()" :key="house.id">
    <HousePreview :house="house"></HousePreview>
  </div>
</div>
</template>

<style scoped>


.house-container {
  margin-top: 1rem;
  width: 100%;
}
</style>
