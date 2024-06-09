const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // Include cookie-parser
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cookieParser()); // Use cookie-parser middleware

const users = []; // This should be replaced with a proper database in a real application
const secretKey = 'your-secret-key'; // Store this in an environment variable in a real application

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
  });
 
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
  });

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  

// Middleware to protect routes
const authenticateJWT = (req, res, next) => {
    let token = req.header('Authorization');
    console.debug('authenticateJWT token from header: ', token);
    
    // If token is not found in the Authorization header, try to get it from cookies
    if (!token && req.cookies) {
        token = req.cookies.token;
        console.debug('authenticateJWT token from cookies: ', token);
    }
  
    if (!token) {
        console.debug('Access Denied');
        return res.status(401).send('Access Denied');
    }
    
    try {
        const verified = jwt.verify(token.replace('Bearer ', ''), secretKey);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    const userExists = users.find(user => user.username === username);
    if (userExists) {
      return res.status(400).send('User already exists');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword };
    users.push(user);
    console.debug("/register", username, password);
    res.status(201).send('User registered');
  });
 
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(400).send('Username or password is incorrect');
    }
  
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) { 
      return res.status(400).send('Username or password is incorrect');
    }
  
    const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
  
    // Set HttpOnly cookie with the token
    res.cookie('token', token, { httpOnly: true, secure: true });
    console.debug('logged in I think:', token);

    // Optionally, you can also set a response header with the token (not necessary when using cookies)
    // res.header('Authorization', `Bearer ${token}`);
  
    res.send('Logged in');
  });
  

  app.get('/protected', authenticateJWT, (req, res) => {
    console.debug('/protected', res);

    res.send('This is a protected route');
  });

 

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  