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

const { QuickDB } = require('quick.db');
const db = new QuickDB({
    filePath: "Database.sqlite"
});
module.exports = db

client
    .login(process.env.TOKEN || client.config.token)
    .then(() => {
        loadEvents(client);
    })
    .catch(err => {
        switch(err.message){
            case "An invalid token was provided." : {
                return console.log("Le token saisi est invalide ou introuvable !")
            }break;
            case "Privileged intent provided is not enaled or whitelisted." : {
                return console.log("Vous devez sélectionner les intentions 'Guild_Members' dans votre discord developer portal !")
            }break;
            default : {
                return console.log("Une erreur inattendue est survenue ! Veuillez contacter le support pour obtenir de l'aide." + "\n\n" + err.stack)
            }break;
        }
    })

process.on('unhandledRejection', async error => {
    console.log(error.stack)
})

process.on('uncaughtException', async error => {
    console.log(error.stack)
})
