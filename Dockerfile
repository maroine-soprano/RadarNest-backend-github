# Use a lightweight Node.js base image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a minimal Node.js runtime for the final image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy only the built application and production dependencies
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package.json ./

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/src/main"]
