const API_KEY = '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';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

async function generateResponse(prompt) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'deepseek/deepseek-r1-distill-llama-70b:free',
            messages: [{ role: 'user', content: prompt }]
        })
    });

    if (!response.ok) throw new Error('Failed to generate response');
    const data = await response.json();
    return data.choices[0].message.content;
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