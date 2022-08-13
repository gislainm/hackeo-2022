import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import MapPage from "../Pages/Map";
import DefaultPage from "../Pages/TestingPage";

export default {}

export interface RouteEntity 
{
    path: string|undefined;
    component: any;
    hasNavBar: boolean;
    icon?: JSX.Element;
    title?: string;
}

interface RouteMap
{
    [routeName: string] : RouteEntity
}


export const RouterPages: RouteMap = {
    _Default: {
        path: "/",
        component: DefaultPage,
        hasNavBar: false,
    },
    _Login: {
        path: "/login",
        component: LoginPage,
        hasNavBar: false,
    },
    _Home: {
        path: "/home",
        component: HomePage,
        hasNavBar: false,
    },
    _Map: {
        path: "/people-finder",
        component: MapPage,
        hasNavBar: false,
    },
};


export const AvailableRoutes = [
    RouterPages._Default,
    RouterPages._Home,
    RouterPages._Login,
    RouterPages._Map,
]