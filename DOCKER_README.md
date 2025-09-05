# Docker Deployment Guide

This guide explains how to containerize and run your Recording Studio application using Docker.

## Prerequisites

- Docker and Docker Compose installed on your system
- Access to your database server from the Docker containers

## Setup Instructions

### 1. Environment Configuration

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file with your actual database credentials:
   ```
   DB_HOST=your_database_host
   DB_USER=your_database_username
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   ```

### 2. Build and Run

Build and start all services:
```bash
docker-compose up --build
```

Or run in detached mode:
```bash
docker-compose up --build -d
```

### 3. Access the Application

- **Frontend**: http://localhost:60001
- **Backend API**: http://localhost:60000

### 4. Stopping the Application

```bash
docker-compose down
```

### 5. View Logs

```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend

# Follow logs in real-time
docker-compose logs -f
```

## Architecture

- **Backend**: Node.js/Express API server running on port 60000
- **Frontend**: React application served by Express on port 60001
- **Database**: External MySQL database (not containerized)

## Network Configuration

The application uses a custom Docker network (`app-network`) for internal communication between services. The database connection is made to an external database server specified in your environment variables.

## Health Checks

Both services include health checks to ensure they're running properly:
- Backend: Checks the `/artists` endpoint
- Frontend: Checks the root endpoint

## Troubleshooting

1. **Database Connection Issues**: 
   - Ensure your database host is accessible from Docker containers
   - Check that your database credentials are correct in the `.env` file

2. **Port Conflicts**: 
   - If ports 60000 or 60001 are already in use, modify the port mappings in `docker-compose.yaml`

3. **Build Issues**: 
   - Clear Docker cache: `docker system prune`
   - Rebuild without cache: `docker-compose build --no-cache`

## Production Considerations

- Use a reverse proxy (nginx) in front of the application
- Set up proper SSL/TLS certificates
- Configure proper logging and monitoring
- Use Docker secrets for sensitive information instead of environment variables
- Consider using a managed database service
