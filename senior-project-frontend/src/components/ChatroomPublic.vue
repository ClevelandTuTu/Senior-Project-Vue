<template>
    <div class="button-div">
        <button @click="leaveRoom">Leave Chatroom</button>
    </div>
    <div id="container">
        <div id="chat-box">
            <div id="message-box">
            </div>
            <div id="input-container">
                <button id="emoji-button" @click="openEmojiList" ref="emojiButton">emoji</button>
                <input v-model="messageInput" @keydown="sendMessage" type="text" id="message-input" placeholder="Type a message...">
            </div>
            <div id="emoji-list" style="display: none;" @click="chooseEmoji" ref="emojiList">
                <span class="emoji">&#128150;</span>
                <span class="emoji">&#128169;</span>
                <span class="emoji">&#128578;</span>
                <span class="emoji">&#129315;</span>
                <span class="emoji">&#128078;</span>
                <!-- add more emoji here -->
            </div>
        </div>
        <div id="user-list">
            <h3>Online Members</h3>
            <ul id="online-users" ref="onlineUsers">
                <li v-for="user in users" :key="user.id">{{ user }}</li>
            </ul>
        </div>
    </div>

    <!-- Default Modal -->
    <div id="myModal" v-if="!logedIn" ref="myModal">
        <div id="modal-content">
            <h2>Join the Chat Room</h2>
            <input v-model="username" type="text" id="username-input" placeholder="Enter your username">
            <button @click="joinChat" class="button-custom">Join</button>
            <button @click="leaveRoom" class="button-custom">Return</button>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
export default {
    data() {
        return {
            messageInput : "",
            stompClient : null,
            username : '',
            users : [],
            logedIn : false,
            connection: 'http://localhost:8080/ws',
            stomp: null,
            emojiList: null
        }
    },
    methods: {
        async updateOnlineUsers() {
            try {
                const response = await axios.get("http://localhost:8080/online-users");
                this.users = response.data;
            } catch (error) {
                console.error('Error:', error);
            }
        },
        joinChat() {
            console.log(this.username);
            console.log(this.username === '')
            if (this.username == '' || this.username.trim() == '') {
                alert("please put valid(non-empty) username");
            }
            else {
                this.logedIn = !this.logedIn;

                console.log("Start Connection");
                const socket = new SockJS(this.connection);
                this.stompClient = Stomp.over(socket);
                this.stompClient.connect({}, this.onConnected, this.onError);
            }
        },
        onConnected() {
            //subscribe to the public topic
            this.stompClient.subscribe('/topic/public',this.onMessageReceived);
            
            this.stompClient.send('/app/chatroom.addUser',
                {},
                JSON.stringify({sender:this.username,type:'JOIN'})
            );

            this.updateOnlineUsers();
        },
        onErrored() {
            alert("cannot connect to the server")
        },
        onMessageReceived(payload) {
            const message = JSON.parse(payload.body);

            if (message.type === 'JOIN' || message.type === 'LEAVE') {
                this.updateOnlineUsers();
            } else {
                const messageElement = document.createElement('div');
                messageElement.className = 'message';
                messageElement.innerHTML = `
                    <span class="username">${message.sender}:</span>
                    <span class="message-text">${message.messageBody}</span>
                `;

            
            const messageBox = document.getElementById('message-box');
            messageBox.appendChild(messageElement);
            }
        },
        sendMessage(event) {
            if (event.key === 'Enter') {
                //const messageBody = this.messageInput;

                if (this.messageInput.trim() !== '' && this.stompClient !== null) {
                    const message = {
                        sender: this.username,
                        messageBody: this.messageInput,
                        type: 'CHAT',
                    };

                    this.stompClient.send('/app/chatroom.sendMessage', {}, JSON.stringify(message));
                    this.messageInput = '';
                }
            }
        },
        leaveRoom() {
            if (this.stompClient !== null) {
                this.stompClient.disconnect(() => {
                    console.log('Disconnected from the server');
                });
            }
            this.$router.push('./main');
        },
        openEmojiList() {
            this.emojiList.style.display = this.emojiList.style.display === 'none' ? 'block' : 'none';
        },
        chooseEmoji(event) {
            if (event.target.classList.contains('emoji')) {
                const emoji = event.target.textContent;
                this.messageInput += emoji;
                this.emojiList.style.display = 'none';
            }
        }
    },
    mounted() {
        // Open the join modal
        this.$refs.myModal.style.display = 'flex';
        this.emojiList = this.$refs.emojiList;
    }
}
</script>

<style scoped>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}
#container {
    display: flex;
    height: 100vh;
}
#chat-box {
    flex: 2;
    display: flex;
    flex-direction: column;
    padding: 20px;
}
#message-box {
    flex-grow: 1;
    overflow-y: scroll;
    border: 1px solid #ccc;
    padding: 10px;
}
#user-list {
    flex: 1;
    padding: 20px;
    border-left: 1px solid #ccc;
}
/* Input Styles */
#message-input {
    flex: 1;
}
#input-container {
    display: flex;
    align-items: center;
}
.actions {
    display: none;
    margin-top: 5px;
}
.message:hover .actions {
    display: block;
}
/* Modal and Overlay Styles */
#myModal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent white background */
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
}
#modal-content {
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 80%; /* Modal width takes up 80% */
}
.button-div {
    padding: 20px;
}
.button-custom {
    margin-left: 10px;
}
</style>

<style>
/* Message Styles */
.message {
    margin-bottom: 10px;
    padding: 5px;
    border: 1px solid #ccc;
    background-color: #f0f0f0;
    cursor: pointer;
}
</style>