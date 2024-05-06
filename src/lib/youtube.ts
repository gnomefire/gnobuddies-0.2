import {Masterchat, stringify}  from "masterchat";

const mc= await Masterchat.init("YzcQt8FB6Vc")

mc.on("chat", (chat) => {
    console.log(chat.authorName, stringify(chat.message))
})
mc.listen()