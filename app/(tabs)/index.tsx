import { Image, StyleSheet, Platform, ScrollView, TouchableHighlight, View, Text, SafeAreaView, TextInput, Button } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect, useState } from 'react';
import { Pokemon } from '@/api/AxiosComponent';
import { PokemonType } from '@/models/pokemon.interface';

export default function HomeScreen() {

  const [pokemons, setPokemons] = useState<PokemonType[]>([])
  const [nome, setNome] = useState()

  useEffect(()=>{
    fetchPokemon()
  }, [])

  async function fetchPokemon() {
    const response = await Pokemon.getPokemon()
    setPokemons(response)
    console.log(response);
  }

  async function getAPokemon(name: string) {
    const response = await Pokemon.getAPokemon(name)
    let list = []
    list.push(response)
    setPokemons(list)
  }
  return (
    
    <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.textInput}
            placeholder='Nome '
            onChangeText={() => setNome(nome)}
          />
          <Button title='Buscar' onPress={() => getAPokemon(nome)}/>
        </View>
        <Button title='Buscar Posts' onPress={() => fetchPokemon()}/>
        <ScrollView>
          { pokemons?.map((pokemon) => {
            return (
              
                <View style={styles.postContainer}>
                  <Text style={styles.title}>{pokemon.name}</Text>
                  <Text style={styles.userId}>{pokemon.url}</Text>
                </View>
            )
          }) }
        </ScrollView>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }, 
  searchContainer: {
    margin: 8,
    flexDirection: 'row'
  },
  textInput: {
    flex: 3
  },
  button: {
    flex: 1
  },
  postContainer: {
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    margin: 10
  },
  title: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold'
  },
  userId: {
    textAlign: 'right',
    color: '#babaca'
  }
});
