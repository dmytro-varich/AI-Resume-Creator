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

# Set environment variables for the build
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

# Build the production version of the application
RUN npm run build

# Stage 2: Deploy via nginx
FROM nginx:alpine

# Copy the finished React application build from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy the custom nginx config (optional)
# COPY nginx. conf /etc/nginx/nginx.conf

# Port that listens to the container
EXPOSE 80

# Start nginx in the background
CMD ["nginx", "-g", "daemon off;"]

