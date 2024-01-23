/**
 * @typedef {Object} HouseDTO
 * @property {number} constructionYear
 * @property {string} createdAt
 * @property {string} description
 * @property {boolean} hasGarage
 * @property {number} id
 * @property {string} image
 * @property {Location} location
 * @property {boolean} madeByMe
 * @property {number} price
 * @property {Rooms} rooms
 * @property {number} size
 */
class HouseDTO {
    constructionYear;
    createdAt;
    description;
    hasGarage;
    id;
    image;
    location;
    madeByMe;
    price;
    rooms;
    size;
}

/**
 * @typedef {Object} Location
 * @property {string} city
 * @property {number} houseNumber
 * @property {string} houseNumberAddition
 * @property {string} street
 * @property {string} zip
 */
class Location {
    city;
    houseNumber;
    houseNumberAddition;
    street;
    zip;
}

/**
 * @typedef {Object} Rooms
 * @property {number} bathrooms
 * @property {number} bedrooms
 */
class Rooms {
    bathrooms;
    bedrooms;
}

export default HouseDTO;
