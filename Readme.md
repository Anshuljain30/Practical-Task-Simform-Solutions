
# API

  

- An API to Signup users, Login users, Get user details and Update user
- Stake - Node, Express, MongoDB (Mongoose)
- No static page served, Use Postman to test API

  

# How to go up and running

  

-  ### Local env

  

1. Clone this repo
2. Navigate to Project Directory
3. Update .env file
</br>&emsp;`PORT`&emsp;Port at which you want to run Node Application.
</br>&emsp;`MONGO_STRING`&emsp;MongoDB Connection String.
</br>&emsp;`JWT_SECRET`&emsp;JWT Secret Key to Encrypt Token.

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


| Endpoint     | Method | Payload                                                                                                                                                                                                                        | Response                      | Requirements                                                           | Description                                                                                            |
| ------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| /auth/signup | POST   | {</br>&emsp;"email":"test@test.com",</br>&emsp;"firstName":"test",</br>&emsp;"lastName":"test",</br>&emsp;"password":"test123",</br>&emsp;"image":"image.jpg"</br>}                  | {</br>&emsp;"message":"UserCreated!,</br>&emsp;userId</br>} | `email` must be Unique     | Signup the User                                                                                        |
| /auth/login  | POST   | {</br>&emsp;"email":"test@test.com",</br>&emsp;"password":"test123"</br>}                                                                                                                                                    | {</br>&emsp;"token":"JWT Token",</br>&emsp;userId</br>}             | None                                                                   | Authenticates the user and generates the JWT                                                          |
| /users/:userId       | GET    | params : `userId`| {</br>&emsp;"message":"User fetched.",</br>&emsp;user {  }</br>}          |  | Fetches User Details |
| users/:userId | PUT    | params : `userId`</br>{</br>&emsp;"email":"test@test.com",</br>&emsp;"firstName":"test",</br>&emsp;"lastName":"test",</br>&emsp;"password":"test123",</br>&emsp;"image":"image.jpg"</br>}| {</br>&emsp;"message":"UserUpdated!",</br>&emsp;userId</br>}          | `email` must not be used by other user | Updates the User Details |

  
# Author
Anshul Jain
