<script setup>

import HousePreview from "../components/HousePreview.vue";
import {onBeforeMount, ref} from "vue";
import ApiHandler from "../api/ApiHandler.js";
import HouseDTO from "../api/dto/HouseDTO.js";
import SearchBar from "../components/SearchBar.vue";
import SortComponent from "../components/SortComponent.vue";
import PlusIcon from "../assets/ic_plus_white@3x.png"
import PlusGrayIcon from "../assets/ic_plus_grey@3x.png"
import NoResultsFoundImage from "../assets/img_empty_houses@3x.png"
import Routes from "../router/routes.js";
import {useRouter} from "vue-router";
import {RouteTypes} from "../router/RouteTypes.js";
import {useHouseStore} from "../store/HouseStore.js";

const houseStore = useHouseStore()
const displayedHouses = ref([]);
const isSearching = ref(false);
const router = useRouter()


onBeforeMount(() => {
  console.log("HomeView.vue onBeforeMount");

  if (houseStore.getHouses.length === 0) houseStore.initializeHouses(() => displayedHouses.value = houseStore.getHouses);
  else displayedHouses.value = houseStore.getHouses


})

function onQuery(query) {
  console.log("query: ", query);
  isSearching.value = query.length > 0;

  displayedHouses.value = houseStore.getHouses.filter((house) => {
    return house.location.city.toLowerCase().includes(query.toLowerCase());
  });
}

function onSort(sort) {
  console.log("sort: ", sort);

  displayedHouses.value = displayedHouses.value.sort((a, b) => {
    if (sort === "price") {
      return b.price - a.price;
    } else if (sort === "size") {
      return b.size - a.size;
    }
  });
}

function goToView(routeName) {
  router.push({name: routeName})
}

function goToHouseView(houseId) {
  router.push({name: RouteTypes.HOUSE_DETAIL_PAGE.name, params: {id: houseId}})
}

</script>

<template>
  <div class="h-full w-full">
    <div v-if="houseStore.getHouses.length > 0" class="main-container">

      <div class="content-container">
        <div style="margin-top: 2rem; margin-bottom: .5rem;" class="flex justify-between">
        <h1 class="center-on-mobile w-full">Houses</h1>
          <button @click="goToView(RouteTypes.CREATE_HOME_LISTING_PAGE.name)" style="" class="element-primary create-new-button hide-on-mobile">
            <img alt="create-listing" style="height: 1rem; margin-right: .8rem; padding-left: .6rem;" :src="PlusIcon">
            CREATE NEW
          </button>

          <img @click="goToView(RouteTypes.CREATE_HOME_LISTING_PAGE.name)" style="height: 1rem; margin-right: .1rem;" alt="create-listing" :src="PlusGrayIcon" class="hide-on-desktop cursor-pointer">
        </div>
        <div class="additionals-container">
        <div class="search-container">
        <SearchBar @query="onQuery"></SearchBar>
        </div>
        <div class="sort-container flex">
         <SortComponent @sort-update="onSort" class="sort-component"></SortComponent>
        </div>
        </div>
        <div v-if="isSearching" style="margin-top: 1rem;" class="flex justify-start">
          <h2 v-if="displayedHouses.length > 0">{{displayedHouses.length}} results found</h2>
          <div class="no-results-found-container" v-if="displayedHouses.length === 0">
            <img :src="NoResultsFoundImage" alt="no results found">
            <span class="font-open-sans-semibold">No results found.</span>
            <span class="font-open-sans-semibold">Please try another keyword.</span>
          </div>
        </div>
        <div @click="goToHouseView(house.id)" class="house cursor-pointer" v-for="house in displayedHouses">
          <house-preview :show-made-by-me="true" :house="house"></house-preview>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>



.no-results-found-container {
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.no-results-found-container > * {
  margin-top: .2rem;
}

@media (max-width: 1023px) {
  .no-results-found-container img  {
    width: 100% !important;
  }

  .no-results-found-container span {
    font-size: 18px;
  }

  .center-on-mobile {
    display: flex;
    justify-content: center;
  }

  .additionals-container {
    flex-direction: column;
  }

  .sort-component {
    width: 100%;
  }

  .search-container {
    width: 100%;
  }

  .content-container {
    width: 90%;
    margin-left: 1rem;
    margin-right: 1rem;
  }

}

.no-results-found-container img {
  width: 40vw;
}

.additionals-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

@media (min-width: 768px) and (max-width: 1000px) {
  .sort-container {
    width: 22vw;
  }
}

@media (min-width: 1024px) {
  .no-results-found-container span {
    font-size: 20px;
  }

  .search-container {
    width: 20rem;
    height: 2.5rem;
    margin-top: 1rem;
  }

  .content-container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .sort-component {
    width: 18rem;
  }

  .main-container {
    margin-left: .5rem;
  }
}


.sort-component {
  height: 2.5rem;
}


.search-container {
  display: flex;
  height: 2.5rem;
  margin-top: 1rem;
}


.sort-container {
  margin-top: 1rem;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 10vh;


}

.create-new-button {
  border-radius: 5px;
  height: 2.6rem;
  width:16rem;
  margin-bottom: 1rem;
  padding-right: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.house {
  width: 100%;
  margin-top: 1rem;
}

</style>


