const express = require('express')
const path = require('path')

require('dotenv').config()

const app = express()
app.use(express.json());
const PORT = process.env.PORT || 3000

app.use(express.static(__dirname))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/getSettings', async (req, res) => {
  console.log('Query params:', req.query);
  const { id, token } = req.query;
  if (!id || !token) {
    return res.status(400).json({ error: 'id and token are required' });
  }
  const url = `${process.env.API_URL}/waInstance${id}/getSettings/${token}`;
  const r = await fetch(url);
  const data = await r.json();
  res.json(data);
});

app.get('/getStateInstance', async (req, res) => {
  console.log('Query params:', req.query);
  const { id, token } = req.query;
  if (!id || !token) {
    return res.status(400).json({ error: 'id and token are required' });
  }
  const url = `${process.env.API_URL}/waInstance${id}/getStateInstance/${token}`;
  const r = await fetch(url);
  const data = await r.json();
  res.json(data);
});

app.post('/sendMessage', async (req, res) => {
  console.log('Query params:', req.query);
  console.log('Body:', req.body);
  const { id, token } = req.query;
  const { chatId, message } = req.body;

  if (!id || !token) {
    return res.status(400).json({ error: 'id and token are required' });
  }
  const url = `${process.env.API_URL}/waInstance${id}/sendMessage/${token}`;
  const r = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ chatId: `${chatId}${process.env.CHAT_ID_POSTFIX}`, message })
  });
  const data = await r.json();
  res.json(data);
});

app.post('/sendFileByUrl', async (req, res) => {
  console.log('Query params:', req.query);
  console.log('Body:', req.body);
  const { id, token } = req.query;
  const { chatId, urlFile, fileName, caption} = req.body;

  if (!id || !token) {
    return res.status(400).json({ error: 'id and token are required' });
  }
  const url = `${process.env.API_URL}/waInstance${id}/sendFileByUrl/${token}`;
  const r = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ chatId: `${chatId}${process.env.CHAT_ID_POSTFIX}`, urlFile, fileName, caption })
  });
  const data = await r.json();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
})
