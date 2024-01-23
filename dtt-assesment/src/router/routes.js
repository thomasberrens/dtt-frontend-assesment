import {RouteTypes} from "./RouteTypes.js";

export default [
    {
        path: RouteTypes.HOME_PAGE_LAYOUT.path,
        name: RouteTypes.HOME_PAGE_LAYOUT.name,
        component: () => import("../layouts/HomeLayout.vue"),
        children: [
            {
                path: RouteTypes.HOME_PAGE.path,
                name: RouteTypes.HOME_PAGE.name,
                component: () => import("../views/HomeView.vue"),
            },
            {
                path: RouteTypes.CREATE_HOME_LISTING_PAGE.path,
                name: RouteTypes.CREATE_HOME_LISTING_PAGE.name,
                component: () => import("../views/CreateHomeListingView.vue")
            }
            ,
            {
                path: RouteTypes.ABOUT_PAGE.path,
                name: RouteTypes.ABOUT_PAGE.name,
                component: () => import("../views/AboutView.vue")
            },
            {
                path: RouteTypes.HOUSE_DETAIL_PAGE.path,
                name: RouteTypes.HOUSE_DETAIL_PAGE.name,
                component: () => import("../views/HouseView.vue")
            }
        ]

    },

]
