# API Sandbox with Random Bad Responses and Pagination

## Overview
This project provides a sandbox environment for a paginated API that serves newspaper articles. The API simulates random internal server errors (HTTP 500), allowing developers to test error handling and pagination logic.

## Features
- Paginated API endpoint (`/articles`) with customizable `page` parameters.
- Randomized HTTP 500 responses for testing error handling.
- Dockerized setup using Docker Compose.

## Setup Instructions

### Prerequisites
- Docker and Docker Compose installed on your machine (for Docker setup).
- Python 3.7 or higher installed on your machine (for non-Docker setup).

### Steps to Run with Docker

1. Clone the repository:
   ```bash
   git clone https://github.com/mukundpai/api-pagination-sandbox
   cd api-pagination-sandbox
   ```

2. Build the Docker image:
   ```bash
   docker-compose build
   ```

3. Start the Docker container:
   ```bash
   docker-compose up
   ```

4. Access the API at `http://localhost:5000/articles`.

### Steps to Run Without Docker

1. Clone the repository:
   ```bash
   git clone https://github.com/mukundpai/api-pagination-sandbox
   cd api-pagination-sandbox
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows, use `venv\Scripts\activate`
   ```

3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask application:
   ```bash
   python app.py
   ```

5. Access the API at `http://localhost:5000/articles`.

### Example API Calls
- Fetch the first page of articles:
  ```bash
  curl -H "Authorization: your-name" "http://localhost:5000/articles?page=1&per_page=10"
  ```
- Fetch the second page of articles:
  ```bash
  curl -H "Authorization: your-name" "http://localhost:5000/articles?page=2&per_page=10"
  ```

### Error Handling
The API may return a 500 error for up to 5 requests per user. Implement retry logic in your client to handle these errors.

## Project Structure
```
.
├── app.py               # Flask API code
├── Dockerfile           # Dockerfile to build the API image
├── docker-compose.yml   # Docker Compose file to orchestrate the container
├── README.md            # Project documentation
├── requirements.txt     # Python dependencies
```
