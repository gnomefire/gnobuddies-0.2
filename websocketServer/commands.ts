import { createBotCommand } from '@twurple/easy-bot';
import {queryAi, imagine} from "../src/lib/twitchClient";
export const commands : Array<unknown> = [
    [
        [
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
    ]
]
export default commands