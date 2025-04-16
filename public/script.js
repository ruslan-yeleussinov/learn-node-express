async function sendMessage() {
  const text = document.getElementById('messageInput').value; 

  try {
    const response = await fetch('http://localhost:3000/message', {
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
    document.getElementById('responseText').innerText = data.message || data.error;

  } catch (error) {
    console.error("Error sending message:", error);
    document.getElementById('responseText').innerText = "Failed to send message";
  }
}

async function getMessages() {
  try {
    const response = await fetch('http://localhost:3000/messages');
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