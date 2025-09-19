# TaskManagement
Task management website with NextJS and Django


Task Management System
A simple task management app I built using Django for the backend and Next.js for the frontend. 
It lets you create, manage, and track your tasks with user authentication.

What it does

Sign up/login with JWT authentication
Create, edit, delete, and view tasks
Clean, responsive interface
RESTful API backend

How to run it locally
Backend (Django)
First, set up the backend:

bash# Clone and navigate to the project
git clone (https://github.com/Nivin1122/TaskManagement.git)
cd task-management-system

# PROJECT IMAGES AND VIDEO DRIVE LINK !!!
https://drive.google.com/drive/folders/1d4ldsSzM2ZPRQyD07RBvruXLUod2oWI2?usp=sharing


# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up database
python manage.py migrate
python manage.py createsuperuser

# Start server

python manage.py runserver
Frontend (Next.js)

In another terminal:
bash cd client
npm install
npm run dev

Now visit http://localhost:3000 for the app and http://localhost:8000 for the API.
