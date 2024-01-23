<script setup>

import {onBeforeMount} from "vue";
import ApiHandler from "../api/ApiHandler.js";
import HouseDTO from "../api/dto/HouseDTO.js";
import BedIcon from "../assets/ic_bed@3x.png"
import BathroomIcon from "../assets/ic_bath@3x.png"
import SizeIcon from "../assets/ic_size@3x.png"
import IconRenderer from "./IconRenderer.vue";
import ManageHouseComponent from "./ManageHouseComponent.vue";

const props = defineProps({
  house: {
    type: Object,
    required: true,
  },
  showMadeByMe: {
    type: Boolean,
    required: false,
    default: false,
  }
});

function formatPrice(price) {
  return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.');
}

onBeforeMount(() => {
  console.log("HousePreview.vue onBeforeMount");


})

</script>

<template>
<section class="background-white house-card ">
  <div class="content-container flex">
  <img class="image-display" :src="house.image" alt="house">
  <div class="data-container w-full">
    <div v-if="showMadeByMe && house.madeByMe" class="manage-house-container">
      <ManageHouseComponent></ManageHouseComponent>
    </div>
    <h2>{{house.location.street}} {{house.location.houseNumber}}{{house.location.houseNumberAddition}}</h2>
    <p class="font-open-sans-semibold">€ {{formatPrice(house.price)}}</p>
    <h3 class="font-open-sans-semibold text-tertiary-dark">{{house.location.zip}} {{house.location.city}}</h3>
    <div class="flex">
      <IconRenderer :text="house.rooms.bedrooms" :icon="BedIcon"></IconRenderer>
      <IconRenderer :text="house.rooms.bathrooms" :icon="BathroomIcon"></IconRenderer>
      <IconRenderer :text="house.size + ' m2'" :icon="SizeIcon"></IconRenderer>
    </div>
  </div>
  </div>
</section>
</template>

<style scoped>
h2 {
  max-width: 80%;
}

section {
  position: relative;
}

.manage-house-container {
  position: absolute;

}

.house-card {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

@media (max-width: 1023px) {
  h2 {
    font-size: 15px;
  }
  .data-container > * {
    margin-top: 0.38rem;
  }

  .manage-house-container {
    right: .5rem;
    top: 1rem;
  }
}
@media (min-width: 1023px) {
  .data-container > * {
    margin-top: 0.7rem;
  }

  .manage-house-container {
    right: 1.5rem;
    top: 1rem;
  }
}


.data-container {
 margin-left: 1rem;

}

.content-container {
  padding: 1rem;
}


@media (min-width: 1024px) {
  .image-display {
    height: 9rem;
    width: 9rem;
    border-radius: 7px;
    object-fit: cover;
  }
}

@media (max-width: 1023px) {
  .image-display {
    height: 6.5rem;
    width: 6.5rem;
    border-radius: 7px;
    object-fit: cover;
  }
}

p {
  margin: 0;
}


</style>
