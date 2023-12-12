# Online Store Information System
This project consists of an online video game store. As a website user, you can place orders, create user accounts, and log in. As an administrator, you can create products, update information, and view orders or statistics. The fontend of this system is hosted in this repository, developed using React framework, using Material UI to make the website more responsive.

## System Requirements

For the project's frontend, using the React framework requires **Node.js** and **Npm** for React development on the system.

## Steps to execute the project

First make sure that this repository has been cloned and saved in a folder which you can identify.
- 1.- Open a terminal/command prompt, navigate to the project directory.
- 2.- Make sure that the backend has already been created and configured.
- 3.- Execute the command `npm install` to download dependencies.
- 4.- Run the application using the appropriate command, such as `npm run dev`.
- 5.- Access the application through the provided URL or port [[http://localhost:5173](http://localhost:5173/)].
> **Note:**  that the backend application is running before starting the front end project.

## Once the project has been executed
Once the project is running, you will be able to navigate through the web page to perform various actions.
- For example you will be able to view products, add them to your cart and place the order.
- You will be able to log in and see your orders placed.
- As there is a role system, if you are an employee or administrator you will be able to add products, or modify the roles of the users...
- You will also be able to see some statistics of the store.

As there is some predefined data in the database, there will be only one user registered at the beginning, this user will have all the roles and will be able to modify the roles of the different users that log in. His email is **admin@example.com** and his password is **root**.

## Features

- This project will have a home page where different types of products will be shown.
- It will also have a very complete filter with which you will be able to specify enough to find a product.
- It will have a role-based system where only administrators and employees will be able to access functionalities that normal users cannot.
- Contains a page to view some interesting statistics of the website.
- You will have a fully functional shopping cart implemented. Each user will have their own shopping cart and it will not be modified when logging out and setting up another account.
- The project will have a fully functional login system and if the web page is closed with a logged in user, the user's session will not be closed. It will close after a certain period of time.

> **Note:**  The backend repository link is https://github.com/Alejandro-Moles/OnlineShop_AlejandroMolesHurtado.git
