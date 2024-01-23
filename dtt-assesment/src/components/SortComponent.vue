<script setup>

import {onMounted, ref} from "vue";

const currentSort = ref("price");

const emit = defineEmits(["sort-update"]);

function setSort(sort) {
  currentSort.value = sort;
  onSortUpdate(sort);
}

function onSortUpdate(sort) {
  emit("sort-update", sort);
}

onMounted(() => {
  onSortUpdate(currentSort.value);
})


</script>

<template>
  <div class="flex">
    <button @click="setSort('price')" style="border-bottom-left-radius: 5px; border-top-left-radius: 5px;" :class="currentSort === 'price' ? 'element-primary' : 'element-tertiary-dark'">Price</button>
    <button @click="setSort('size')" style="border-bottom-right-radius: 5px; border-top-right-radius: 5px;" :class="currentSort === 'size' ? 'element-primary' : 'element-tertiary-dark'">Size</button>
  </div>
</template>

<style scoped>
button {
  width: 100%;
  text-align: center;
}
</style>
