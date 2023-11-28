# Random Idea App

The Random Idea App is a full-stack web application where users can submit, view, and manage random ideas. The authentication mechanism is minimal, requiring only a username. Users can add and delete their own ideas.

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose

- **Frontend:**
  - HTML
  - CSS
  - JavaScript

## Features 

- View all ideas submitted by users.
- View a single idea by its unique identifier.
- Add a new idea with a text, tag, and username.
- Update an existing idea (username authentication required).
- Delete an idea (username authentication required).

**Note:** The current version of the UI has limited support for updating ideas. Editing features are not fully implemented in the user interface. However, you can perform edits by using tools like Postman. Send a PUT request with the desired updates in the request body, including the matching idea ID.
  
Example using Postman:
   - **Method:** PUT
   - **URL:** `http://localhost:5000/ideas/{idea_id}`
   - **Body:** JSON with updated fields (text, tag, username).

