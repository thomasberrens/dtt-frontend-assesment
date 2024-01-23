<script setup>
import ArrowGreyIcon from "../assets/ic_back_grey@3x.png"
import ArrowWhiteIcon from "../assets/ic_back_white@3x.png"
import {useRouter} from "vue-router";

const router = useRouter();

const props = defineProps({
  isWhite: {
    type: Boolean,
    required: false,
    default: false,
  },
  text: {
    type: String,
    required: false,
  },
  navigateTo: {
    type: Object,
    required: true,
  }
})

function navigateBack() {
  router.push(props.navigateTo);
}

</script>

<template>
<div @click="navigateBack" class="flex cursor-pointer">
  <img class="arrow-container" :src="isWhite ? ArrowWhiteIcon : ArrowGreyIcon" alt="navigate back">
  <h3>{{text}}</h3>
</div>
</template>

<style scoped>

@media (max-width: 1023px) {
  .arrow-container {
    width: 1rem;
    height: 1rem;
  }
}

@media (min-width: 1024px) {
  .arrow-container {
    width: 1.3rem;
    height: 1.3rem;
  }
}


.arrow-container {
  object-fit: contain;
}

h3 {
  font-size: 15px;
  margin-left: .5rem;

}
</style>
