import prisma from '$lib/prisma';
import type { Message } from '@prisma/client';
import type { LayoutServerLoad } from './$types';


export const load = (async () => {
    const messages : Message[] = await prisma .message.findMany().then((data) => data.map((message) => message))
    return {messages};
}) satisfies LayoutServerLoad;