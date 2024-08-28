# Link Parameter Appender

Time to complete: 2 hours.

## Overview

The Link Parameter Appender is a web application that allows users to append query parameters to URLs and save these URLs for future reference. Users can input a base URL and parameters in JSON format, which will be appended to the URL, and the resulting URL will be saved in a database. The application also supports viewing and paginating through the saved URLs.

![Screenshot 2024-08-27 at 6 08 12 PM](https://github.com/user-attachments/assets/26a99874-99f9-44df-9642-73a7700d3271)

![Screenshot 2024-08-27 at 6 08 19 PM](https://github.com/user-attachments/assets/e645941c-331b-46e2-835e-971fe2b53972)


## Features

- Append query parameters to a base URL.

- Display the newly created URL and its components.

- Save URLs with their parameters to a SQLlite database.

- View saved URLs with pagination support.

- Clear form inputs and result display.

- Display error messages for invalid URL OR parameters.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript

- **Backend:** Node.js, Express.js

- **Database:** SQLlite with Prisma ORM

- **Validation:** Custom validation functions for URL and parameters

## Installation

1. **Clone the repository:**

   ```bash

   git clone https://github.com/Yma-Van2020/LaterProject.git

   ```

2. **Navigate to the directory:**

   ```bash

   cd LaterProject

   ```

3. **Install dependencies:**

   ```bash

   npm install

   ```

4. **Set up environment variables:**

   Create a `.env` file in the directory and add your database configuration:

   ```

   DATABASE_URL="file:./dev.db"

   ```

5. **Run database migrations:**

   ```bash

   npx prisma migrate deploy

   ```

6. **Start the server:**

   ```bash

   npm start

   ```

## API Endpoints

### `POST /api/append-parameters`

Appends parameters to a URL and saves the result.

**Request Body:**

```json

{

  "url": "https://example.com",

  "parameters": {

    "aaa": "bbb"

  }

}

```

**Response:**

```json

{

  "originalURL": "https://example.com",

  "parameters": {

    "aaa": "bbb"

  },

  "newURL": "https://example.com?aa=bb"

}

```

**Error Responses:**

- **Invalid URL:**

  ```json

  {

    "error": "Invalid URL"

  }

  ```

- **Invalid Parameters:**

  ```json

  {

    "error": "Invalid parameters. Ensure parameters is a valid JSON object."

  }

  ```

### `GET /api/links`

Retrieves a list of saved links with pagination support.

**Response:**

```json

{

  "currentPage": 1,

  "totalPages": 3,

  "links": [

    {

      "id": 1,

      "original": "https://example.com",

      "parameters": {

        "aa": "bb"

      },

      "newUrl": "https://example.com?aa=bb"

    },

    // More links...

  ]

}

```

## Usage

1. **Submit a URL and Parameters:**

   - Enter the base URL (e.g., `https://example.com`) in the "URL" field.

   - Input the query parameters in JSON format (e.g., `{"aaa": "bbb"}`) in the "Parameters" field.

   - Click "Submit" to create a new URL with appended parameters.

2. **View Results:**

   - The result section will display the original URL, the parameters, and the new URL with appended parameters.

3. **View Saved Links:**

   - The saved links section will list all URLs saved in the database with pagination controls.

   - Use the "Previous" and "Next" buttons to navigate through the pages of saved links.

4. **Clear Form:**

   - Click the "Clear Form" button to reset the form fields and result display.

## Pagination

The application supports pagination for the list of saved links. The pagination controls include:

- **Previous Button:** Navigates to the previous page of results.

- **Next Button:** Navigates to the next page of results.

- **Page Info:** Displays the current page number and total pages.

