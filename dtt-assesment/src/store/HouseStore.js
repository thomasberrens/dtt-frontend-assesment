// store.js
import { defineStore } from 'pinia'
import ApiHandler from "../api/ApiHandler.js";

export const useHouseStore = defineStore('houseStore', {
    state: () => {
        return {
            houses: [],
        }
    },
    actions: {
        initializeHouses(onSuccess = () => {}) {
            ApiHandler.getInstance().getHouses().then((response) => {
                this.houses = response.data;
                onSuccess();
            })
        },

        /**
         * Retrieves a house by its id
         * @returns {Promise<ApiResponse<HouseDTO[]>>}
         */
        retrieveHouseById(id) {
            return ApiHandler.getInstance().getHouseById(id);
        },

        addHouse(house) {
            this.houses.push(house);
        }
    },
    getters: {
        getHouses: (state) => state.houses,
        findHouseById: (state) => (id) => {
            return state.houses.find(house => house.id === id)
        }
    }
})
