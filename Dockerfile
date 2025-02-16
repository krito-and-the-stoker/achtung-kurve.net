FROM node:13.5

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock to leverage caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files
COPY . .
