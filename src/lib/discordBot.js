import {Client, Events, GatewayIntentBits, SlashCommandBuilder} from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const token = process.env.VITE_DISCORD_BOT_TOKEN

const client = new Client({
    intents: [
        [GatewayIntentBits.Guilds]
    ]
})

client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`)
})

client.login(token)

const ping = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!')
    

