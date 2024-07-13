# API Documentation

## Base URL
All API endpoints are relative to `http://localhost:3030`.

## API Endpoints

1. **Get Channel Data**
   - **Endpoint:** `/Channel`
   - **Method:** GET
   - **Description:** Fetches the list of channels/movies from the server.

2. **Get User Profile**
   - **Endpoint:** `/profile/:userId`
   - **Method:** GET
   - **Description:** Fetches the user profile data including watch history.
   - **Parameters:**
     - `userId` (required): The unique identifier of the user.

3. **Update User Profile**
   - **Endpoint:** `/profile/:userId`
   - **Method:** PUT
   - **Description:** Updates the user profile data on the server.
   - **Parameters:**
     - `userId` (required): The unique identifier of the user.
   - **Request Body:**
     - `firstName` (optional): The user's first name.
     - `lastName` (optional): The user's last name.
     - `SubscriptionType` (optional): The user's subscription type.
     - `Subscription` (optional): The user's subscription status.
     - `plan` (optional): The user's plan.
     - `paymentType` (optional): The user's payment type.
     - `encryptedPaymentDetails` (optional): The user's encrypted payment details.
     - `preferences` (optional): The user's preferences object.
     - `watchHistory` (optional): The user's watch history array.

4. **Login User**
   - **Endpoint:** `/profile`
   - **Method:** GET
   - **Description:** Validates user credentials and returns user profile data if successful.
   - **Request Body:**
     - `userId` (required): The user's unique identifier.
     - `password` (required): The user's password.

5. **Update User**
   - **Endpoint:** `/profile`
   - **Method:** PUT
   - **Description:** Updates the user's subscription type and status.
   - **Request Body:**
     - `SubscriptionType` (required): The user's new subscription type.
     - `Subscription` (required): The user's new subscription status.

## Error Responses
The API may return the following error responses:
- `400 Bad Request`: The request is invalid or missing required parameters.
- `401 Unauthorized`: The user is not authorized to access the requested resource.
- `404 Not Found`: The requested resource is not found.
- `500 Internal Server Error`: An unexpected error occurred on the server.

## Success Responses
The API may return the following success responses:
- `200 OK`: The request was successful, and the requested data is returned in the response body.
- `201 Created`: The request was successful, and a new resource has been created.
- `204 No Content`: The request was successful, but there is no data to return.

## API Documentation Conventions
- Endpoints are relative to the base URL.
- Methods are capitalized (e.g., GET, POST, PUT, DELETE).
- Request bodies are represented as JSON objects.
- Response bodies are represented as JSON objects.
- Parameters are enclosed in curly braces (e.g., :param).
- Optional parameters are enclosed in square brackets (e.g., [param]).
- Required parameters are not enclosed in any brackets.
- Error responses are represented as plain text.
- Success responses are represented as JSON objects.
"# React-Movie-App" 
