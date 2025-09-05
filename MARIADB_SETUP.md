# MariaDB Docker Setup

## What's New

I've added a MariaDB container to your Docker Compose setup with the following features:

### Services Added:
- **MariaDB 10.11**: Database server container
- **Persistent storage**: Database data is stored in a Docker volume
- **Auto-initialization**: Your DDL.sql and DML.sql files will be executed on first startup

### Configuration:
- **Database**: `recording_studio`
- **User**: `appuser` / `apppassword`
- **Root**: `root` / `rootpassword`
- **Port**: 3306 (accessible from host)

### File Structure:
```
database/
└── init/
    ├── 01_DDL.sql           # Your table definitions
    ├── 02_sample_data.sql   # Sample data inserts (clean SQL)
    └── 03_plsql.sql         # Your stored procedures
```

**Note**: The original `DML.sql` contained template queries with parameters (`:parameter`) that aren't valid for direct execution, so a clean `02_sample_data.sql` file was created with actual INSERT statements.

## Quick Start

1. **Start all services**:
   ```bash
   docker-compose up --build
   ```

2. **Access your application**:
   - Frontend: http://localhost:60001
   - Backend API: http://localhost:60000
   - Database: localhost:3306

3. **Connect to database directly** (optional):
   ```bash
   # Using docker exec
   docker exec -it recording-studio-db mysql -u appuser -p recording_studio
   
   # Or using any MySQL client
   mysql -h localhost -P 3306 -u appuser -p recording_studio
   ```

## Environment Variables

Your `.env` file now contains:
- `DB_ROOT_PASSWORD`: MariaDB root password
- `DB_USER`: Application database user
- `DB_PASSWORD`: Application database password  
- `DB_NAME`: Database name

## Available Stored Procedures

After initialization, your database will have the following stored procedures available:

### Database Management:
- `sp_ResetDatabase()` - Recreates all tables and inserts sample data

### Artists:
- `sp_CreateArtist(manager_ID, name, phone_number, email, OUT artist_ID)`
- `sp_UpdateArtist(artist_ID, manager_ID, name, phone_number, email)`
- `sp_DeleteArtist(artist_ID)`

### Managers:
- `sp_CreateManager(name, phone_number, email, OUT manager_ID)`
- `sp_UpdateManager(manager_ID, name, phone_number, email)`
- `sp_DeleteManager(manager_ID)`

### Rooms:
- `sp_CreateRoom(square_footage, floor, OUT room_ID)`

### Invoices:
- `sp_CreateInvoice(session_ID, session_cost, invoice_paid, OUT invoice_ID)`
- `sp_UpdateInvoice(invoice_ID, session_ID, session_cost, invoice_paid)`

### Recording Sessions:
- `sp_CreateRecordingSession(room_ID, duration, OUT session_ID)`

### Recording Sessions & Artists:
- `sp_CreateRecordingSessionAndArtistPairing(session_ID, artist_ID, OUT recording_sessions_has_artists_ID)`
- `sp_UpdateRecordingSessionAndArtistPairing(recording_sessions_has_artists_ID, session_ID, artist_ID)`
- `sp_DeleteRecordingSessionAndArtistPairing(recording_sessions_has_artists_ID)`

## Database Initialization

On first startup, MariaDB will:
1. Create the `recording_studio` database
2. Create the `appuser` with appropriate permissions
3. Execute `01_DDL.sql` to create your tables
4. Execute `02_sample_data.sql` to insert sample data
5. Execute `03_plsql.sql` to create your stored procedures

**Note**: If initialization fails due to SQL syntax errors, you can manually execute the stored procedures using:
```bash
docker cp database/init/03_plsql.sql recording-studio-db:/tmp/plsql.sql
docker exec recording-studio-db mysql -u root -prootpassword recording_studio -e "source /tmp/plsql.sql"
```

## Troubleshooting

- **Database connection issues**: Wait for the health check to pass (may take 60+ seconds on first run)
- **Data persistence**: Database data is stored in the `mariadb_data` Docker volume
- **Reset database**: `docker-compose down -v` will remove all data and start fresh

## Service Dependencies

- Frontend depends on Backend
- Backend depends on MariaDB (waits for health check)
- MariaDB starts first and must be healthy before Backend starts
