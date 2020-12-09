# Basic Accounting app using React and Nodejs

## Available Scripts

Inside the root directory, you can run:

### `npm run start`

## API Documentation
This API uses `GET` requests to communicate and HTTP [response codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) to indentify status and errors. All responses come in standard JSON. All requests must include a `content-type` of `application/json` and the body must be valid JSON.

### Response Codes
```
200: Success
400: Bad request
```

### Example Error Message
```json
http code 400
{
    "success": false,
    "error": "error message"
}
```
## Get list of people

### Request

    GET http://localhost:4001/people/:sortBy?

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    {
        "success": true,
        "count": *people,
        "data": []
    }
   
    
