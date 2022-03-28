import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image,ScrollView,Button,TouchableNativeFeedback, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();



const HomeScreen = ({ navigation }) => {
  const selectPokemons = [...Array(parseInt(450)).keys()].map(i=>
    <TouchableOpacity onPress={() => navigation.navigate('About', { id : i })}>
      <SelectPokemon id = {i} navigation = {navigation}/>
    </TouchableOpacity>);
  return(<ScrollView>  {selectPokemons}  </ScrollView>)
};



const SelectPokemon = ({ id }) =>{  
  const [imageURL, setImageURL] = useState('');
      useEffect(() => fetch('https://pokeapi.co/api/v2/pokemon/'+id)
               .then(response => response.json())
               .then(data => data['sprites']['other']['official-artwork']['front_default'])
               .then(url => setImageURL(url)));
      return (<Image source={{uri: imageURL}} style={{width: 100, height: 100}}/>);
}

const AboutComp = ({ navigation, route }) => {
  const [imageURL, setImageURL] = useState('');
      useEffect(() => fetch('https://pokeapi.co/api/v2/pokemon/'+route.params.id)
               .then(response => response.json())
               .then(data => data['sprites']['front_default'])
               .then(url => setImageURL(url)));
      return (<View>
                <Image source={{uri: imageURL}} style={{width: 400, height: 400}}/>
                <Button title="Go back" onPress={() => navigation.goBack()} />
              </View>);
};
const EvolutionComp = ({ navigation, route }) =>{  }
const AllImageComp = ({ navigation, route }) =>{  }
const SearchComp = ({ navigation, route }) =>{  }



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator options={{gestureEnabled: 'true'}}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Select A Pokemon' }}/>
        <Stack.Screen name="About" component={AboutComp} />
        <Stack.Screen name="Evolution" component={EvolutionComp} />
        <Stack.Screen name="Search" component={SearchComp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
