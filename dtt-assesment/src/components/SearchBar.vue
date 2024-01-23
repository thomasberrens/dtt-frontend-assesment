<script setup>
import SearchIcon from "../assets/ic_search@3x.png"
import ClearIcon from "../assets/ic_clear@3x.png"
import {ref} from "vue";

const emit = defineEmits(["query"]);
const currentQuery = ref("");

function onQueryChange(query) {
  emit("query", query);
  currentQuery.value = query;
}

function onInput(event) {
  const query = event.target.value;
  onQueryChange(query)

}

</script>

<template>
  <div style="border-radius: 5px;" class="flex searchContainer element-tertiary-light">
    <img alt="search" class="icon" :src="SearchIcon">
  <input @input="onInput" v-model="currentQuery" class="element-tertiary-light text-secondary " placeholder="Search for a house">
    <div class="w-full justify-end flex">
    <img @click="onQueryChange('')" v-if="currentQuery.length > 0" style="margin-top: .65rem; margin-right: .5rem;" alt="search" class="icon cursor-pointer" :src="ClearIcon">
    </div>
  </div>
</template>

<style scoped>

.searchContainer {
  height: 100%;
  width: 100%;
  padding-left: 1rem;
  max-height: 2.5rem;

}

.icon {
  height: 1.2rem;
  width: 1.2rem;
  margin-top: .65rem;
  margin-right: .5rem;
  object-fit: contain;
}

</style>
