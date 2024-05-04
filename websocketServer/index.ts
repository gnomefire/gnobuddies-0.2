import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import {Bot, createBotCommand } from '@twurple/easy-bot';
import { ApiClient } from '@twurple/api';
import {fetchAndParseEmotes} from './../src/lib/emoteFetch';
import { RefreshingAuthProvider } from '@twurple/auth';
import prisma from '../src/lib/prisma';
import { type Message, type User } from  '@prisma/client';
import { VITE_TWITCH_CLIENT_ID_2 } from './../.svelte-kit/ambient.d';
import { onMessage } from '../kickchat-client/src/handlers/onMessage';

export let bot: Bot;
export let api: ApiClient;






const aiPort = 5500
const port = 3000
const app = express()
const server = createServer(app)
const queryAi  = async (query: string)=>{
    const data = await fetch(`http://localhost:${aiPort}/?text=${query}`).then((res)=>res.text())
    return data
}
const imagine = async (query: string)=>{
    const formData = new FormData()
    formData.append('prompt', query)
    const data = await fetch(`http://localhost:${aiPort}/generateimage`, {method: 'POST' , body: formData}).then((res)=>res.text())
    return data
}

const io = new Server(server, {
    cors:{
        origin: '*',


    }}
)
io.on('connection', (socket) => {
  socket.emit('eventFromServer', 'Hello, World')
})

io.on('connection', (socket) => {
  socket.on('eventFromClient', (data) => {
    console.log(data)
    socket.emit('eventFromServer', data)
  })
})
// SvelteKit should handle everything else using Express middleware
// https://github.com/sveltejs/kit/tree/master/packages/adapter-node#custom-server


server.listen(port)
console.log(`Listening on http://localhost:${port}`)

Promise.all([
    prisma.token.findFirst({
        where: { clientId: process.env.VITE_TWITCH_CLIENT_ID_1 },
        select: { accessToken: true }
    }),
    prisma.token.findFirst({
        where: { clientId: process.env.VITE_TWITCH_CLIENT_ID_1 },
        select: { refreshToken: true }
    }),
    prisma.token.findFirst({
        where: { clientId: process.env.VITE_TWITCH_CLIENT_ID_1},
        select: { clientId: true }
    }),
    prisma.token.findFirst({
        where: { clientId: process.env.VITE_TWITCH_CLIENT_ID_1 },
        select: { clientSecret: true }
    })
]).then(([accessTokenData, refreshTokenData, clientIdData, clientSecretData]) => {
    if (!accessTokenData || !clientIdData || !clientSecretData) {
        console.error('Could not find all required config data in database.');
        return;
    }
    const accessToken = accessTokenData.accessToken;
    const refreshToken = refreshTokenData?.refreshToken;
    const clientId = clientIdData.clientId;
    const clientSecret = clientSecretData.clientSecret;


    const authProvider = new RefreshingAuthProvider(
        {
            clientId: clientId,
            clientSecret: clientSecret,
            appImpliedScopes: ['chat:edit', 'chat:read', 'moderator:read:followers'],

            },




    )
    authProvider.addUser('534184808', {accessToken: accessToken?.toString(), refreshToken: refreshToken?.toString(), scope: ['chat:edit', 'chat:read']})
    authProvider.addIntentsToUser('534184808', ['chat', 'moderator'])

    authProvider.onRefresh(async (clientId, newTokenData) => {
        await prisma.token.upsert({
            where: { clientId: clientId.toString() },
            update: {
                accessToken: newTokenData.accessToken.toString(),
                refreshToken: newTokenData.refreshToken?.toString(),
                expiresIn: Number(newTokenData.expiresIn),
                obtainmentTimestamp: newTokenData.obtainmentTimestamp,
            },
            create: {
                clientId: clientId.toString(),
                clientSecret: clientSecret.toString(),
                accessToken: newTokenData.accessToken.toString(),
                refreshToken: newTokenData.refreshToken?.toString(),
                expiresIn: Number(newTokenData.expiresIn),
                obtainmentTimestamp: newTokenData.obtainmentTimestamp,
            }
        }).catch((error) => {
            console.error('Error while updating token in database:', error);
        })
    })

    bot = new Bot({
        authProvider: authProvider,
        channels: ['gn0mefire'],
        commands: [
            createBotCommand(
                 'ai',
                 (params)=>{
                     queryAi(params.toString()).then((data)=>bot.say('gn0mefire',data))
                 }

            ),
            createBotCommand('imagine',async  (params, {say, userDisplayName, userId}) => {

                say(`Sure thing, ${userDisplayName}! Just give me a moment while I generate an image of ${params.join(' ')}.`)
                const res = await  imagine(params.toString()).then((data) => data)
                if (res.startsWith("Error")) {
                    say(res)
                }
                else{
                    const imageData = JSON.parse(res)
                    if (imageData.images) {
                        say(`Here are ${imageData.images.length} images for you, ${userDisplayName}. I hope you like them!`)
                        for (const image of imageData.images) {
                            say(image.url)
                            io.emit('image url', image.url)
                            await prisma.image.create({
                                data: {
                                    url: image.url,
                                    prompt: params.join(' '),

                                    userId: userId
                                }
                            }).then((data) => {
                                console.log(data)
                            })
                        }

                    }


                }




                }

            ),
            createBotCommand('loadImages', async (params, {say, userDisplayName, userId}) => {
                const images = await prisma.image.findMany({
                    where: {
                        userId: userId
                    },
                    take: 4,
                }).then((data) => data)
                say(`Here are ${images.length} images I generated for you, ${userDisplayName}. I hope you like them!`)
                for (const image of images) {
                    say(image.url)
                    io.emit('image url', image.url)
                }
            })

        ]
    })
    bot.join('gn0mefire').then(async() => {
        console.log('Joined the channel')
        const users = await prisma.user.findMany().then((data) => data.map((user) => user))

    })
    api = new ApiClient({ authProvider: authProvider })


    bot.onMessage(async (e)=>{



        const chatColor = await api.chat.getColorForUser(e.userId).then((color) => {
            return color
        })
        console.log(chatColor)
        const profileImage = await api.users.getUserByName(e.userDisplayName).then((user) => {
            return user?.profilePictureUrl
        })
        console.log(profileImage)

        const parsedMessage = await fetchAndParseEmotes(e.text).then( async (msg) => {
            return msg})

                prisma.user.upsert({
                    where: { id: e.userId.toString() },
                    update: {
                        message:  parsedMessage.toString() ,
                        name: e.userDisplayName,
                        chatColor: chatColor?.toString(),
                    },

                create: {
                    id: e.userId.toString(),
                    name: e.userDisplayName,
                    displayName: e.userDisplayName,
                    profileImageUrl: profileImage,
                    chatColor: chatColor?.toString(),
                    message:  parsedMessage.toString() ,



                }

            }).then(async (user) => {
                io.emit('user created', user)
                console.log('User added to database')
                await prisma.message.create({
                    data: {

                        authorId: e.userId,
                        content: parsedMessage.toString(),



                    }

                }).then((data) => {
            io.emit('chat message', data)
            console.log('Message added to database')
                })
        })
      })



})


