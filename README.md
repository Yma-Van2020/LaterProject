Here's the updated README file with the additional details on pagination, parameter examples, website example, and error messages:

```markdown

# Link Parameter Appender

## Overview

The Link Parameter Appender is a web application that allows users to append query parameters to URLs and save these URLs for future reference. Users can input a base URL and parameters in JSON format, which will be appended to the URL, and the resulting URL will be saved in a database. The application also supports viewing and paginating through the saved URLs.

## Features

- Append query parameters to a base URL.

- Display the newly created URL and its components.

- Save URLs with their parameters to a PostgreSQL database.

- View saved URLs with pagination support.

- Clear form inputs and result display.

- Display error messages for invalid URL and parameters.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript

- **Backend:** Node.js, Express.js

- **Database:** PostgreSQL with Prisma ORM

- **Validation:** Custom validation functions for URL and parameters

## Installation

### Backend Setup

1. **Clone the repository:**

   ```bash

   git clone https://github.com/your-username/link-parameter-appender.git

   ```

2. **Navigate to the backend directory:**

   ```bash

   cd link-parameter-appender/backend

   ```

3. **Install dependencies:**

   ```bash

   npm install

   ```

4. **Set up environment variables:**

   Create a `.env` file in the `backend` directory and add your database configuration:

   ```

   DATABASE_URL=your_database_url

   ```

5. **Run database migrations:**

   ```bash

   npx prisma migrate deploy

   ```

6. **Start the server:**

   ```bash

   npm start

   ```

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash

   cd link-parameter-appender/frontend

   ```

2. **Install dependencies:**

   ```bash

   npm install

   ```

3. **Start the development server:**

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

    "aa": "bb"

  }

}

```

**Response:**

```json

{

  "originalURL": "https://example.com",

  "parameters": {

    "aa": "bb"

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

