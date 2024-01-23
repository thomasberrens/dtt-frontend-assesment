import axios from 'axios';
import HouseDTO from "./dto/HouseDTO.js";


/**
 * @template T
 * @typedef {Object} ApiResponse
 * @property {T} data - The response data.
 */
class ApiHandler {

    // api key:
    static instance;

    constructor() {
        if (ApiHandler.instance) {
            return ApiHandler.instance;
        }

        this.client = axios.create({
            baseURL: 'https://api.intern.d-tt.nl/api/houses/',
            headers: {
                'X-Api-Key': '2owdJCaDK_gUiy7QxjXA-3eGT1BVtHzL'
            }
        });
    }

    static getInstance() {
        if (!ApiHandler.instance) {
            ApiHandler.instance = new ApiHandler();
        }
        return ApiHandler.instance;
    }

    /**
     * Retrieves all houses
     * @returns {Promise<ApiResponse<HouseDTO[]>>}
     */
    getHouses() {
        return this.get('');
    }

    createHouse(house) {
        return this.post('', house)
    }

    editHouse(newHouse) {
        return this.post(newHouse.id.toString(), newHouse)
    }

    /**
     * Retrieves a house by its id
     * @returns {Promise<ApiResponse<HouseDTO[]>>}
     */
    getHouseById(id) {
        return this.get(id);
    }

    get(url, params = {}) {
        return this.client.get(url, { params })
    }

    post(url, data = {}) {
        return this.client.post(url, data)
    }


    delete(url, params = {}) {
        return this.client.delete(url, { params })
    }
}

export default ApiHandler;
