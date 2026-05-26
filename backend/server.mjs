import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors()); // Allow React app to call this API

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello World from Node.js!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});