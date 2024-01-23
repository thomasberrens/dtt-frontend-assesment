const RouteTypes = new class {
    HOME_PAGE_LAYOUT = {
        name: 'Home',
        path: ''
    }

    HOME_PAGE = {
        name: "Home Page",
        path: ''
    }

    ABOUT_PAGE = {
        name: 'About',
        path: '/about'
    }

    CREATE_HOME_LISTING_PAGE = {
        name: 'Create Home',
        path: '/create-home/:houseId?'
    }

    HOUSE_DETAIL_PAGE = {
        name: 'House Detail',
        path: '/house/:id'
    }
}

export {RouteTypes};
