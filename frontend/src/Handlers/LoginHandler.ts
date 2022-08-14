import { APIHandler } from "../Pages/Utils/apiHandler";

import { BackendHostname } from '../Pages/Utils/constants';
import RequestError from "../Pages/Utils/RequestError";

export default class LoginHandler
{
    public static async attemptLogin(username: string, password: string) : Promise<{}>
    {
        console.log("attemptLogin(): "+username);

        const response = await APIHandler(`${BackendHostname}/mapCollab/login`, {
            method: "POST",
            responseType: String,
            data: {
                username: username,
                password: password,
            },
        });

        console.log("attemptLogin() response:")
        console.log(response);

        if(response['error'] || response instanceof RequestError)
            return {};

        const data = JSON.parse(response.toString());
        
        return data.data;
    }
}
