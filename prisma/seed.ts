import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const tokenData = [
  {
    clientid :process.env.VITE_TWITCH_CLIENT_ID_1,
    clientSecret: process.env.VITE_TWITCH_CLIENT_SECRET_1,
    accesstoken : process.env.VITE_TWITCH_ACCESS_TOKEN_1,
    refreshToken: process.env.VITE_TWITCH_REFRESH_TOKEN_1,
    
  }
]
const tokenData2 = [
  {
    clientid :process.env.VITE_TWITCH_CLIENT_ID_2,
    clientSecret: process.env.VITE_TWITCH_CLIENT_SECRET_2,
    accesstoken : process.env.VITE_TWITCH_ACCESS_TOKEN_2,
    refreshToken: process.env.VITE_TWITCH_REFRESH_TOKEN_2,
  }
]
async function main() {
  tokenData.forEach(async (token) => {
    await prisma.token.create(
      {
        data: {
          clientId: token.clientid,
          clientSecret: token.clientSecret,
          accessToken: token.accesstoken,
          refreshToken: token.refreshToken,
        }
      }
    )
  })
  tokenData2.forEach(async (token) => {
    await prisma.token.create(
      {
        data: {
          clientId: token.clientid,
          clientSecret: token.clientSecret,
          accessToken: token.accesstoken,
          refreshToken: token.refreshToken,
        }
      }
    ) 
  })
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
