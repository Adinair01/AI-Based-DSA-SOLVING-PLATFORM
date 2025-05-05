from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_mysqldb import MySQL

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Required for session and flash

# MySQL Configuration
app.config.update(
    MYSQL_HOST='localhost',
    MYSQL_USER='root',
    MYSQL_PASSWORD='12345678',
    MYSQL_DB='bitbybit'
)

mysql = MySQL(app)

# Route: Signup Page
@app.route('/')
def signup():
    return render_template('signup.html')

# Route: Handle Signup Form Submission
@app.route('/signup', methods=['POST'])
def register_user():
    name = request.form.get('name')
    email = request.form.get('email')
    password = request.form.get('password')
    confirm_password = request.form.get('confirm-password')

    if password != confirm_password:
        flash("Passwords do not match", "danger")
        return redirect(url_for('signup'))

    cur = mysql.connection.cursor()
    try:
        cur.execute(
            "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
            (name, email, password)  # plain text (note: insecure in production)
        )
        mysql.connection.commit()
        flash("Signup Successful!", "success")
        return redirect(url_for('login'))
    except Exception as e:
        mysql.connection.rollback()
        flash("Email already registered or other error", "danger")
        return redirect(url_for('signup'))
    finally:
        cur.close()

# Route: Login Page
@app.route('/login')
def login():
    return render_template('login.html')

# Route: Handle Login Form Submission
@app.route('/login', methods=['POST'])
def login_user():
    email = request.form.get('email')
    password = request.form.get('password')

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
    user = cur.fetchone()
    cur.close()

    if user:
        session['user'] = user[1]  # user's name
        flash("Login successful", "success")
        return redirect(url_for('index'))
    else:
        flash("Invalid credentials", "danger")
        return redirect(url_for('login'))

# Route: Index Page (after login)
@app.route('/index')
def index():
    return render_template('index.html')

# Route: Dashboard Page (optional)
@app.route('/dashboard')
def dashboard():
    if 'user' in session:
        return f"Welcome {session['user']}! This is your dashboard."
    flash("Please log in to access the dashboard", "warning")
    return redirect(url_for('login'))

# Route: Logout
@app.route('/logout')
def logout():
    session.pop('user', None)
    flash("Logged out", "info")
    return redirect(url_for('login'))

# Main
if __name__ == '__main__':
    app.run(debug=True)
