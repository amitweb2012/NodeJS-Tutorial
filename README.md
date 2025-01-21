# Book Store API

This is a simple Book Store API built using Express.js and Mongoose. It provides CRUD (Create, Read, Update, Delete) operations for managing books.

## Features

- Retrieve all books
- Retrieve a single book by ID
- Add a new book
- Update an existing book by ID
- Delete a book by ID

## Prerequisites

- Node.js (v14.x or later)
- MongoDB (running locally or in the cloud)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd book-rest-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=your-mongodb-connection-string
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm start
   ```
   The server will start on the specified port (default: `3000`).
   
## OR

5. ```bash
   docker-compose up --build
   ```
## Some useful commands

- Start Services: docker-compose up
- Stop Services: docker-compose down
- Rebuild a Service: docker-compose up --build service-name
- View Logs: docker-compose logs -f 

## API Endpoints
relative route
**USE**  `app.use("/api/books", bookRoutes)`;

### 1. Get All Books
   **GET** `/get`
   
   Retrieves a list of all books in the database.

   **Response Example:**
   ```json
   [
       {
           "_id": "640f12345",
           "title": "Book Title",
           "author": "Author Name",
           "price": 20,
           "genre": "Fiction",
           "createdAt": "2023-01-01T00:00:00.000Z"
       },
       {
           "_id": "640f67890",
           "title": "Another Book",
           "author": "Another Author",
           "price": 25,
           "genre": "Non-fiction",
           "createdAt": "2023-01-02T00:00:00.000Z"
       }
   ]
   ```

### 2. Get a Single Book by ID
   **GET** `/get/:id`

   Retrieves details of a book using its unique ID.

   **Response Example:**
   ```json
   {
       "_id": "640f12345",
       "title": "Book Title",
       "author": "Author Name",
       "price": 20,
       "genre": "Fiction",
       "createdAt": "2023-01-01T00:00:00.000Z"
   }
   ```

### 3. Add a New Book
   **POST** `/add`

   Adds a new book to the database.

   **Request Body Example:**
   ```json
   {
       "title": "New Book",
       "author": "New Author",
       "price": 15,
       "genre": "Thriller"
   }
   ```

   **Response Example:**
   ```json
   {
       "message": "Book added successfully",
       "book": {
           "_id": "640f56789",
           "title": "New Book",
           "author": "New Author",
           "price": 15,
           "genre": "Thriller",
           "createdAt": "2023-01-03T00:00:00.000Z"
       }
   }
   ```

### 4. Update an Existing Book by ID
   **PUT** `/update/:id`

   Updates the details of a book using its unique ID.

   **Request Body Example:**
   ```json
   {
       "title": "Updated Book",
       "author": "Updated Author",
       "price": 30,
       "genre": "Mystery"
   }
   ```

   **Response Example:**
   ```json
   {
       "message": "Book updated successfully",
       "book": {
           "_id": "640f12345",
           "title": "Updated Book",
           "author": "Updated Author",
           "price": 30,
           "genre": "Mystery",
           "createdAt": "2023-01-01T00:00:00.000Z"
       }
   }
   ```

### 5. Delete a Book by ID
   **DELETE** `/delete/:id`

   Deletes a book using its unique ID.

   **Response Example:**
   ```json
   {
       "message": "Book deleted successfully"
   }
   ```


## Folder Structure

```
book-rest-api/
├── db/
│   └── db.js              # database connection with mongoose 
├── contollers/
│   └── bookController.js # business logic for CRUD 
├── models/
│   └── bookModel.js      # Mongoose schema and model for books
├── routes/
│   └── bookRoutes.js     # API routes
├── server.js             # Main application file
├── package.json          # Project metadata and dependencies
├── docker-compose.yml    # Docker Compose configuration
├── Dockerfile            # Docker build instructions
├── .dockerignore         # ignore files and folder
├── .env                  # Environment variables
└── README.md             # Documentation

```

## License

This project is licensed under the MIT License. See the LICENSE file for details.
