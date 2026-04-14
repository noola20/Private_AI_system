const form = document.getElementById('form');
const input = document.getElementById('input');
const sendBtn = document.getElementById('send');
const chat = document.getElementById('chat');

function addMessage(text, role) {
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
  return div;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, 'user');
  input.value = '';
  sendBtn.disabled = true;
  const thinking = addMessage('Thinking...', 'ai');

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();

    if (!res.ok) {
      thinking.className = 'msg error';
      thinking.textContent = data.error || 'Request failed.';
    } else {
      thinking.textContent = data.reply || '(no response)';
    }
  } catch (err) {
    thinking.className = 'msg error';
    thinking.textContent = 'Network error. Is the server running?';
  } finally {
    sendBtn.disabled = false;
    input.focus();
  }
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    form.requestSubmit();
  }
});
