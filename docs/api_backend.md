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

- **Details**

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

### GET on `"/user/"`

Gets the list of all user in the system. Requires the Authorization Header on the Request with a valid token from a logged-in user.

- **Details**

     <details>
     
     <summary>Response (STATUS 200)</summary>
     
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
    
    </details>
    
    <details>
    
    <summary>Response (STATUS 403)</summary>
    If authorizatoin token is invalid or missing.
    
    ```json
    {
    "message": "Unauthorized"
    }
    ```
    
    </details>
    

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

### DELETE on `"/user/:id"`

Deletes the user with the id set as parameter in url. Requires the Authorization Header set with a valid token from a logged-in admin user. 

- **Details**

     <details>
     
     <summary>Response (STATUS 200)</summary>
    
    ```json
    {
        "message": "Successfuly deleted entry with id='id'"
    }
    ```
    </details>
    
    <details>
     
     <summary>Response (STATUS 202)</summary>
     
    ```json
    {
        "message": "No entry to delete"
    }
    ```
    </details>
    
    <details>
     
     <summary>Response (STATUS 403)</summary>
     
     ```json
    {
        "message": "This User is not an Admin"
    }
    ```
    </details>

### PUT on `"/user/makeAdmin/:id"`

Makes the user with the id set in the url as parameter to an admin user. Request requires Authorization Header with a token from a logged-in admin user.

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
     
     <summary>Response (STATUS 403)</summary>
     
    ```json
    {
        "message": "This User is not an Admin"
    }
    ```
    </details>

### POST on `"/user/passwordForgotten"`

A request on this endpoint will trigger an email sent with a link to a page, where the user may enter his new password. User must be registered and enter a valid email. The link will contain a token, which is necessary to perform the request on the "/user/restorePassword" endpoint

- **Details**

    <details>

    <summary>Request</summary>

    ```json
    {
        "userEmail": "string"
    }
    ```
    
    </details>

    <details>

    <summary>Response (STATUS 200)</summary>

    ```json
    {
        "message": "We sent you an email, check out your mail box!"
    }
    ```

    </details>

    <details>

    <summary>Response (STATUS 404)</summary>

    ```json
    {
        "message": "We sent you an email, check out your mail box!"
    }
    ```

    </details>

### POST on `"/user/restorePassword"`

Request will reset the password of the user indicated in the token, which must be added to the Authorization header. Only a token received from the endpoint "/user/passwordForgotten" will be accepted.

- **Details**

    <details>

    <summary>Request</summary>

    ```json
    {
        "password": "string"
    }
    ```

    </details>

    <details>

    <summary>Response (STATUS 200)</summary>

    ```json
    {
        "message": "Successfully changed the password, you now may sign in!"
    }
    ```

    </details>

    <details>

    <summary>Response (STATUS 403)</summary>

    ```json
    {
        "message": "Unauthorized"
    }
    ```

    </details>

    <details>

    <summary>Response (STATUS 500)</summary>

    ```json
    {
        "message": "Failed to change the password, please try again!"
    }
    ```

    </details>

## Product API

### POST on `"/products/"`

Adds a new Product to the system.

- **Details**

     <details>
     
     <summary>Request</summary>

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
    </details>
    
    <details>
     
     <summary>Response (STATUS 200)</summary>

    ```json
    {
        "message": "Product successfully created!"
    }
    ```
    </details>
    
### PUT on `"/products/:id"`

Changes the product with the id set as parameter in the url. Product will be updated with values of request body.

- **Details**

     <details>
     
     <summary>Request</summary>
     
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
    </details>
    
    <details>
     
     <summary>Response (STATUS 200)</summary>

    ```json
    {
        "message": "Product `productId` successfully updated!"
    }
    ```
    </details>

### DELETE on `"/products/:id"`

Deletes the product with the id indicated in the url.

- **Details**

     <details>
     
     <summary>Response (STATUS 200)</summary>

    ```json
    {
        "message": "Product successfully deleted!"
    }
    ```
    </details>

### PUT on `"/products/approve/:id"`

Approves the product with the id indicated in the url. Request requires Authorization Header with a token from a logged-in admin user.

- **Details**

     <details>
     
     <summary>Response (STATUS 200)</summary>

    ```json
    {
        "message": "Successfully approved product 'productId'!'"
    }
    ```
    </details>

     <details>
     
     <summary>Response (STATUS 403)</summary>

    ```json
    {
        "message": "This User is not an Admin"
    }
    ```
    </details>

### GET on `"/products/"` 

Gets all products in the system.

- **Details**

     <details>
     
     <summary>Response (STATUS 200)</summary>
     
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
    </details>

### GET on `"/products/approved"` 

Gets all products, which have status approved.

- **Details**

     <details>
     
     <summary>Response (STATUS 200)</summary>
     
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
    </details>

### GET on `"/products/unapproved"` 

Gets all products, which have status not approved.

- **Details**

     <details>
     
     <summary>Response (STATUS 200)</summary>
     
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
    </details>

### GET on `"/products/category/:category"` 

Gets all products belonging to a certain category, indicated with the parameter in the url.

- **Details**

     <details>
     
     <summary>Available Categories</summary>
     
     </details>
     
     <details>
     
     <summary>Response (STATUS 200)</summary>
     
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
    </details>

### GET on `"/products/user/:userId"` 

Gets all products belonging to the user with the id indicated in the url.

- **Details**

     <details>
     
     <summary>Response (STATUS 200)</summary>
     
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
    </details>

### GET on `"/products/:id"` 

Gets a single product with the id indicated in the url.

- **Details**

     <details>
     
     <summary>Response (STATUS 200)</summary>
     
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
    </details>

