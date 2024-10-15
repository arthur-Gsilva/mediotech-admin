import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://agendasenacapi-production.up.railway.app'
})