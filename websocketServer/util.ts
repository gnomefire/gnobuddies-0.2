import prisma from "../src/lib/prisma"
import * as apiKick from 'api-kick'
export const getAllUsers = async () => {
    const users = await prisma.user.findMany().then((data) => data.map((user) => user))
    return users
}
export const kickConnect = async () => {
    await apiKick.getUser('phr3d13').then((data) => console.log(data))
}
await kickConnect().then(() => console.log('connected'))