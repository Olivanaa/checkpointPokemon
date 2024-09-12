import { PokemonType } from "@/models/pokemon.interface";
import axios, { AxiosResponse } from "axios";

const client = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon?limit=10'

})

const responseBody = (response: AxiosResponse) => response.data.results

const requests = {
    get: (path: string) => client.get(path).then(responseBody)
}

export const Pokemon = {
    getPokemon: (): Promise<PokemonType[]> => requests.get(`pokemon`),
    getAPokemon: (name: string): Promise<PokemonType> => requests.get(`pokemon/${name}`),
}