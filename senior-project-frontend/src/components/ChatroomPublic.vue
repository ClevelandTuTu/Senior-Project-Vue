<template>
    <div v-if="logedIn">
        <div class="button-div">
            <el-button @click="leaveRoom" type="primary">Leave Chatroom</el-button>
        </div>
        <div id="container">
            <el-col :span="18" id="chat-box">
                <div id="message-box">
                </div>
                <div id="input-container">
                    <el-popover
                        placement="bottom"
                        title="Emoji Repository"
                        :width="500"
                        trigger="click"
                    >
                        <template #reference>
                            <el-button class="m-2" size="large" type="primary">Emoji Repo</el-button>
                        </template>
                        <div id="emoji-list" @click="chooseEmoji" ref="emojiList" style="font-size: 3em">
                            <span class="emoji">&#128578;</span>
                            <span class="emoji">&#128512;</span>
                            <span class="emoji">&#129315;</span>
                            <span class="emoji">&#128517;</span>
                            <span class="emoji">&#128518;</span>
                            <span class="emoji">&#128519;</span>
                            <span class="emoji">&#128520;</span>
                            <span class="emoji">&#128521;</span>
                            <span class="emoji">&#128525;</span>
                            <span class="emoji">&#128526;</span>
                            <span class="emoji">&#128534;</span>
                            <span class="emoji">&#128538;</span>
                            <span class="emoji">&#128544;</span>
                            <span class="emoji">&#128545;</span>
                            <span class="emoji">&#128552;</span>
                            <span class="emoji">&#128557;</span>
                            <span class="emoji">&#128077;</span>
                            <span class="emoji">&#128078;</span>
                            <span class="emoji">&#128076;</span>
                            <span class="emoji">&#129311;</span>
                            <span class="emoji">&#128176;</span>
                            <span class="emoji">&#128178;</span>
                            <span class="emoji">&#128269;</span>
                            <span class="emoji">&#128150;</span>
                            <span class="emoji">&#128169;</span>
                            <span class="emoji">&#128163;</span>
                            <span class="emoji">&#128165;</span>
                            <span class="emoji">&#128166;</span>
                            <span class="emoji">&#128293;</span>
                            <span class="emoji">&#128299;</span>
                            <span class="emoji">&#9924;</span>
                            <span class="emoji">&#127747;</span>
                            <!-- add more emoji here -->
                        </div>
                    </el-popover>
                    <el-input v-model="messageInput" size="large" @keydown="sendMessage" type="text" id="message-input" placeholder="Type a message..." :style="{ 'font-size': '24px' }" />
                </div>
                
            </el-col>
            <el-col :span="6" id="user-list">
                <h3>Online Members</h3>
                <ul id="online-users" ref="onlineUsers">
                    <li v-for="user in users" :key="user.id">{{ user }}</li>
                </ul>
                <br>
                <hr>
                <div>
                    <el-text style='font-size: 25px;' type="primary">
                        Welcome to CWRU Chatroom!
                    </el-text>
                    <br>
                    <el-text style="font-size: 20px;" type="primary">
                        1. Respect Others: Show respect to other members of the chat, regardless of their views, beliefs, cultural background, or other factors. Avoid the use of offensive language or insulting remarks.
                    </el-text>
                    <br>
                    <el-text style="font-size: 20px;" type="primary">
                        2. No Discrimination: Discriminatory, racist, sexist, or otherwise unpleasant remarks are not allowed in the chat.
                    </el-text>
                    <br>
                    <el-text style="font-size: 20px;" type="primary">
                        3. Avoid Spamming: Refrain from sending excessive or repetitive messages to avoid disrupting others.
                    </el-text>
                    <br>
                    <el-text style="font-size: 20px;" type="primary">
                        4. No Posting Inappropriate Content: Posting explicit, violent, disturbing, or illegal content is prohibited. This includes images, links, and other media.
                    </el-text>
                    <br>
                    <el-text style="font-size: 20px;" type="primary">
                        5. Protect Personal Privacy: Do not share others' personal information, including addresses, phone numbers, or emails, in public chat.
                    </el-text>
                    <br>
                    <el-text style="font-size: 20px;" type="primary">
                        6. Use Emoticons and Symbols Judiciously: Exercise caution when using emoticons and symbols to ensure they are not misunderstood as offensive or inappropriate.
                    </el-text>
                    <br>
                    <el-text style="font-size: 20px;" type="primary">
                        7. Do Not Spread Rumors or False Information: Avoid spreading unverified information to prevent confusion or panic.
                    </el-text>
                </div>
            </el-col>
        </div>
    </div>

    <!-- Default Modal -->
    <!--
    <div id="myModal" v-if="!logedIn" ref="myModal">
        <div id="modal-content">
            <h2>Join the Chat Room</h2>
            <input v-model="username" type="text" id="username-input" placeholder="Enter your username">
            <button @click="joinChat" class="button-custom">Join</button>
            <button @click="leaveRoom" class="button-custom">Return</button>
        </div>
    </div>
    -->

    

    <div class="box-card" v-if="!logedIn" style="margin: 2%;">
        <el-text style='font-size: 60px;' type="primary">
            Welcome to CWRU Chatroom!
        </el-text>
        <br>
        <br>
        <el-text style="font-size: 30px;" type="info" tag="i">
            Before joining the chatroom, Read the following rules for our Chatroom
        </el-text>
        <br>
        <el-text style="font-size: 20px;" type="warning">
            1. Respect Others: Show respect to other members of the chat, regardless of their views, beliefs, cultural background, or other factors. Avoid the use of offensive language or insulting remarks.
        </el-text>
        <br>
        <el-text style="font-size: 20px;" type="warning">
            2. No Discrimination: Discriminatory, racist, sexist, or otherwise unpleasant remarks are not allowed in the chat.
        </el-text>
        <br>
        <el-text style="font-size: 20px;" type="warning">
            3. Avoid Spamming: Refrain from sending excessive or repetitive messages to avoid disrupting others.
        </el-text>
        <br>
        <el-text style="font-size: 20px;" type="warning">
            4. No Posting Inappropriate Content: Posting explicit, violent, disturbing, or illegal content is prohibited. This includes images, links, and other media.
        </el-text>
        <br>
        <el-text style="font-size: 20px;" type="warning">
            5. Protect Personal Privacy: Do not share others' personal information, including addresses, phone numbers, or emails, in public chat.
        </el-text>
        <br>
        <el-text style="font-size: 20px;" type="warning">
            6. Use Emoticons and Symbols Judiciously: Exercise caution when using emoticons and symbols to ensure they are not misunderstood as offensive or inappropriate.
        </el-text>
        <br>
        <el-text style="font-size: 20px;" type="warning">
            7. Do Not Spread Rumors or False Information: Avoid spreading unverified information to prevent confusion or panic.
        </el-text>
        <br>
        <br>
        <br>
        <hr>
        <!-- Form -->
        <div style="display: flex; align-items: center;">
            <el-checkbox v-model="checked" label="Agree with the rules" size="large" style="margin-right: 1%;" />
            <el-button type="primary" @click="dialogFormVisible = true" :disabled="!checked">
                Join Chatroom
            </el-button>
            <el-button type="warning" @click="leaveRoom">
                Leave Chatroom
            </el-button>
        </div>
    </div>

    <el-dialog v-model="dialogFormVisible" title="Join in Chatroom">
        <el-form :model="form">
        <el-form-item label="Set up a nickname" :label-width="formLabelWidth">
            <el-input v-model="username" autocomplete="off" placeholder="Other people will see your nickname, instead of your real name" />
        </el-form-item>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="joinChat">
            Confirm
            </el-button>
        </span>
        </template>
    </el-dialog>

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
            emojiList: null,
            dialogFormVisible: false,
            formLabelWidth: '140px',
            checked: false,
            emojiListOpen: false
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
            this.dialogFormVisible = false
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
            // Scroll to the bottom
            messageBox.scrollTop = messageBox.scrollHeight;
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
            this.$emit('leaveRoom');
        },
        openEmojiList() {
            this.emojiListOpen = !this.emojiListOpen;
        },
        chooseEmoji(event) {
            if (event.target.classList.contains('emoji')) {
                const emoji = event.target.textContent;
                this.messageInput += emoji;
                this.emojiListOpen = false;
            }
        }
    },
    mounted() {
        // Open the join modal
        //this.$refs.myModal.style.display = 'flex';
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
.box-card {
    width: auto;
    background-color: #fff;
    border-radius: 20px;
    border-color: rgb(82, 82, 228);
    border-width: 2px;
    border-style: solid; /* Set the border style to solid */
    padding: 2%;
    height: 100%;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
#container {
    display: flex;
    height: 94vh;
}
#chat-box {
    flex: 1;
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
    font-size: 24px;
}
</style>