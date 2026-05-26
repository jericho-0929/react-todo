import { createServer } from 'node:http';
import express from 'express';
import cors from 'cors';

const hostname = '127.0.0.1';
const port = 3000;

const app = express();
app.use(cors());

app.get('/api/greetings', async (req, res) => {
    res.json({ message: 'Hello, React! It is I, Node!'});
});

app.listen(5000, () => console.log('Server running on port 5000'));

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});