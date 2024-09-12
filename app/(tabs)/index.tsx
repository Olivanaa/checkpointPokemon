import { Image, StyleSheet, ScrollView, View, Text, SafeAreaView, TextInput, Button, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Pokemon } from '@/api/AxiosComponent';
import { PokemonType, ImageType } from '@/models/pokemon.interface';

export default function HomeScreen() {

  const [pokemons, setPokemons] = useState<PokemonType[]>([])
  const [pokemon, setPokemon] = useState<ImageType | null>(null)
  const [nome, setNome] = useState('')
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!isSearching) {
      fetchPokemon()
    }
  }, [isSearching])

  async function fetchPokemon() {
    const response = await Pokemon.getPokemon()
    setPokemons(response)
  }

  async function getAPokemon(name: string) {
    try {
      const response = await Pokemon.getAPokemon(name)
      const pokemon = {
        name: name,
        ...response
    }
    setPokemon(pokemon)
    setIsSearching(true)
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('404')) {
          Alert.alert(
            'Pokémon não encontrado',
            `Não foi possível encontrar um Pokémon com o nome "${name}". Verifique o nome e tente novamente.`
          );
        } else {
          Alert.alert(
            'Erro',
            'Ocorreu um erro ao buscar o Pokémon. Tente novamente mais tarde.'
          );
        }
      } else {
        Alert.alert(
          'Erro',
          'Ocorreu um erro inesperado. Tente novamente mais tarde.'
        );
      }
      console.log(error);
    }
  }

  function clearSearch(){
    setIsSearching(false)
    setNome('')
  }

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Nome do Pokemón"
          value={nome}
          onChangeText={(text) => setNome(text)}
        />
        <Button title="Catch 'Em All" onPress={() => getAPokemon(nome)} />
      </View>
      <ScrollView>
        {isSearching && pokemon ? (
          <View style={styles.pokemonContainer}>
            <Text style={styles.pokemonName}>{pokemon.name}</Text>
            <Image
              style={styles.pokemonImage}
              source={{ uri: pokemon?.front_default }}
            />
            <Text style={styles.pokemonDetail}>Altura: {pokemon.height / 10} m</Text>
            <Text style={styles.pokemonDetail}>Peso: {pokemon.weight / 10} kg</Text>
            <Button title="Voltar à lista" onPress={clearSearch} /> 
          </View>
        ) : (
          pokemons?.map((pokemon) => (
            <View key={pokemon.name} style={styles.postContainer}>
              <Text style={styles.pokemonName}>{pokemon.name}</Text>
            </View>
          ))

        )}
      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
  },
  searchContainer: {
      flexDirection: 'row',
      margin: 16,
      alignItems: 'center',
      justifyContent: 'space-between',
  },
  textInput: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 8,
      marginRight: 10,
      borderWidth: 1,
      borderColor: '#ddd',
  },
  postContainer: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      marginHorizontal: 16,
      marginVertical: 8,
      borderWidth: 1,
      borderColor: '#ddd',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 2,
  },
  pokemonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      marginHorizontal: 16,
      marginVertical: 8,
      backgroundColor: '#fff',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd',
  },
  pokemonName: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 12,
      color: '#4a4a4a',
      textTransform: 'capitalize',
  },
  pokemonImage: {
      width: 250,
      height: 250,
      resizeMode: 'contain',
  },
  pokemonDetail: {
      fontSize: 18,
      marginBottom: 8,
      color: '#555',
  },
});
