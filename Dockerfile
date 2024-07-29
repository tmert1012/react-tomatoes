# Stage 1: Build the React app
FROM node:22 AS build

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application code
COPY . .

# test the application
RUN yarn test

# Build the React application
RUN yarn build

# Stage 2: Serve the React app with nginx
FROM nginx:alpine

# Copy the built application from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]