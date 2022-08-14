Placeholder text
Do not delete this file

THIS IS A NEW FEATURE

**Backend API**
- login: 
```json   
{
    "endpoint": "http://localhost:8080/mapCollab/login",
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
    "endpoint": "http://localhost:8080/mapCollab/signUp",
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
    "endpoint": "http://localhost:8080/mapCollab/authenticate",
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
    "endpoint": "http://localhost:8080/mapCollab/delete",
    "command": "DELETE",
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

- saving user's current location
```json
{
    "endpoint": "http://localhost:8080/mapCollab/saveLocation",
    "command": "POST",
    "args": {
        "content-Type": "application/json",
        "accessToken":"user's access token from session/local storage",
        "coordinates":"users coordinates from navigator.geolocation api"
    },
    "status": {
        "200": "location saved in the database",
        "401": "unauthorized user",
        "500":"saving user's current location failed"
    },
    "return": {
        "200": {
            "error": "false",
            "message": "null",
            "data": {
                "user":"user id referencing to users collection",
                "location":"geoJSON point location",
                "_id":"document id",
                "currentDate":"Date the location document was created"
            }
        },
        "401": {
            "error": "true",
            "message": "user unauthorized",
            "data": "null"
        },
        "500":{
            "error": "true",
            "message": "saving user's current location failed",
            "data": "null"
        }

}
}
```

- get all the data from users' location collection
```json
{
    "endpoint": "http://localhost:8080/mapCollab/AllUsersLoc",
    "command": "GET",
    "args": {
      "headers":{
        "Authorization":"Bearer accessToken"
      }
    },
    "status": {
        "200": "array of users location provided(OK)",
        "401": "unauthorized user",
    },
    "return": {
        "200": {
            "error": "false",
            "message": "null",
            "data": {
                [
                     {
                        "location": {
                            "type": "Point",
                            "coordinates": ["user's coordinate"]
                        },
                         "_id": "location id",
                         "user": "user id",
                        "currentDate": "Date location retrieved",
                     }
                ]
            }
        },
        "401": {
            "error": "true",
            "message": "user unauthorized",
            "data": "null"
        }
}
}
```
- get all the data from users' location collection
```json
{
    "endpoint": "http://localhost:8080/mapCollab/AllUsersLoc",
    "command": "GET",
    "args": {
      "headers":{
        "Authorization":"Bearer accessToken"
      }
    },
    "status": {
        "200": "array of users location provided(OK)",
        "401": "unauthorized user",
    },
    "return": {
        "200": {
            "error": "false",
            "message": "null",
            "data": {
                [
                     {
                        "location": {
                            "type": "Point",
                            "coordinates": ["user's coordinate"]
                        },
                         "_id": "location id",
                         "user": "user id",
                        "currentDate": "Date location retrieved",
                     }
                ]
            }
        },
        "401": {
            "error": "true",
            "message": "user unauthorized",
            "data": "null"
        }
}
}
```

- create a Chatroom and add participants
```json
{
    "endpoint": "http://localhost:8080/mapCollab/startChatroom",
    "command": "POST",
    "args": {
       "content-Type": "application/json",
        "participants":["users ids"],
    },
    "status": {
        "201": "chatroom created(OK)",
        "500": "creating new chatroom failed",
    },
    "return": {
        "200": {
            "error": "false",
            "message": "null",
            "data": {
                "participants": ["users id"],
                "_id": "62f84e4372ae3fb2d03aded6",
                 "createdAt": "timestamp",
                "updatedAt": "timestamp",
            }
        },
        "500": {
            "error": "true",
            "message": "creating new chatroom failed",
            "data": "null"
        }
}
}
```

- get All Messages in a chatroom
```json
{
    "endpoint": "http://localhost:8080/mapCollab/getAllMessages?chatroomId=chatroomId",
    "command": "GET",
    "args": {},
    "status": {
        "200": "response successful(OK)",
        "500": "fetching messages failed",
        "400":"chatroom doesn't exitst in the database"
    },
    "return": {
        "200": {
            "error": "false",
            "message": "null",
            "data": [{
                        "_id": "message id",
                        "sender": "sender's id",
                        "message": "message content",
                        "chatRoomId": {
                                "_id": "chatroom id",
                                "participants": ["patricipants ids"],
                                "createdAt": "timestamp",
                                "updatedAt": "timestamp",
                            },
                        "createdAt": "timestamp",
                        "updatedAt": "timestamp",
            }]
        },
        "500": {
            "error": "true",
            "message": "fetching messages failed",
            "data": "null"
        },
        "400": {
            "error": "true",
            "message": "chatroom doesn't exitst in the database",
            "data": "null"
        }
}
}
```

- create a Message and save it to the messages collection
```json
{
    "endpoint": "http://localhost:8080/mapCollab/createMessage",
    "command": "Post",
    "args": {
        "content-Type": "application/json",
        "sender":"sender's id",
        "message":"message content",
        "chatRoomId":"chatroom id"
    },
    "status": {
        "201": "message successfully created(OK)",
        "500": "creating new message failed",
    },
    "return": {
        "201": {
            "error": "false",
            "message": "null",
            "data": {
                    "sender": "sender id",
                    "message": "message content",
                    "chatRoomId": "chatroom id",
                    "_id": "message id",
                    "createdAt": "timestamp",
                    "updatedAt": "timestamp",
    }
        },
        "500": {
            "error": "true",
            "message": "creating new message failed",
            "data": "null"
        },
}
}
```

- add a user In Chatroom after it has started
```json
{
    "endpoint": "http://localhost:8080/mapCollab/adduserInChatroom",
    "command": "POST",
    "args": {
        "content-Type": "application/json",
        "userToAdd":"user's id",
        "chatRoomId":"chatroom id"
    },
    "status": {
        "202": "user add to participants array of chatroom(OK)",
        "500": "Adding user to chatroom failed",
        "400":"Chatroom doesn't exist"
    },
    "return": {
        "202": {
            "error": "false",
            "message": "null",
            "data": {
                    "_id": "chatroom id",
                    "participants":[{
                        "_id": "user id",
                        "name": "user full name",
                        "username": "username",
                        "email": "user email",
                        "password": "hashed password",
                    }],
                    "createdAt": "timestamp",
                    "updatedAt": "timestamp",
                 }
        },
        "500": {
            "error": "true",
            "message": "Adding user to chatroom failed",
            "data": "null"
        },
        "400": {
            "error": "true",
            "message": "Chatroom doesn't exist",
            "data": "null"
        },
}
}
```
