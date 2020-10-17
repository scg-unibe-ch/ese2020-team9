# API Backend

This documents describes in detail the endpoints provided by the backend.

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

- Response-Body

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
        "addressCountry": "string"
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

- Response-Body

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

### get all users `"/user/"` (GET)

Requires authorization header with a valid token in the request!

- Response-Body (403 if unauthorized)
  
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
