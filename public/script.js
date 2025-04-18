const sendButton = document.getElementById('send-msg-btn');
sendButton.addEventListener('click', sendMessage);

async function sendMessage() {
  const text = document.getElementById('messageInput').value; 

  try {
    const response = await fetch('https://learn-node-express-oniv.onrender.com/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })  
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } 

    const data = await response.json();

    if (data.message) {
      typeWriterEffect(data.message, 'responseText');
    } else if (data.error) {
      typeWriterEffect(data.error, 'responseText');
    }    

    messageInput.value = '';

  } catch (error) {
    console.error("Error sending message:", error);
    typeWriterEffect("Failed to send message", 'responseText');
  }
}

const getMessagesButton = document.getElementById('get-msgs-btn');
getMessagesButton.addEventListener('click', getMessages);

async function getMessages() {
  try {
    const response = await fetch('https://learn-node-express-oniv.onrender.com/messages');
    const messages = await response.json();
    
    const list = document.getElementById('messagesList');
    
    list.innerHTML = '';
    messages.forEach(msg => {
      const li = document.createElement('li');
      li.innerText = msg.text;
      list.appendChild(li);
    });
  } catch (err) {
    console.error("Error loading messages:", err);
    document.getElementById('responseText').innerText = "Error loading messages";
  }
}

const deleteButton = document.getElementById('delete-msgs-btn');
deleteButton.addEventListener('click', deleteMessages);

async function deleteMessages() {
  try {
    const response = await fetch('https://learn-node-express-oniv.onrender.com/messages', {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    typeWriterEffect(data.message, 'responseText');
    document.getElementById('messagesList').innerHTML = '';
  } catch (error) {
    console.error("Error deleting messages:", error);
    typeWriterEffect("Failed to delete messages", 'responseText');
  }
}

const messageInput = document.getElementById('messageInput');
messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
    messageInput.value = '';
  }
});

function typeWriterEffect(text, elementId, speed = 40) {
  const element = document.getElementById(elementId);
  element.innerHTML = '';
  let i = 0;

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

