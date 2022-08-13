export class RequestError
{
    readonly code: number;
    constructor(code)
    {
        this.code = code;
    }
}

interface APIHandlerProps<T> 
{
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

  responseType: { new (apiResponse: any): T };

  /* The data you want to send to the API, example: { status: 5, input: "text value" } */
  data?: any;

  contentType?: string;
}

/**
 * @param url
 * @param props
 * @example await APIHandler(`/api/someEntity/${id}`, { method: "POST", data: newItem, responseType: ClassForResponseType });
 */
export async function APIHandler<T>( url: string, props: APIHandlerProps<T> ) : Promise<T> 
{
  let urlQS = "";
  const data = props.data || {};
  const requestHeader: {} = { 
    "Content-Type":  props.contentType || "application/json",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin":"*",
  };
  let requestOptions: RequestInit = {
    method: props.method,
    headers: requestHeader,
  };

  switch (props.method) 
  {
    case "GET":
      // add data to querystring (if we drop ie11 support or add more polyfills this can be cleaned up)
      const qsParams = Object.keys(data)
        .filter((k: string) => data[k] !== undefined)
        .map( (k: string) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}` )
        .join("&");
      if (qsParams.length > 0)
        urlQS += "?" + qsParams;
      break;

    case "PUT":
    case "POST":
    case "DELETE":
    case "PATCH":
      // add data to the request body
      if (props.data)
        requestOptions.body = JSON.stringify(props.data);
      break;

    default:
      throw `APIHandler does not support the method type "${props.method}"`;
  }
  
  console.log("To: "+url + urlQS);

  return fetch(url + urlQS, requestOptions)
    .then(errorCheck)
    .catch(error => {
      console.log(error); 
      return {...error, ok: false,};
    })
    .then(data => {
      console.log("Response: "+data.status+" | "+data.statusText);
      
      if(!data.ok)
        return new RequestError(data.status);

      let response;
      // verify the response is in json-----------------------------------------------------------------
      const contentType = data.headers.get("content-type");
      if(contentType && contentType !== "application/json")
        response = data.text();
      else
        response = data.json();
      
      return response.then(_ => new props.responseType(_))
    });
}


function errorCheck(response: Response) : Response
{
  //list of http codes and actions to take
  switch(response.status)
  {
    case 401: //unauthenticated, client must authenticate first
    case 403: //authenticated but unauthorized
    case 406: //proxy authentication required
      console.info("An error occurred");
      // window.location.href = "/";
      break;
    case 429:
      throw new Error("-Too many server requests"); //temporary, meant to delay force user to reload
  }

  return response;
}