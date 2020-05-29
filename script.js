const socket = io("http://localhost:3000");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("message-container");

//const name = prompt("What is your name?");
appendMessage("You Joined!");
socket.emit("new-user", name);

socket.on("chat-message", (data) => {
  //When it receives data, do something
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on("user-connected", (name) => {
  //When it receives data, do something
  appendMessage(`${name} connected`);
});

socket.on("user-disconnected", (name) => {
  //When it receives data, do something
  appendMessage(`${name} disconnected`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit("send-chat-message", message); //Send message to server
  appendMessage(`You: ${message}`);
  messageInput.value = "";
});

function appendMessage(message) {
  //Add a new message to the message container

  const template = document.querySelector("template");
  const node = document.importNode(template.content, true);
  node.querySelector(".message").innerText = message;
  messageContainer.append(node);
}
