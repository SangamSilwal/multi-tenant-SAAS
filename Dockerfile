# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Production stage
FROM node:18-alpine
WORKDIR /src
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm install --production
CMD ["node", "dist/app.js"]a# ---- Builder Stage ----
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependency files first for caching
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies and build tools
RUN npm ci

# Copy source code
COPY src ./src

# Compile TypeScript to JavaScript
RUN npm run build  # Ensure you have "build": "tsc" in package.json scripts

# ---- Production Stage ----
FROM node:18-alpine
WORKDIR /app

# Copy production dependencies
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production

# Copy compiled JavaScript from builder
COPY --from=builder /app/dist ./dist

# Expose port (replace 3000 with your app's port)
EXPOSE 3000

# Start the app
CMD ["node", "dist/index.js"]