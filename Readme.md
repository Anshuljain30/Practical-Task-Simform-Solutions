
# API

  

- An API to Signup users, Login users, Get user details and Update user
- Stake - Node, Express, MongoDB (Mongoose)
- No static page served, Use Postman to test API

  

# How to go up and running

  

-  ### Local env

  

1. Clone this repo
2. Navigate to Project Directory
3. Update .env file

4. Install Packages

  

```sh

npm install

```

  

4. Run the server

  

```sh

npm start

```

  

- once started you can visit [http://localhost:8080](http://localhost:8080) 8080 is default port.

  

# API Endpoints

  

Use Postman</br>

Use Header => Content-Type: application/json</br>
**Route for Signup -**
localhost:80/auth/signup/</br>
**Route for Login -**
localhost:80/auth/login/</br>

Protacted Routes - Authentication Token received as login response must be passed as Authorization Header for these requests</br>

Use Header => Authorization: `Generated_Token`</br>
**Route to get user details -**
localhost:80/users/<user_id></br>
**Route to update user -**
localhost:80/users/<user_id></br>

  
# Author
Anshul Jain
