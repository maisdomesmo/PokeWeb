import axios from 'axios'

const type = axios.create({
    baseURL : "https://pokeapi.co/api/v2/type/"
})

export default type