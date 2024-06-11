import dotenv from 'dotenv';
import express from 'express';
import { fileURLToPath } from 'url';
import bcryptjs from 'bcryptjs';
const { hash, compare } = bcryptjs;
import jsonwebtoken from 'jsonwebtoken';
const { verify, sign } = jsonwebtoken;
import bodyparser from 'body-parser';
const { json } = bodyparser;
import cookieParser from 'cookie-parser'; // Include cookie-parser
import { join, dirname } from 'path';
import authenticateJWT from './authJWT.js'; // Import your middleware
const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use(cookieParser()); // Use cookie-parser middleware

const users = []; // This should be replaced with a proper database in a real application

//const secretKey = 'your-secret-keys'; // Store this in an environment variable in a real application
const secretKey = process.env.JWT_SECRET;

app.get('/register', (req, res) => {
    res.sendFile(join(__dirname, 'register.html'));
  });
 
app.get('/login', (req, res) => {
    res.sendFile(join(__dirname, 'login.html'));
  });

app.get('/index', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
  });

// Middleware to protect routes
/*

*/
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    const userExists = users.find(user => user.username === username);
    if (userExists) {
      return res.status(400).send('User already exists');
    }
  
    const hashedPassword = await hash(password, 10);
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
  
    const validPassword = await compare(password, user.password);
    if (!validPassword) { 
      return res.status(400).send('Username or password is incorrect');
    }
  
    const token = sign({ username: user.username }, secretKey, { expiresIn: '1h' });
  
    // Set HttpOnly cookie with the token
    res.cookie('token', token, { httpOnly: true, secure: true });
    console.debug('logged in I think:', token);

    // Optionally, you can also set a response header with the token (not necessary when using cookies)
    // res.header('Authorization', `Bearer ${token}`);
  
    res.send('Logged in');
  });
  

  app.get('/protected', authenticateJWT, (req, res) => {
    //console.debug('/protected', res);

    res.send('This is a protected route');
  });

 

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  