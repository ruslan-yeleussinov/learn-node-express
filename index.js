const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const fs = require('fs/promises');
const path = require('path');

app.get('/messages', async (req, res) => {
  const filePath = path.join(__dirname, 'messages.json');

  try {
    const fileData = await fs.readFile(filePath, 'utf-8');
    const messages = JSON.parse(fileData);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read message file' });
  }
});

app.post('/message', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'The "text" field is required' });
  }

  const newMessage = {
    text,
    timestamp: new Date().toLocaleString()
  };

  const filePath = path.join(__dirname, 'messages.json');

  try {
    let messages = [];

    try {
      const fileData = await fs.readFile(filePath, 'utf-8');
      messages = JSON.parse(fileData);
    } catch (err) {
      messages = [];
    }

    messages.push(newMessage);

    await fs.writeFile(filePath, JSON.stringify(messages, null, 2), 'utf-8');

    console.log(`Message saved: ${text}`);
    res.json({ message: 'Message received and saved!', text });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Server error saving message' });
  }
});

app.delete('/messages', async (req, res) => {
  const filePath = path.join(__dirname, 'messages.json');

  try {
    await fs.writeFile(filePath, '[]', 'utf-8');
    console.log('All messages deleted.');
    res.json({ message: 'All messages deleted successfully.' });
  } catch (error) {
    console.error('Error deleting messages:', error);
    res.status(500).json({ error: 'Server error deleting messages' });
  }
});

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
