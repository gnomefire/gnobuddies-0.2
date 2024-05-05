
import * as dotenv from 'dotenv'
export const weatherData = async (city: string) => {
    dotenv.config()
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.VITE_OPENWEATHER_API_KEY}`).then(res=>res.json())
    return response
}
