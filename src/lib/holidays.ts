const options = {
    method: 'GET',
	headers: {
        'X-RapidAPI-Key': '738d4e213fmshc977d95b197e61ap107a5ejsn6241768f87be',
		'X-RapidAPI-Host': 'public-holiday.p.rapidapi.com'
	}
};
export const fetchHolidays = async (countryCode: string) => {
    const url = 'https://public-holiday.p.rapidapi.com/'+ new Date().getFullYear() + '/' + countryCode;
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        const data = JSON.parse(result);
        data.forEach((holiday: any) => {
            if(new Date(holiday.date) > new Date()) {
                console.log(holiday)
            }
        })
    } catch (error) {
        console.error(error);
    }
}

fetchHolidays('GB')