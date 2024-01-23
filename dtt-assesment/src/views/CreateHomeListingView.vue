<template>
  <div class="background-image">
  <div class="form-container w-full h-full">

    <div class="form-content">

      <BackToComponent style="margin-bottom: 1rem;" text="Back to overview" :navigate-to="{name: RouteTypes.HOME_PAGE.name}"></BackToComponent>
      <h2 style="margin-bottom: 1.2rem;">{{editMode ? 'Edit' : 'Create new'}} listing</h2>
      <div class="input-container">
        <InputComponent :validation-rules="[val => isFilledInValidationRule(val)]" @onInputUpdate="newVal => house.location.street = newVal" :value="house.location.street" header="Street name" placeholder="Enter the street name" :required="true"></InputComponent>
        <div class="double-input-container">
          <InputComponent :validation-rules="[val => isFilledInValidationRule(val), val => isNumberValidationRule(val)]" @onInputUpdate="newVal => house.location.houseNumber = newVal" :value="house.location.houseNumber" header="House number" placeholder="Enter the house number" :required="true"></InputComponent>
          <InputComponent @onInputUpdate="newVal => house.location.houseNumberAddition = newVal" :value="house.location.houseNumberAddition" header="Addition" placeholder="e.g. A"></InputComponent>
        </div>
        <InputComponent :validation-rules="[val => isFilledInValidationRule(val)]" @onInputUpdate="newVal => house.location.zip = newVal" :value="house.location.zip" header="Postal code" placeholder="e.g. 1000 AA" :required="true"></InputComponent>
        <InputComponent :validation-rules="[val => isFilledInValidationRule(val)]" @onInputUpdate="newVal => house.location.city = newVal" :value="house.location.city" header="City" placeholder="e.g. Utrecht" :required="true"></InputComponent>
        <InputComponent :validation-rules="[val => isFilledInValidationRule(val)]" @onInputUpdate="newVal => house.image = newVal" :value="house.image" header="Upload Picture (PNG or JPG)" :required="true" type="image"></InputComponent>
        <InputComponent :validation-rules="[val => isFilledInValidationRule(val), val => isNumberValidationRule(val)]" @onInputUpdate="newVal => house.price = newVal" :value="house.price" header="Price" placeholder="e.g. €150.000" :required="true"></InputComponent>
        <div class="double-input-container">
          <InputComponent :validation-rules="[val => isFilledInValidationRule(val)]" @onInputUpdate="newVal => house.size = newVal" :value="house.size" header="Size" :required="true" placeholder="e.g. 60m2"></InputComponent>
          <InputComponent :validation-rules="[val => isFilledInValidationRule(val)]" @onInputUpdate="newVal => house.hasGarage = newVal === 'Yes' " :value="house.hasGarage" header="Garage" :required="true" placeholder="Select" type="select"></InputComponent>
        </div>
        <div class="double-input-container">
          <InputComponent :validation-rules="[val => isFilledInValidationRule(val)]" @onInputUpdate="newVal => house.rooms.bedrooms = newVal" :value="house.rooms.bedrooms" header="Bedrooms" :required="true" placeholder="Enter amount"></InputComponent>
          <InputComponent :validation-rules="[val => isFilledInValidationRule(val), val => isNumberValidationRule(val)]" @onInputUpdate="newVal => house.rooms.bathrooms = newVal" :value="house.rooms.bathrooms" header="Bathrooms" :required="true" placeholder="Enter amount"></InputComponent>
        </div>
        <InputComponent  :validation-rules="[val => isFilledInValidationRule(val), val => isNumberValidationRule(val)]" @onInputUpdate="newVal => house.constructionYear = newVal" :value="house.constructionYear" header="Construction date" :required="true" placeholder="e.g. 1990"></InputComponent>
        <InputComponent :validation-rules="[val => isFilledInValidationRule(val)]" @onInputUpdate="newVal => house.description = newVal" :value="house.description" header="Description" :required="true" placeholder="Enter description"></InputComponent>
      </div>
      <div class="button-container">
        <button  @click="createHome" :class="['element-primary', isHouseValid ? '' : 'invalid-home']">POST</button>
      </div>

    </div>
  </div>

  </div>
</template>

<script setup>
import BackToComponent from "../components/BackToComponent.vue";
import {RouteTypes} from "../router/RouteTypes.js";
import InputComponent from "../components/InputComponent.vue";
import BackGroundImage from "../assets/img_background@3x.png"
import {computed, onBeforeMount, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {useHouseStore} from "../store/HouseStore.js";
import ApiHandler from "../api/ApiHandler.js";

const house = ref({
  constructionYear: undefined,
  createdAt: undefined,
  description: undefined,
  hasGarage: undefined,
  id: undefined,
  image: undefined,
  location: {
    city: undefined,
    houseNumber: undefined,
    houseNumberAddition: undefined,
    street: undefined,
    zip: undefined,
  },
  madeByMe: true,
  price: undefined,
  rooms: {
    bathrooms: undefined,
    bedrooms: undefined
  },
  size: undefined,
})

const router = useRouter()
const houseStore = useHouseStore()
const editMode = ref(false)

const isHouseValid = ref(false)

watch(house.value, (newValue, oldValue) => {
  const nonRequiredProperties = getNonRequiredProperties();
  console.log('JOUSEEE: ', newValue)

  for (let key in newValue) {
    if (nonRequiredProperties.includes(key)) continue;

    const value = newValue[key];

    if (value === undefined) {
      isHouseValid.value = false;
      console.log('INVALIDD')
      return
    }
  }

  isHouseValid.value = true;
}, {
  deep: true
})

function getNonRequiredProperties () {
  return ["id", "houseNumberAddition", "madeByMe","createdAt"]
}

function createHome() {
  // these endpoints give errors
  if (editMode.value)
      ApiHandler.getInstance().editHouse(house.value)
  else
      ApiHandler.getInstance().createHouse(house.value)
}

function isFilledInValidationRule(val) {
  return val => val.length > 0 ? true : 'This field is required.'
}

function isNumberValidationRule(val) {
  return isNumber(val) ? true : 'Not a valid number.'
}


function isNumber(val) {
  return !isNaN(val) && isFinite(val);
}

onBeforeMount(() => {
const homeId = router.currentRoute.value.params.houseId;
if (homeId) {
 const foundHouse = houseStore.findHouseById(Number.parseInt(homeId))
  if (foundHouse.madeByMe) {
    house.value =  foundHouse
    editMode.value = true;
  } else
      window.alert('No Access')
      router.back()

}
})
</script>

<style scoped>
button {
  border-radius: 5px;
  width: 8vw;
  height: 2.5rem;
  margin-bottom: 1rem;
}

.invalid-home {
  opacity: 50%;
  cursor: not-allowed;
}

.button-container {
  width: 25vw;
  display: flex;
  justify-content: flex-end;
}

.form-content {
  margin-top: 2rem;
  z-index: 1;
  margin-bottom: 2rem;
  margin-right: 1.5rem;
  height: 85vh;
  overflow: auto;
}




.background-image {
  background-image: url("../assets/img_background@3x.png");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  position: relative;
  width: 100vw;
  height: 100vh;
  z-index: 0;

}

.form-container {
  position: static;
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 1024px) {
  .background-image {
    height: auto;
    background-position: bottom center;
  }
  .form-container {

    position: static;
  }

  .double-input-container {
    width: 100% !important;
    gap: 1rem !important;
  }

  button {
    width: 100% !important;
  }

  .button-container {
    width: 100% !important;

  }

  .input-container > * {
    width: 100% !important;
  }
}





.input-container > * {
  margin-bottom: 1rem;
  width: 25vw;
  height: 100%;
  z-index: 1;
}

.double-input-container {
  display: flex;
  width: 25vw;
  gap: 4rem;
  height: 100%;
  z-index: 1;
}



.form-container {
  margin-left: .7rem;
  margin-right: .7rem;
}



</style>
