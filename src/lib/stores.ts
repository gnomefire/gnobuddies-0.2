import { derived, writable } from 'svelte/store';
import { type Message, type User, type Image } from '@prisma/client';
import {io } from 'socket.io-client';
import {TextureLoader} from 'three';
const socket = io('http://localhost:3000', {transports: ['websocket']});

export const messages = writable<Message[]>([])
socket.on('chat message', (data) => {

    messages.update(($messages) => [...$messages, data])
})
export const users = writable<User[]>([])

export const createFakeUsers = () => {

    for(let i = 0; i < 10; i++) {

        users.update((users) => [...users, {
            id: i.toString(),
            name: `User ${i}`,
            displayName: `User ${i}`,
            profileImageUrl: `https://picsum.photos/id/${i*10}/50`,
            chatColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            message: `Message ${i}`,
            createdAt: new Date(),  
    

            
        }])
    }
}
export const aiImages = writable<{ alt: string, src: string, title: string}[]>([])
socket.on('image url', (data) => {

    aiImages.update(($aiImages) => [...$aiImages, {alt: "AI", src: data, title: "AI"}])
})

    

export const menuOpen = writable(false)
export const showScene = writable(false)
export const showChat = writable(false)