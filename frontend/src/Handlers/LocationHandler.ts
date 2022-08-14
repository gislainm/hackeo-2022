import { APIHandler } from "../Pages/Utils/apiHandler";

import { BackendHostname } from '../Pages/Utils/constants';
import RequestError from "../Pages/Utils/RequestError";

export default class LocationHandler
{
    public static async sendLocation(lat: string, long: string) : Promise<{}>
    {
        console.log("sendLocation(): "+lat+"|"+long);

        const response = await APIHandler(`${BackendHostname}/mapCollab/saveLocation`, {
            method: "POST",
            responseType: String,
            data: {
                coordinates: [lat, long], //GeolocationCoordinates
                accessToken: localStorage.getItem("accessToken"),
            },
        });

        console.log("sendLocation() response:")
        console.log(response);

        if(response['error'] || response instanceof RequestError)
            return {};

        const data = JSON.parse(response.toString());
        
        return data.data;
    }

    public static async getLocations(lat: string, long: string) : Promise<{}>
    {
        console.log("sendLocgetLocationsation(): "+lat+"|"+long);

        const response = await APIHandler(`${BackendHostname}/mapCollab/AllUsersLoc`, {
            method: "GET",
            responseType: String,
        });

        console.log("getLocations() response:")
        console.log(response);

        if(response['error'] || response instanceof RequestError)
            return {};

        const data = JSON.parse(response.toString());
        
        return data.data;
    }
}
