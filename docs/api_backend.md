# API Backend

This document describes in detail the endpoints provided by the backend.

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

### POST on `"/user/register"`

Register a user to the system. UserName and userMail must be unique, otherwise registration will fail.

- **Details**

     <details>
     
     <summary>Request</summary>
     
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
    </details>
    
    <details>
     
     <summary>Response (STATUS 200)</summary>

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
    
    </details>
    
    <details>
     
     <summary>Response (STATUS 400)</summary>

    ```json
    {
        "message": "This username or email adress is already being used!"
    }
    ```
    
    </details>
    
### POST on `"/user/login"`

Log in a user. UserLogin is either userName or userMail. 

-**Details**

     <details>
     
     <summary>Request</summary>

    ```json
    {
        "userLogin": "string",
        "password": "string"
    }
    ```
    
    </details>
    
    <details>
    
    <summary>Response (STATUS 200)</summary>
    
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
    
    </details>
    
    <details>
    
    <summary>Response (STATUS 400)</summary>
    
    ```json
    {
    "message": "Could not find this User"
    }   
    ```
    respectively
    ```json
    {
    "message": "Wrong password"
    }   
    ```
    
    </details>

### POST on `"/user/edit"`

Edit an existing user. If user does not exist, will return an error.

- **Details**

    <details>

    <summary>Request</summary>

    ```json
        {
            "userId": "number",
            "userName": "string",
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

    </details>

    <details>

    <summary>Response (STATUS 200)</summary>

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

    </details>

    <details>
    <summary>Response (STATUS 500)</summary>

    ```json
        {
            "message": "error message"
        }
    ```

    </details>

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

### GET on `"/user/:id"`

Returns the user with the requested id. If user does not exist, will return a not found error (404).

- **Details**

    <details>
    <summary>Response (STATUS 200)</summary>

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

    </details>

    <details>
    <summary>Response (STATUS 404)</summary>

    ```json
    {
        "message": "User not found!"
    }
    ```

    </details>

    <details>
    <summary>Response (STATUS 500)</summary>

    ```json
    {
        "message": "error message"
    }
    ```

    </details>

### delete a user `"/user/:id"` (DELETE)

Request requires authorization header with a token from an admin.

- Response (STATUS 200)

    ```json
    {
        "message": "Successfuly deleted entry with id='id'"
    }
    ```

- Response (STATUS 202)

    ```json
    {
        "message": "No entry to delete"
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

### approve a product `"/products/approve/:id"` (PUT) (for example "/products/approve/2")

Request requires authorization header with a token from an admin.

- Response (STATUS 200)

    ```json
    {
        "message": "Successfully approved product 'productId'!'"
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

#### getting all products of a category `"/products/category/:category"` 

for example `"/products/category/food"`

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

#### getting all products of a user `"/products/user/:userId"` 

for example `"/products/user/2"`

- Response body
    ```json
    [
        {   
            "productId": "number",
            "productName": "string",
            "productDescription": "string",
            "productImage": "String",
            "productPrice": "number",
            "productCategory": "String",
            "productLocation": "string",
            "productDelivery": "boolean",
            "uploadDate": "Date",
            "sellDate": "Date",
            "isApproved": "boolean",
            "isService": "boolean",
            "isRentable": "boolean",
            "isAvailable": "boolean",
            "userId": "2",
            "userReview": "string"
        }, 
            {   
            "productId": "number",
            "productName": "string",
            "productDescription": "string",
            "productImage": "String",
            "productPrice": "number",
            "productCategory": "String",
            "productLocation": "string",
            "productDelivery": "boolean",
            "uploadDate": "Date",
            "sellDate": "Date",
            "isApproved": "boolean",
            "isService": "boolean",
            "isRentable": "boolean",
            "isAvailable": "boolean",
            "userId": "2",
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

