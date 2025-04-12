# Use the official Python image
FROM python:3.9-slim

# Install dependencies
WORKDIR /app
COPY requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

# Copy the source code
COPY . /app

# Expose port 5000 for the Flask application
EXPOSE 5000

# Run the application
CMD ["python", "ParsingService.py"]
