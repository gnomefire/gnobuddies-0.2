import TwitchEmoticons from '@mkody/twitch-emoticons'
// eslint-disable-next-line @typescript-eslint/no-var-requires
import dotenv from 'dotenv'
dotenv.config()
const {EmoteFetcher, EmoteParser} = TwitchEmoticons

const clientId = process.env.VITE_TWITCH_CLIENT_ID_1
const clientSecret = process.env.VITE_TWITCH_CLIENT_SECRET_1
const channelId =  534184808
const fetcher = new EmoteFetcher( clientId, clientSecret);
const parser = new EmoteParser(fetcher, {
    // Custom HTML format
    template: '<img class="emote h-1 w-1" alt="{name}" src="{link}">',
    // Match without :colons:
    match: /(\w+)+?/g
});

export const fetchAndParseEmotes = (/** @type {string} */ message) => Promise.all([
    // Twitch global
    fetcher.fetchTwitchEmotes(),
    // Twitch channel
    fetcher.fetchTwitchEmotes(channelId),
    // BTTV global
    fetcher.fetchBTTVEmotes(),
    // BTTV channel
    fetcher.fetchBTTVEmotes(channelId),
    // 7TV global
    fetcher.fetchSevenTVEmotes(),
    // 7TV channel
    fetcher.fetchSevenTVEmotes(channelId),
    // FFZ global
    fetcher.fetchFFZEmotes(),
    // FFZ channel
    fetcher.fetchFFZEmotes(channelId)
]).then(() => {
    const parsedMessage = parser.parse(message);
    console.log(parsedMessage);
    
    return [parsedMessage];

});

export default fetchAndParseEmotes