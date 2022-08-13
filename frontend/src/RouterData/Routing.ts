import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
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
};


export const AvailableRoutes = [
    RouterPages._Default,
    RouterPages._Home,
    RouterPages._Login,
]