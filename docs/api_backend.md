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
- If userName or userMail is already being used, it will return a HTTP_STATUS_CODE 500 with error message: 'This username or email adress is already being used!'
- Response-Body (if successful)

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

### delete a user `"/user/:id"` (DELETE)

Request requires authorization header with a token from an admin.

- Response (STATUS 200)

    ```json
    {
        "message": "Successfully deleted 1 entry"
    }
    ```

### make a user to an admin `"/user/makeAdmin/:id"` (PUT)

Request requires authorization header with a token from an admin.

- Response (STATUS 200)

    ```json
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
    }
    ```

## Product API

### add a product `"/products/"` (POST)

- Request Body
    ```json
    {   
        "productId": "number",
        "productName": "string",
        "productDescription": "string",
        "productImage": "String",
        "productPrice": "number",
        "productCategory": "string",
        "productLocation": "string",
        "productDelivery": "boolean",
        "uploadDate": "Date",
        "sellDate": "Date",
        "isApproved": "boolean",
        "isService": "boolean",
        "isRentable": "boolean",
        "isAvailable": "boolean",
        "userId": "number",
        "userReview": "string"
    }
    ```

- Response (STATUS 200)

    ```json
    {
        "message": "Product successfully created!"
    }
    ```
### change a product `"/products/:id"` (PUT) (for example "/products/2")

- Request Body
    ```json
    {   
        "productId": "number",
        "productName": "string",
        "productDescription": "string",
        "productImage": "String",
        "productPrice": "number",
        "productCategory": "string",
        "productLocation": "string",
        "productDelivery": "boolean",
        "uploadDate": "Date",
        "sellDate": "Date",
        "isApproved": "boolean",
        "isService": "boolean",
        "isRentable": "boolean",
        "isAvailable": "boolean",
        "userId": "number",
        "userReview": "string"
    }
    ```

- Response (STATUS 200)

    ```json
    {
        "message": "Product `productId` successfully updated!"
    }
    ```

### delete a product `"/products/:id"` (DELETE) (for example "/products/2")

- Request Body
    ```json
    {   
        "productId": "number",
        "productName": "string",
        "productDescription": "string",
        "productImage": "String",
        "productPrice": "number",
        "productCategory": "string",
        "productLocation": "string",
        "productDelivery": "boolean",
        "uploadDate": "Date",
        "sellDate": "Date",
        "isApproved": "boolean",
        "isService": "boolean",
        "isRentable": "boolean",
        "isAvailable": "boolean",
        "userId": "number",
        "userReview": "string"
    }
    ```

- Response (STATUS 200)

    ```json
    {
        "message": "Product successfully deleted!"
    }
    ```

### getting products (GET)

#### getting all products `"/products/"` 

- Response body
    ```json
    [
        {   
            "productId": "number",
            "productName": "string",
            "productDescription": "string",
            "productImage": "String",
            "productPrice": "number",
            "productCategory": "string",
            "productLocation": "string",
            "productDelivery": "boolean",
            "uploadDate": "Date",
            "sellDate": "Date",
            "isApproved": "boolean",
            "isService": "boolean",
            "isRentable": "boolean",
            "isAvailable": "boolean",
            "userId": "number",
            "userReview": "string"
        }, 
            {   
            "productId": "number",
            "productName": "string",
            "productDescription": "string",
            "productImage": "String",
            "productPrice": "number",
            "productCategory": "string",
            "productLocation": "string",
            "productDelivery": "boolean",
            "uploadDate": "Date",
            "sellDate": "Date",
            "isApproved": "boolean",
            "isService": "boolean",
            "isRentable": "boolean",
            "isAvailable": "boolean",
            "userId": "number",
            "userReview": "string"
        },
        ...
    ]
    ```

#### getting all approved products `"/products/approved"` 

- Response body
    ```json
    [
        {   
            "productId": "number",
            "productName": "string",
            "productDescription": "string",
            "productImage": "String",
            "productPrice": "number",
            "productCategory": "string",
            "productLocation": "string",
            "productDelivery": "boolean",
            "uploadDate": "Date",
            "sellDate": "Date",
            "isApproved": "true",
            "isService": "boolean",
            "isRentable": "boolean",
            "isAvailable": "boolean",
            "userId": "number",
            "userReview": "string"
        }, 
            {   
            "productId": "number",
            "productName": "string",
            "productDescription": "string",
            "productImage": "String",
            "productPrice": "number",
            "productCategory": "string",
            "productLocation": "string",
            "productDelivery": "boolean",
            "uploadDate": "Date",
            "sellDate": "Date",
            "isApproved": "true",
            "isService": "boolean",
            "isRentable": "boolean",
            "isAvailable": "boolean",
            "userId": "number",
            "userReview": "string"
        },
        ...
    ]
    ```

#### getting all unapproved products `"/products/unapproved"` 

- Response body
    ```json
    [
        {   
            "productId": "number",
            "productName": "string",
            "productDescription": "string",
            "productImage": "String",
            "productPrice": "number",
            "productCategory": "string",
            "productLocation": "string",
            "productDelivery": "boolean",
            "uploadDate": "Date",
            "sellDate": "Date",
            "isApproved": "false",
            "isService": "boolean",
            "isRentable": "boolean",
            "isAvailable": "boolean",
            "userId": "number",
            "userReview": "string"
        }, 
            {   
            "productId": "number",
            "productName": "string",
            "productDescription": "string",
            "productImage": "String",
            "productPrice": "number",
            "productCategory": "string",
            "productLocation": "string",
            "productDelivery": "boolean",
            "uploadDate": "Date",
            "sellDate": "Date",
            "isApproved": "false",
            "isService": "boolean",
            "isRentable": "boolean",
            "isAvailable": "boolean",
            "userId": "number",
            "userReview": "string"
        },
        ...
    ]
    ```

#### getting all products of a category `"/products/:category"` 

for example `"/products/food"`

- Response body
    ```json
    [
        {   
            "productId": "number",
            "productName": "string",
            "productDescription": "string",
            "productImage": "String",
            "productPrice": "number",
            "productCategory": "food",
            "productLocation": "string",
            "productDelivery": "boolean",
            "uploadDate": "Date",
            "sellDate": "Date",
            "isApproved": "boolean",
            "isService": "boolean",
            "isRentable": "boolean",
            "isAvailable": "boolean",
            "userId": "number",
            "userReview": "string"
        }, 
            {   
            "productId": "number",
            "productName": "string",
            "productDescription": "string",
            "productImage": "String",
            "productPrice": "number",
            "productCategory": "food",
            "productLocation": "string",
            "productDelivery": "boolean",
            "uploadDate": "Date",
            "sellDate": "Date",
            "isApproved": "boolean",
            "isService": "boolean",
            "isRentable": "boolean",
            "isAvailable": "boolean",
            "userId": "number",
            "userReview": "string"
        },
        ...
    ]
    ```


#### getting a product by id `"/products/:id"` 

for example `"/products/5"`


- Response body
    ```json
    {   
        "productId": "5",
        "productName": "string",
        "productDescription": "string",
        "productImage": "String",
        "productPrice": "number",
        "productCategory": "string",
        "productLocation": "string",
        "productDelivery": "boolean",
        "uploadDate": "Date",
        "sellDate": "Date",
        "isApproved": "boolean",
        "isService": "boolean",
        "isRentable": "boolean",
        "isAvailable": "boolean",
        "userId": "number",
        "userReview": "string"
    }
    ```

