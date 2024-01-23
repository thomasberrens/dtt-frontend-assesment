<script setup>


import LocationIcon from "../assets/ic_location@3x.png";

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },

  text: {
    type: String,
    required: true,
  },
});

</script>

<template>
  <div class="flex icon-container">
    <img class="icon-display" :src="icon" alt="house icon">
    <span class="font-open-sans-semibold text-secondary icon-info">{{text}}</span>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .icon-info {
    margin-left: 0.5rem;
    margin-top: -0.2rem;
  }
}

@media (max-width: 1023px) {
  .icon-info {
    margin-left: 0.4rem;
  }
}

.icon-display {
  height: 1rem;
  width: 1rem;
  object-fit: contain;

}

.icon-container {
  margin-right: 1rem;
}
</style>
