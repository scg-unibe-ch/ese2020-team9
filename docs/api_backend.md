# API Backend

This documents describes in detail the endpoints provided by the backend.

## User Validation

### logged-in user

- If a request requires the requester to be a logged in user → requires authorization header with a valid token in the request!

- Response-Body (if token invalid) (HTTP_STATUS_CODE 403)

     ```json
    {
    "message": "Unauthorized"
    }
    ```

### logged-in admin

- If a request requires the requester to be a logged in admin → requires authorization header with a valid token in the request!

- Response-Body (if token invalid) (HTTP_STATUS_CODE 403)

     ```json
    {
    "message": "This User is not an Admin"
    }
    ```
## User API

### register a user `"/user/register"` (POST)

- Request-Body

    ```json
    {
        "userName": "string",
        "password": "string",
        "userMail": "string",
        "firstName": "string",
        "lastName": "string",
        "gender":   "string",
        "phoneNumber": "number",
        "addressStreet": "string",
        "addressPin": "string",
        "addressCity": "string",
        "addressCountry": "string"
    }
    ```

- Response-Body (if successful) (HTTP_STATUS_CODE 200)

    ```json
    {
        "admin":  "boolean",
        "wallet": "number",
        "userId": "number",
        "userName": "string",
        "password": "string (Hash)",
        "userMail": "string",
        "firstName": "string",
        "lastName": "string",
        "gender":   "string",
        "phoneNumber": "number",
        "addressStreet": "string",
        "addressPin": "string",
        "addressCity": "string",
        "addressCountry": "string",
        "updatedAt": "string",
        "createdAt": "string"
    }
    ```
    - If userName or userMail is already being used, it will return a HTTP_STATUS_CODE 400 with error message:

    ```json
    {
    "message": "This username or email adress is already being used!"
    }
    ```

### login a user `"/user/login"` (POST)

- Request-Body

    ```json
    {
        "userLogin": "string",
        "password": "string"
    }
    ```

- Response-Body (if successful) (HTTP_STATUS_CODE 200)

    ```json
    {
        "user" : {
            "userId": "number",
            "admin":  "boolean",
            "wallet": "number",
            "userName": "string",
            "password": "string (Hash)",
            "userMail": "string",
            "firstName": "string",
            "lastName": "string",
            "gender":   "string",
            "phoneNumber": "number",
            "addressStreet": "string",
            "addressPin": "string",
            "addressCity": "string",
            "addressCountry": "string",
            "createdAt" : "string",
            "updatedAt" : "string",
        },
        "token": "string"
    }
    ```
- If there is no entry in the database with the given username or email, it will return a HTTP_STATUS_CODE 400 with error message:
    ```json
    {
    "message": "Could not find this User"
    }   
    ```
- If the password is wrong, it will return a HTTP_STATUS_CODE 400 with error message:
    ```json
    {
    "message": "Wrong password"
    }   
    ```

### get all users `"/user/"` (GET)

Requires authorization header with a valid token in the request! (see logged-in user)

- Response-Body (if successful) (HTTP_STATUS_CODE 200)
  
    ```json
    [
        {
            "userId": "number",
            "admin":  "boolean",
            "wallet": "number",
            "userName": "string",
            "password": "string (Hash)",
            "userMail": "string",
            "firstName": "string",
            "lastName": "string",
            "gender":   "string",
            "phoneNumber": "number",
            "addressStreet": "string",
            "addressPin": "string",
            "addressCity": "string",
            "addressCountry": "string",
            "createdAt" : "string",
            "updatedAt" : "string",
        },
        {
            "userId": "number",
            "admin":  "boolean",
            "wallet": "number",
            "userName": "string",
            "password": "string (Hash)",
            "userMail": "string",
            "firstName": "string",
            "lastName": "string",
            "gender":   "string",
            "phoneNumber": "number",
            "addressStreet": "string",
            "addressPin": "string",
            "addressCity": "string",
            "addressCountry": "string",
            "createdAt" : "string",
            "updatedAt" : "string",
        },
        ...
    ]
    ```

## Product API (draft!)

### add a product `"/products/"` (POST)

- Request-Body n/a

- Response-Body n/a

### change a product `"/products/:id"` (PUT) (for example "/products/2")

- Request-Body n/a

- Response-Body n/a

### delete a product `"/products/:id"` (DELETE) (for example "/products/2")

- Request-Body n/a

- Response-Body n/a
