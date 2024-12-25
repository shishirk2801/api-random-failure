FROM python:3.11-alpine

# Set working directory
WORKDIR /app

# Copy files to container
COPY app.py ./

# Copy requirements file
COPY requirements.txt ./

# Install dependencies
RUN pip install -r requirements.txt

# Expose port
EXPOSE 5000

# Run the server
CMD ["python", "./app.py"]
