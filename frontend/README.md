# ESE2020 Scaffolding Frontend

## Prerequisite
You should have installed [NodeJS and npm](https://nodejs.org/en/download/) (they come as one) in order to run the application.  
Make sure the backend is running according to its [README](https://github.com/scg-unibe-ch/ese2020-project-scaffolding/blob/master/backend/README.md).

## Start
- navigate to the frontend folder `cd ese2020-project-scaffolding/frontend` within the same repo where you set up the backend
- run `npm install`
- run `npm run dev`
- open your browser with the url [http://localhost:4200](http://localhost:4200/)

**If you encounter CORS errors within your browser, add the [Allow CORS](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en) extension (version for Google Chrome) to your browser.**

## About
The frontend of the project scaffolding shows you a Angular webshop application named STOR. with the following features:
STOR specialises in vintage electronics. 

Our webshop has the following features:
- Authentication feature that enables registration of new users and lets them log in.
- Feature that allows users to post an advertisement to sell/or lend a product.
Users are able to update the existing advertisement or delete it.
- Feature that allows users to search for an advertisement to buy/or rent a product.
- Feature that allows administrators of STOR to approve advertisement posted by other users. 
This feature allows administrators to delete products or users as well. 
- Feature that allows buying and selling of products. User will be notified if a product
is bought or sold. 
- Feature that lets users pass the time by playing snake.
This feautre influences the overall score of each user. 
User can get a higher score by selling / buying products or by playing snake.
Buying / Selling has a bigger influence on the score than snake.



We will provide you the following test users:

Administrator:
````
Username: Nora
Password: notSecure12
````
User 1
````
Username: ttt
Password: Test123!
````
User 2
````
Username: John
Password: 1234
````
Once you are logged in, the top right corner should display your current username.
It depends on the user which landing page is displayed. 
Nora as an administrator will see the "adminpanel" whereas user will see the "dashboard" where products
which are currently offered are displayed.

####Adminpanel
- Display all users
- Displays products to be approved

Clicking on the icon in the top right corner will lead you to your userprofile.
####Userprofile
- Displays address of user
- Displays products of user
- Displays sold products of user
- Displays bought products of user

