const socket = io();
const messageForm = document.querySelector('#messageForm');
const userMailInput = document.querySelector('#userMailInput');
let user = {};
// let userAddress = '';
// let userPhone= '';
// let userAge = '';
// let userAvatar = '';
// let userRole = '';
// let userId = '';
const messageInput = document.querySelector('#messageInput');
const messagesPool = document.querySelector('#messagesPool');
const greeting = document.querySelector('#greeting');

fetch('/user/logged').then(res => {
    return res.json()
}).then(res => {
    greeting.innerHTML = `<div><h1>Bienvenido ${res.data.user.name}</h1><a href="/user/logout">Logout</a></div>`;
    userMailInput.innerHTML=`${res.data.user.email}`;
    user = res.data.user;
})

function sendMessage(messageInfo) {
    socket.emit('client:message', messageInfo);
}

function clearMessage(){
    messageInput.value = '';
}

async function renderMessages(messagesArray){;
    const response = await fetch('./templates/messages.hbs');
    const content = await response.text();
    let template = Handlebars.compile(content);
    const html = template({messagesArray});
    messagesPool.innerHTML = html;
}

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    if(messageInput.value){
        const messageInfo = {
            author: {
                email: user.email,
                name: user.name,
                address: user.address,
                phone: user.phone,
                age: user.age,
                avatar: user.avatar,
                role: user.role,
                id: user.id
            },
            text: messageInput.value
        }
        sendMessage(messageInfo);
        clearMessage();
    }
})

socket.on('server:messages', renderMessages);
