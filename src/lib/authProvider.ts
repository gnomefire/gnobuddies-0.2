import { RefreshingAuthProvider } from '@twurple/auth';
import prisma from './prisma';

export let authProvider : RefreshingAuthProvider;
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
        where: { clientId: process.env.VITE_TWITCH_CLIENT_ID_1 },
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
    const tokenData = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresIn: 0,
        obtainmentTimestamp: 0,
        scope: ['chat:edit', 'chat:read'],
        
    }
    authProvider = new RefreshingAuthProvider(
        {
            clientId: clientId,
            clientSecret: clientSecret,
            
           
            },
            
        
    )
    authProvider.addUser('534184808', {accessToken: accessToken, refreshToken: refreshToken, scope: ['chat:edit', 'chat:read']})
    authProvider.addIntentsToUser('534184808', ['chat'])
    const scopes =authProvider.getIntentsForUser('534184808')
    console.log(scopes)
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
    return authProvider;

}).catch((error) => {
    console.error('Error while initializing Twitch client:', error);
});
    
