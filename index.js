const { Client, Partials, Collection, GatewayIntentBits, ChannelType } = require("discord.js");
const { DirectMessages, MessageContent, DirectMessageTyping, Guilds } = GatewayIntentBits;
const { User, Message, Channel} = Partials;
const config = require('./config.json')
const { loadEvents } = require('./handler/eventHandler')

const client = new Client({
    intents: [DirectMessages, MessageContent, DirectMessageTyping, Guilds],
    partials: [User, Message, Channel],
});

client.commands = new Collection();
client.config = require("./config.json");

client
    .login(process.env.TOKEN || client.config.token)
    .then(() => {
        loadEvents(client);
    })
    .catch(err => {
        switch(err.message){
            case "An invalid token was provided." : {
                return console.log("The token entered is invalid or not found !")
            }break;
            case "Privileged intent provided is not enaled or whitelisted." : {
                return console.log("You need to select 'Guild_Members' intents in your discord developer portal !")
            }break;
            default : {
                return console.log("An unexpected error occurred ! Please contact support for assistance." + "\n\n" + err.stack)
            }break;
        }
    })

process.on('unhandledRejection', async error => {
    console.log(error.stack)
})

process.on('uncaughtException', async error => {
    console.log(error.stack)
})
