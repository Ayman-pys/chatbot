const API_KEY = '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'; // استبدل هذا بمفتاح API صالح من OpenRouter
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

async function generateResponse() {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY_HERE' // Replace with your actual key
      },
      body: JSON.stringify({
        // Add your payload here, e.g., { prompt: "Hello", max_tokens: 50 }
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Or process it as needed
  } catch (error) {
    console.error('Error in generateResponse:', error.message);
    throw error; // Re-throw if needed by the caller
  }
}
function addMessage(message, isUser) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', isUser ? 'user-message' : 'bot-message');

    const profileImage = document.createElement('img');
    profileImage.classList.add('profile-image');
    profileImage.src = isUser ? 'user.jpg' : 'bot.jpg';
    profileImage.alt = isUser ? 'User' : 'Bot';

    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = message;

    messageElement.appendChild(profileImage);
    messageElement.appendChild(messageContent);
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showLoading() {
    const loadingElement = document.createElement('div');
    loadingElement.id = 'loading';
    loadingElement.classList.add('message', 'bot-message');

    const profileImage = document.createElement('img');
    profileImage.classList.add('profile-image');
    profileImage.src = 'bot.jpg';
    profileImage.alt = 'Bot';

    const loadingContent = document.createElement('div');
    loadingContent.classList.add('message-content');
    loadingContent.innerHTML = '<div class="spinner"><div></div><div></div><div></div></div>';

    loadingElement.appendChild(profileImage);
    loadingElement.appendChild(loadingContent);
    chatMessages.appendChild(loadingElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return loadingElement;
}

function removeLoading(loadingElement) {
    if (loadingElement) chatMessages.removeChild(loadingElement);
}

async function handleUserInput() {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        addMessage(userMessage, true);
        userInput.value = '';
        sendButton.disabled = true;
        userInput.disabled = true;

        const loadingElement = showLoading();
        try {
            const botMessage = await generateResponse(userMessage);
            removeLoading(loadingElement);
            addMessage(botMessage, false);
        } catch (error) {
            console.error('Error:', error);
            removeLoading(loadingElement);
            addMessage('Sorry, I encountered an error. Please try again.', false);
        } finally {
            sendButton.disabled = false;
            userInput.disabled = false;
            userInput.focus();
        }
    }
}

sendButton.addEventListener('click', handleUserInput);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleUserInput();
    }
});
