const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
export const translate = async (text: String, language: String = 'autodetect', target : String) => {
    if(language == 'autodetect') {
       text= await detectLanguage(text).then(res=>res);
    }
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': '738d4e213fmshc977d95b197e61ap107a5ejsn6241768f87be',
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        body: new URLSearchParams({
            q: text,
            target : target || 'en',
        })
       
    };
    

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}
const detectLanguage = async (text: String) => {
    const response = 
}