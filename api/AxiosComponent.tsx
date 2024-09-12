import { PokemonType, ImageType } from "@/models/pokemon.interface";
import axios, { AxiosResponse } from "axios";

const client = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/'
})


const responseBody = (response: AxiosResponse) => response.data


const requests = {
    get: (path: string) => client.get(path).then(responseBody)
}


export const Pokemon = {
    getPokemon: (): Promise<PokemonType[]> => requests.get(`pokemon`).then(data => data.results),
    getAPokemon: (name: string): Promise<ImageType> => requests.get(`pokemon/${name}`).then(data => ({
        front_default: data.sprites.front_default,
        height: data.height,
        weight: data.weight
    })),
}