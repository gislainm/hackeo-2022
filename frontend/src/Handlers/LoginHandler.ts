import { APIHandler } from "../Pages/Utils/apiHandler";

import { BackendHostname } from '../Pages/Utils/constants';
import RequestError from "../Pages/Utils/RequestError";

export default class LoginHandler
{
    public static async attemptLogin(username: string, password: string) : Promise<boolean>
    {
        console.log("attemptLogin(): "+username);

        const response = await APIHandler(`${BackendHostname}/mapCollab/login`, {
            method: "POST",
            responseType: Object,
            data: {
                username: username,
                password: password,
            },
        });

        console.log("attemptLogin() response: ", response);

        if(response['error'] || response instanceof RequestError)
            return false;

        return true;
    }
}
