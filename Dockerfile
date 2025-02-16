FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock to leverage caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files
COPY index.html vite.config.js ./
COPY ./src ./src
COPY ./public ./public

