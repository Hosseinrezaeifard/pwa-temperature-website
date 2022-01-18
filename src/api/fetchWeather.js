import axios from "axios";

const URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'a2f04ef5df82e2a1643f47cca7f6b185'

export const fetchWeather = async (query) => {
    const {data} = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY,
        }
    })
    return data;
}