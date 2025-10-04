# Use official Node.js LTS image
FROM node:18-alpine


# Create app directory
WORKDIR /usr/src/app


# Copy package files first and install dependencies (cacheable)
COPY package.json package-lock.json* ./
RUN npm ci --only=production || npm install --production


# Copy source
COPY . .


# Expose port
EXPOSE 3000


# Start the app
CMD [ "npm", "start" ]