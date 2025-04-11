# Learn Node + Express

A simple learning project combining Node.js + Express backend with an HTML frontend.

## Features

- 🛠️ Express server on port 3000
- 💬 Simple HTML form to send a message
- 🔄 POST request from frontend using `fetch`
- 📝 Messages saved to a JSON file (`messages.json`)
- 📂 Static files served from `public` folder

## File Structure

```
learn-node-express/
├── index.js                # Main server file (Express setup)
├── messages.json           # Saved messages
├── package.json
├── public/
│   └── index.html          # HTML frontend
├── .gitignore
├── .gitattributes
└── README.md               # This file
```

## How to Run

1. Clone the repo:
```bash
git clone https://github.com/your-username/learn-node-express.git
cd learn-node-express
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node index.js
```

4. Open in browser:
```
http://localhost:3000
```

## Notes

- Built as a personal learning project 🚀
- All logic is in plain JavaScript
- No frameworks or databases — just core Node.js & Express

---

Feel free to fork this project and build on it!

