Placeholder text
Do not delete this file

THIS IS A NEW FEATURE

**Backend API**
- login: 
```json   
{
    "endpoint": "http://localhost:3000/mapCollab/login",
    "command": "POST",
    "args": {
        "content-Type": "application/json",
        "username": "string",
        "password": "string"
    },
    "status": {
        "200": "login successfull",
        "401": "client errors, wrong password or username"
    },
    "return": {
        "200": {
            "error": "false",
            "message": "null",
            "data": {
                "accessToken": "JWt generated accessToken",
                "user": {
                    "_id": "user id generated my mongodb",
                    "name": "user's fullname",
                    "username": "username",
                    "email": "user's email",
                    "password": "user's hashed password"
                }
            }
        },
        "400": {
            "error": "true",
            "message": "wrong password/wrong username",
            "data": "null"
        }
    }
}        
```

- signUp:
```json
{
    "endpoint": "http://localhost:3000/mapCollab/signUp",
    "command": "POST",
    "args": {
        "content-Type": "application/json",
        "name":"string && required",
        "username": "string && required",
        "email":"string && required",
        "password": "string && required"
    },
    "status": {
        "201": "user created in the database",
        "500": "signUp failed"
    },
    "return": {
        "200": {
            "error": "false",
            "message": "null",
            "data": {
                "user": {
                    "_id": "user id generated my mongodb",
                    "name": "user's fullname",
                    "username": "username",
                    "email": "user's email",
                    "password": "user's hashed password"
                }
            }
        },
        "500": {
            "error": "true",
            "message": "signing up user failed",
            "data": "null"
        }
}
}
```
- authenticate user:
```json
{
    "endpoint": "http://localhost:3000/mapCollab/authenticate",
    "command": "GET",
    "args": {
      "headers":{
        "Authorization":"Bearer accessToken"
      }
    },
    "status": {
        "200": "user authenticated and authorized",
        "401": "unauthorized user"
    },
    "return": {
        "200": {
            "error": "false",
            "message": "null",
            "data": {
                "id":"user id number",
                "username":"username",
                "iat":"initial access time"
            }
        },
        "401": {
            "error": "true",
            "message": "Invalid JWT permission",
            "data": "null"
        }
}
}
```
- deleting account: 
```json
{
    "endpoint": "http://localhost:3000/mapCollab/delete",
    "command": "GET",
    "args": {
      "headers":{
        "Authorization":"Bearer accessToken"
      }
    },
    "status": {
        "200": "account deleted(OK)",
        "401": "unauthorized user",
        "500":"deleting account failed"
    },
    "return": {
        "200": {
            "error": "false",
            "message": "null",
            "data": {
                "deletedUser": {
                    "_id": "user id",
                    "name": "user's fullname",
                    "username": "username",
                    "email": "user's email",
                    "password": "user's hashed password"
                }
            }
        },
        "401": {
            "error": "true",
            "message": "user unauthorized",
            "data": "null"
        },
        "500":{
            "error": "true",
            "message": "deleting account failed",
            "data": "null"
        }

}
}
```