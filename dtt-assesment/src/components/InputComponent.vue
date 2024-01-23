<script setup>
import {onBeforeMount, ref} from "vue";
import UploadImageIcon from "../assets/ic_upload@3x.png"
import ClearImageIcon from "../assets/ic_clear_white@3x.png"
const props = defineProps({
  type: {
    type: String,
    required: false,
    default: "text",
  },
  header: {
    type: String,
    required: false,
    default: "",
  },
  placeholder: {
    type: String,
    required: false,
    default: "",
  },
  value: {
    type: String,
    required: false,
    default: "",
  },
  validationRules: {
    type: Array,
    required: false,
    default: (value) => [],
  },
  required: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const invalidMsg = ref("");
const inputValue = ref()
const emit = defineEmits(["onValidateUpdate", "onInputUpdate"])
const fileInput = ref()

function triggerFileInput() {
  fileInput.value.click();
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  console.log("file: ", file)
  if (file) {

    inputValue.value = URL.createObjectURL(file);
    console.log("imageSrc: ", inputValue.value)

    emit('onInputUpdate', inputValue.value)

  }
}

function validateInput(event) {
  console.log(event);

  const value = event.data;
  const validationRules = props.validationRules;
  let valueToTest = value ? inputValue.value + value : inputValue.value

  if (value === null)
    valueToTest = valueToTest.slice(0, -1)

  invalidMsg.value = "";

  for (let i = 0; i < validationRules.length; i++) {
    const rule = validationRules[i];
    console.log("rule: ", rule)

    const ruleTest = rule(valueToTest);
    console.log("valueToTest: ", valueToTest)
    console.log("ruleTest: ", ruleTest)
    if (typeof ruleTest === "string") {
      console.log("invalid input");
      invalidMsg.value = ruleTest;
      break;
    }
  }

  emit('onValidateUpdate', invalidMsg.value.length === 0)
  emit('onInputUpdate', valueToTest)
}

onBeforeMount(() => {
  if (props.value === undefined || props.value === null) return

    inputValue.value = props.value;
  console.log(' not undefined: ', inputValue.value)

    if (props.type === "select") {
      console.log('INPUT VAL: ', inputValue.value)
       if (inputValue.value === true)
         inputValue.value = "Yes"
      else if (inputValue.value === false)
        inputValue.value = "No"

    }

})

</script>

<template>
  <div class="w-full h-full">
    <h3 class="w-full text-secondary">{{header}}{{required ? '*' : ' (optional)'}}</h3>
    <input v-if="type === 'text'" :class="['h-full w-full', invalidMsg.length > 0 ? 'invalid text-red' : '']" v-model="inputValue" @beforeinput="validateInput" :placeholder="placeholder" :required="required">
    <select v-if="type === 'select'"
            :class="['h-full w-full', invalidMsg.length > 0 ? 'invalid text-red' : '', inputValue.length === 0 ? 'select-placeholder' : '']"
            v-model="inputValue"
            @change="validateInput"
            :required="required">
      <option disabled value="">Select</option>
      <option v-for="option in ['Yes', 'No']" :value="option">{{ option }}</option>
    </select>

    <div v-if="type === 'image'"  class="image-upload-placeholder">
      <img class="cursor-pointer" @click="triggerFileInput" v-if="inputValue.length === 0" :src="UploadImageIcon" alt="Upload Placeholder">
      <img class="cursor-pointer" @click="triggerFileInput" v-if="inputValue.length > 0" :src="inputValue" alt="Uploaded Image">
      <div @click="inputValue = ''" v-if="inputValue.length > 0" class="clear-image-container cursor-pointer">
        <img :src="ClearImageIcon" alt="Clear Image">
      </div>
      <input accept=".png, .jpg, .jpeg" type="file" ref="fileInput" @change="handleFileUpload" :required="required" class="hidden">
    </div>

    <span v-if="invalidMsg.length > 0" class="text-red italic">{{invalidMsg}}</span>
  </div>
</template>

<style scoped>

.clear-image-container {
  position: absolute;
  top: -.6rem;
  right: -.6rem;
  z-index: 10;
  width: 2rem;
  height: 2rem;
}

.image-upload-placeholder {
  width: fit-content;
  height: 100%;
  position: relative;


}

.image-upload-placeholder img {
  max-width: 100%;
  max-height: 100%;
}
.hidden {
  display: none;
}

.select-placeholder {
  color: rgb(195,195,195);
  font-family: 'Open Sans', sans-serif;
}

.invalid {
  border: 1px solid rgb(235,84,64);
}

span {
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  font-weight: 600;
}

select, input {
  padding: 1rem;
  box-sizing: border-box;
}

select {
  width: 100%;
  height: 100%;
  padding-right: 5rem !important;
}


h3 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: .4rem;
}

@media screen and (max-width: 1024px) {
  h3 {
    width: 100%;
  }

  input {
    width: 100% !important;
  }
}

</style>
