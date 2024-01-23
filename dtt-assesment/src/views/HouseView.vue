<script setup>

import {onBeforeMount, onMounted, ref} from "vue";
import {onBeforeRouteUpdate, useRouter} from "vue-router";
import {useHouseStore} from "../store/HouseStore.js";
import BedIcon from "../assets/ic_bed@3x.png";
import LocationIcon from "../assets/ic_location@3x.png"
import IconRenderer from "../components/IconRenderer.vue";
import PriceIcon from "../assets/ic_price@3x.png"
import SizeIcon from "../assets/ic_size@3x.png"
import ConstructionIcon from "../assets/ic_construction_date@3x.png"
import BathroomIcon from "../assets/ic_bath@3x.png"
import GarageIcon from "../assets/ic_garage@3x.png"
import RecommendedHouses from "../components/RecommendedHouses.vue";
import {RouteTypes} from "../router/RouteTypes.js";
import BackToComponent from "../components/BackToComponent.vue";
import ManageHouseComponent from "../components/ManageHouseComponent.vue";
const router = useRouter();
const houseStore = useHouseStore();

const viewedHouse = ref(null);

onBeforeRouteUpdate((to, from, next) => {
  console.log("HouseView.vue onBeforeRouteUpdate");

  if (to.params.id === from.params.id)
    return

  if (to.name === RouteTypes.HOUSE_DETAIL_PAGE.name) initializeHouseView(to.params.id)


  next();

})

function initializeHouseView(id) {


  // get house from store
  const cachedHouse = houseStore.findHouseById(Number.parseInt(id));

  console.log("all houses: ", houseStore.getHouses);
  console.log("cachedHouse: ", cachedHouse);

  if (!cachedHouse) {
    houseStore.retrieveHouseById(id).then((house) => {
      console.log("house: ", house.data);
      viewedHouse.value = house.data[0];
    }).catch((error) => {
      console.log("error: ", error);
    });
  } else {
    viewedHouse.value = cachedHouse;
  }
}

function formatPrice(price) {
  return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.');
}

onMounted(() => {
  console.log("HouseView.vue onBeforeMount");
  initializeHouseView(router.currentRoute.value.params.id)

})
</script>

<template>
  <div class="h-full w-full ">
    <div class="main-container">

      <div v-if="!!viewedHouse" class="content-container">
        <div class="additionals-container">
        <div class="back-to-overview-container">
          <BackToComponent class="hide-on-mobile" text="Back to overview" :navigate-to="{name: RouteTypes.HOME_PAGE.name}"></BackToComponent>
          <BackToComponent class="hide-on-desktop" :is-white="true" :navigate-to="{name: RouteTypes.HOME_PAGE.name}"></BackToComponent>
        </div>

        <div v-if="viewedHouse.madeByMe"  class="manage-house-container hide-on-desktop">
          <ManageHouseComponent @onEditClick="router.push({name: RouteTypes.CREATE_HOME_LISTING_PAGE.name, params: {houseId: viewedHouse.id}})" :is-white="true"></ManageHouseComponent>
        </div>
        </div>
        <img class="house-image-container" :src="viewedHouse.image" alt="house image">
        <section class="">
          <div class="section-content">
            <h2>{{viewedHouse.location.street}} {{viewedHouse.location.houseNumber}}{{viewedHouse.location.houseNumberAddition}}</h2>
            <div v-if="viewedHouse.madeByMe" class="manage-house-container cursor-pointer hide-on-mobile">
              <ManageHouseComponent @onEditClick="router.push({name: RouteTypes.CREATE_HOME_LISTING_PAGE.name, params: {houseId: viewedHouse.id}})"></ManageHouseComponent>
            </div>
            <div class="house-details">
            <IconRenderer :text="viewedHouse.location.zip + ' ' + viewedHouse.location.city" :icon="LocationIcon"></IconRenderer>
              <div style="margin-top: .6rem;" class="flex">
              <IconRenderer :text="formatPrice(viewedHouse.price)" :icon="PriceIcon"></IconRenderer>
              <IconRenderer :text="viewedHouse.size" :icon="SizeIcon"></IconRenderer>
              <IconRenderer :text="'Built in ' + viewedHouse.constructionYear" :icon="ConstructionIcon"></IconRenderer>
              </div>
              <div style="margin-top: .6rem;" class="flex">
              <IconRenderer :text="viewedHouse.rooms.bedrooms" :icon="BedIcon"></IconRenderer>
              <IconRenderer :text="viewedHouse.rooms.bathrooms" :icon="BathroomIcon"></IconRenderer>
              <IconRenderer :text="viewedHouse.hasGarage ? 'Yes' : 'No'" :icon="GarageIcon"></IconRenderer>
            </div>
              <p class="font-open-sans-semibold">
                {{viewedHouse.description}}
              </p>
            </div>
          </div>
        </section>

      </div>
      <div class="recommended-houses-container">
        <div>
        <RecommendedHouses></RecommendedHouses>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>


h2 {
  max-width: 80%;
}

.back-to-overview-container {
  align-self: flex-start;

}

.recommended-houses-container {
  align-self: flex-start;
}

.house-details {
  margin-top: 1rem;
}

.section-content {
  margin: 1rem;

}

section {
  background: white;
  width: 100%;
  position: relative;
}
.house-image-container {

  width: 100%;
  height: 100%;


}

.main-container {
  margin-bottom: 10vh;
}



@media (max-width: 1023px) {
  .content-container {
    width: 100%;

  }

  .house-image-container {
    margin-top: -2rem;
  }

  .additionals-container {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-left: .5rem;
    margin-right: .5rem;
    margin-top: .5rem;
  }

  .manage-house-container {


  }

  .back-to-overview-container {

  }


  .main-container {
    flex-direction: column;
  }

  .recommended-houses-container div {
    margin-left: .5rem;
    margin-right: .5rem;
  }

  .recommended-houses-container {
    max-width: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

    margin-top: -3rem;
    margin-bottom: 5rem;
  }

  section {
    top: -5rem;
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
    padding-bottom: 1rem;
  }

  section h2 {
    padding-top: 1rem;

  }

}


@media (min-width: 1024px) {

  .content-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
  }

  .house-image-container {
    margin-top: 1rem;
  }

  .recommended-houses-container {
    margin-left: 3vw;
    margin-top: 5rem;
    width: 55%;
    max-height: 80vh;
  }

  .main-container {
    margin-left: .7rem;
  }

  .additionals-container {
    position: relative;
    display: flex;
    align-self: start;

  }

  .back-to-overview-container {
    margin-top: 2rem;
    margin-bottom: .3rem;
    width: 100% !important;
  }

  .manage-house-container {
    position: absolute;
    right: 1rem;
    top: 1rem;
  }


}

.main-container {
  display: flex;
  width: 100%;
  height: 100%;
}

</style>
