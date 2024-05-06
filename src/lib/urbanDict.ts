const url = 'https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '738d4e213fmshc977d95b197e61ap107a5ejsn6241768f87be',
		'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
	}
};
export const fetchWord = async (word: string) => {
    try {
        const response = await fetch(url.concat(word), options);
        const result = await response.text().then(d=>JSON.parse(d));
        return result.list[Math.floor(Math.random() * result.list.length)].definition;
        
    } catch (error) {
        console.error(error);
    }
    
}
