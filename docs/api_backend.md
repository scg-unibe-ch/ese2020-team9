# API Backend

This documents describes in detail the endpoints provided by the backend.

## User API (legacy!)

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
        "adressStreet": "string",
        "adressPin": "string",
        "adressCity": "string",
        "adressCountry": "string"
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
        "adressStreet": "string",
        "adressPin": "string",
        "adressCity": "string",
        "adressCountry": "string"
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
            "adressStreet": "string",
            "adressPin": "string",
            "adressCity": "string",
            "adressCountry": "string",
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
            "adressStreet": "string",
            "adressPin": "string",
            "adressCity": "string",
            "adressCountry": "string",
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
            "adressStreet": "string",
            "adressPin": "string",
            "adressCity": "string",
            "adressCountry": "string",
            "createdAt" : "string",
            "updatedAt" : "string",
        },
        ...
    ]
    ```

## TodoList API (deprecated!)

### add a list `"/todolist/"` (POST)

- Request-Body

    ```json
    {
        "name": "string"
    }
    ```

- Response-Body

    ```json
    {
        "todoListId": "number",
        "name": "string"
    }
    ```

### change a list `"/todolist/:id"` (PUT) (for example `/todolist/7`)

- Request-Body

    ```json
    {
        "name": "string"
    }
    ```

- Response-Body

    ```json
    {
        "todoListId": "number",
        "name": "string"
    }
    ```

### delete a list `"/todolist/:id"` (DELETE) (for example `/todolist/7`)

No Request-Body; success will return a HTTP_STATUS_CODE 200

### get all lists `"/todolist/"` (GET)

- Response-Body

    ```json
    [
        {
            "todoListId": "number",
            "name": "string",
            "todoItems": "TodoItem[]"
        },
        ...
    ]
    ```

## TodoItem API (deprecated!)

### add an item `"/todoitem/"` (POST)

- Request-Body

    ```json
    {
        "name": "string",
        "done": "boolean",
        "todoListId": "number"
    }
    ```

- Response-Body

    ```json
    {
        "todoItemId": "number",
        "name": "string",
        "done": "boolean",
        "todoListId": "number"
    }
    ```

### change an item `"/todoitem/:id"` (PUT) (for example `/todoitem/3`)

- Request-Body

    ```json
    {
        "name": "string",
        "done": "boolean",
        "todoListId": "number"
    }
    ```

- Response-Body

    ```json
    {
        "todoItemId": "number",
        "name": "string",
        "done": "boolean",
        "todoListId": "number"
    }
    ```

### delete an item `"/todoitem/:id"` (DELETE) (for example `/todoitem/3`)

No Request-Body; success will return a HTTP_STATUS_CODE 200

## Secured Enpoint API (deprecated!)

### access the secured endpoint `"/secured/"` (GET)

Needs an Authorization header with a valid token in the request. Will return either a 200 if valid token or a 403 if unauthorized.

## Product API (draft!)

### add a product

### change a product

### delete a product
