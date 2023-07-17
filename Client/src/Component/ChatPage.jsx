import io from 'socket.io-client';

function ChatPage() {
  const socket = io.connect('https://chatfati.onrender.com');

  const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  socket.emit('join_room', { username, room });

  socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
  });

  socket.on('message', (message) => {
    const chatMessages = document.querySelector('.chat-messages');
    console.log(message);
    outputMessage(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });

  const handelSubmit = (e) => {
    e.preventDefault();

    let msg = e.target.elements.msg.value;

    msg = msg.trim();

    if (!msg) {
      return false;
    }

    socket.emit('chatMessage', msg);

    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
  };

  const outputMessage = (message) => {
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.username;
    p.innerHTML += `<span>${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
  };

  function outputRoomName(room) {
    const roomName = document.getElementById('room-name');
    roomName.innerText = room;
  }

  function outputUsers(users) {
    const userList = document.getElementById('users');
    userList.innerHTML = '';
    users.forEach((user) => {
      const li = document.createElement('li');
      li.innerText = user.username;
      userList.appendChild(li);
    });
  }

  return (
    <>
      <div className='chat-container'>
        <header className='chat-header'>
          <h1>
            <i className='fa-brands fa-node-js'></i> Chat TG
          </h1>
          <a href='/' className='btn'>
            Leave Room
          </a>
        </header>
        <main className='chat-main'>
          <div className='chat-sidebar'>
            <h3>
              <i className='fas fa-comments'></i> Room Name:
            </h3>
            <h2 id='room-name'></h2>
            <h3>
              <i className='fas fa-users'></i> Users
            </h3>
            <ul id='users'></ul>
          </div>
          <div className='chat-messages'></div>
        </main>
        <div className='chat-form-container'>
          <form onSubmit={handelSubmit}>
            <input
              id='msg'
              type='text'
              placeholder='Enter Message'
              required
              autoComplete='off'
            />
            <button type='submit' className='btn'>
              <i className='fas fa-paper-plane'></i> Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChatPage;
