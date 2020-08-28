
const socket = io('http://localhost:8000');

// ############  get DOM elements In respective JS variables #############
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');


// ############# Audio that will play on receiving on messages #############
var audio = new Audio('ting.mp3');

// ######### Function which will append event info to the container
const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText= message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

    if(position == 'left'){
        audio.play();
    }
}


// ###########  Ask new user his name  let the server know ############
const name = prompt('Enter your name to join');
socket.emit('new-user-joined',  name)


// ######## if the new user joins, receive his name  from the srever ##########
socket.on('user-joined', name =>{
   append(`${name} joined the chat `,'right');
});


// ############ if server send a message receive it ################
socket.on('receive', data =>{
    append(`${data.name} :${data.message}` ,'left') ;
 });


//#########  if user leaves the chat , append the info to the container ##########
 socket.on('left',name =>{
     append(`${name} left the chat`,'right');
 });

//  ################## if the form gets submitted , send server the message #########
 form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value =''
});






