import DefaultPage from "../Pages/DefaultPage";

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
};


export const AvailableRoutes = [
    RouterPages._Default
]