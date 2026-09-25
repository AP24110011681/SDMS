# SDMS - Quick Start Guide

## Prerequisites
- Node.js and npm installed
- MySQL installed and running
- Terminal/Command Prompt access

## Step 1: Set Up MySQL Database (2 minutes)

### On macOS using Terminal:
```bash
# Connect to MySQL
mysql -u root -p

# When prompted, enter your MySQL password
# Then paste the entire content from: /Users/azam/Public/sem4/dbms/sdms-app/database/schema.sql
# And press Enter
```

### On Windows using Command Prompt:
```cmd
mysql -u root -p < C:\path\to\schema.sql
```

### Using MySQL Workbench:
1. Open MySQL Workbench
2. File → Open SQL Script → Select schema.sql
3. Click Execute (⚡ icon)

## Step 2: Start Backend Server (2 minutes)

```bash
# Navigate to backend folder
cd /Users/azam/Public/sem4/dbms/sdms-app/backend

# Install dependencies (first time only)
npm install

# Update .env file with your MySQL password if needed
# nano .env

# Start the server
npm start
```

**Success message:** "SDMS Backend running on http://localhost:3000"

## Step 3: Start Frontend (1 minute)

### Option A: Python HTTP Server (Recommended)
```bash
# Navigate to frontend folder
cd /Users/azam/Public/sem4/dbms/sdms-app/frontend

# Start server (choose one)
python3 -m http.server 8000    # Python 3
python -m SimpleHTTPServer 8000  # Python 2
```

### Option B: Using Live Server (VS Code)
1. Install "Live Server" extension in VS Code
2. Right-click on index.html
3. Click "Open with Live Server"

### Option C: Using http-server
```bash
npm install -g http-server
cd /Users/azam/Public/sem4/dbms/sdms-app/frontend
http-server -p 8000
```

## Step 4: Access the Application

Open your browser and navigate to:
```
http://localhost:8000
```

## Quick Test

1. Go to **Dashboard** - See stats and recent data
2. Go to **Students** - Add a new student
3. Go to **Courses** - View available courses
4. Go to **Enrollments** - Enroll student in a course
5. Go to **Grades** - Add a grade for the enrollment
6. Go to **Reports** - View various reports

## Troubleshooting

### Backend won't start
```bash
# Check if port 3000 is in use
lsof -i :3000

# Kill process if needed (macOS/Linux)
kill -9 <PID>

# Update .env with correct MySQL password
```

### Frontend won't load
- Check console (F12) for errors
- Ensure backend is running on :3000
- Clear browser cache (Ctrl+Shift+Delete)

### Can't connect to MySQL
```bash
# Verify MySQL is running
# macOS
brew services list

# Windows - Check Services

# Restart MySQL if needed
# macOS
brew services restart mysql
```

## File Locations

- Database Schema: `/Users/azam/Public/sem4/dbms/sdms-app/database/schema.sql`
- Backend Code: `/Users/azam/Public/sem4/dbms/sdms-app/backend/`
- Frontend Code: `/Users/azam/Public/sem4/dbms/sdms-app/frontend/`

## Important Notes

1. **Always start backend first** before accessing frontend
2. **MySQL must be running** before starting backend
3. **Don't close the backend terminal** while using the application
4. **Browser console (F12) shows helpful error messages**
5. **Changes are saved to MySQL immediately** - no refresh needed

## Performance Tips

- Close other MySQL clients if slow
- Restart MySQL if experiencing issues
- Clear browser cache periodically
- Use Chrome/Firefox for best performance

## Next Steps

After getting familiar with the basic features:
1. Try adding multiple students and courses
2. Create complex enrollments
3. Run all report queries
4. Check database directly: `SELECT * FROM student;`

Enjoy using SDMS! 🎓
