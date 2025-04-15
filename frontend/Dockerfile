# Stage 1: Build the application
FROM node:18 AS builder

# Working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy other project files
COPY . .

# Build the production version of the application
RUN npm run build

# Stage 2: Deploy via nginx
FROM nginx:alpine

# Profile Install the utility for setting environment variables
RUN apk add --no-cache gettext

# Copy the finished React application build from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy the custom nginx config (optional)
# COPY nginx. conf /etc/nginx/nginx.conf

# Copy the entrypoint script to set environment variables (optional)
COPY ./nginx-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Port that listens to the container
EXPOSE 80

# Start nginx in the background
CMD ["/entrypoint.sh"]

