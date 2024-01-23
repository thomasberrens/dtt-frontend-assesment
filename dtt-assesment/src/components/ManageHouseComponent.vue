<script setup>
import RedPencilIcon from "../assets/ic_edit@3x.png"
import WhitePencilIcon from "../assets/ic_edit_white@3x.png"
import TrashIcon from "../assets/ic_delete@3x.png"
import WhiteTrashIcon from "../assets/ic_delete_white@3x.png"

const props = defineProps({
  isWhite: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const emit = defineEmits(['onEditClick'])


</script>

<template>
<div>
 <img class="cursor-pointer" @click="emit('onEditClick')" :src="isWhite ? WhitePencilIcon : RedPencilIcon" alt="edit house">
 <img class="cursor-pointer" :src="isWhite ? WhiteTrashIcon :TrashIcon" alt="delete house">
</div>
</template>

<style scoped>

img {
  object-fit: contain;
}

@media (max-width: 1023px) {
  img {
    width: 1rem;
    height: 1rem;
    margin-left: .5rem;
  }
}

@media (min-width: 1024px) {
  img {
    width: 1.3rem;
    height: 1.3rem;
    margin-left: .8rem;
  }
}
</style>
