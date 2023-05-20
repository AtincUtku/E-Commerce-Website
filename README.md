# README

This is my web application for the first homework of Ceng495 Cloud Computing course. Initial repository was forked from [Hello world](https://expressjs.com/en/starter/hello-world.html) example on [Render](https://render.com). 
The app in this repo is deployed at https://ceng495-hw1-shopping.onrender.com

## Deployment

You can run the app locally with:

  * Build Command: `yarn`
  * Start Command: `node app.js`

You can access the app on localhost port 3001.

## User Authentication and Management

The regular users and the admin can sign in by clicking the "Sign In" button on any page. The "Sign Up" button is non-functional, as it is out of the scope of this homework. However, it has been added for aesthetics and potential future development.

## How to Login as a Regular User

Currently there are 3 regular users:

Username  |  Password
----------|-----------
user1     |  1  
user2     |  1
user3     |  1


I've set the passwords to "1" for simplicity. The admin can add more users and set their passwords.

After signing in, regular users should see "My Account" instead of "Sign In" and "Logout" instead of "Sign Up". They can go to their pages and see their username, average rating, and the reviews they made. Users can also click the items they reviewed on their page, which redirects them to the related item.

## How to Login as Admin

Username  |  Password
----------|--------------
admin     |  123admin123  


When the admin signs in, they should see "Admin Dashboard" instead of "Sign In" and "Logout" instead of "Sign Up". After clicking "Admin Dashboard," the admin can access features like "Add User," "Remove User," "Add Item," and "Remove Item." I also added "Get Users" and "Get Items" in the "Remove User" and "Remove Item" fields, respectively, for increased usability.

## Authentication

I have used JSON Web Token (JWT) authentication for both regular users and the admin. The app stores the web token in local storage and removes it when a user logs out.

## Password Encryption

I used the bcrypt library for password encryption. All passwords are stored as hashed passwords in the database. My repository also contains a file called "createPassword.js", which I used for creating passwords manually in the early stages of the project.

## User Experience Without Signing In

When a user does not sign in, they can browse items and view item details. However, they cannot review and rate items. The review and rating form are only visible for users who have signed in.


## Frameworks and Languages

## Why I Chose Node.js ?

I chose Node.js due to my prior JavaScript experience and its compatibility with JSON objects. Also I believe it's "laissez faire" approach gives developer a independent working environment since it does not have too much restrictions. I used plain HTML, CSS, and JavaScript for the frontend. Although I considered using React.js, I ultimately decided not to due to time constraints and the project's focus on backend development.

## Why I Chose Express ?

I chose Express because of its simple documentation on the Render website.

## The Architecture of the Project

The app is divided into folders: public (frontend) and src (backend). The src folder contains subfolders for various components: 

* config - Database configuration files
* controllers - User and item controllers
* middlewares - Middleware for authentication
* models - User and item models
* routes - Item and user routes

Some controller functions do not use models, as creating an object seemed more straightforward. Additionally, the frontend script sections may not be as tidy, as the project's focus was not on frontend development.

## User Guide

## Browsing Items
When a user enters the app, they should see the home page. Users can browse items by category (All, Clothing, Computer Components, Monitors, and Snacks). After selecting a category, users can view corresponding items below and navigate to the item details page.

## Rating and Reviewing Items
After signing in, users can browse items, rate, and review them. Rating and reviewing must be done simultaneously, as rating an item without reviewing it seemed illogical. The latest review and rating overwrite previous ones. Users can view their reviews on the item's page and their personal account page.

## My Account
After clicking "My Account," users can see their username, average rating, and reviews. Users can also see the items they've reviewed and click on them to be redirected to the corresponding item page. Users can log out by clicking the "Logout" button.


## Admin Guide

Admins can sign in by clicking "Sign In" and entering "admin" as the username and "123admin123" as the password. Unlike regular users, admins see "Admin Dashboard" instead of "My Account." From the dashboard, admins can perform various tasks, such as adding and removing users and items.

Admins cannot add a user with an existing username or delete a non-existent user. Admins also cannot delete themselves. When creating a user, admins can assign an "isAdmin" role. The "isAdmin" field is stored in the database for this purpose.

When adding items, admins should only fill in relevant fields for each category. For example, the "specs" field should not be filled for clothing items. The application will prompt the admin to fill in any required fields for all categories.

Admins can log out by clicking the "Logout" button.

## Conclusion

In summary, this is my application for Ceng495 Homework 1, implemented using the Node.js framework Express and deployed on Render. MongoDB Atlas was used as the database. The app is deployed at https://ceng495-hw1-shopping.onrender.com

Atınç Utku Alparslan
