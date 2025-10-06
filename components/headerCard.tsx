import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../constants/Colors";

type CardProp = {
  name:string
}

export default function HeaderCard({name} : CardProp){
  return (
    <View style = {styles.cardContainer}>

      <View style={{flexDirection:'row', alignItems:'center', gap:20}}>
        <Image
          style = {styles.image}
          source={require('../assets/img/profile.png')}
          resizeMode="cover" 
          />
          <View style={{margin:0}} >
            <Text style = {styles.text} >Welcome Back!</Text>
            <Text style = {styles.nameText}>{name}</Text>
          </View>
      </View>
          <View >
            <Ionicons name="notifications-outline" size={45} color={Colors.icon} />
          </View>

    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: '5%',
    marginBottom: '2%',
    gap: 10
  },

  image :{
    height:100,
    width:100,
    borderRadius:50,
    marginTop:0
  },

  nameText: {
    color: Colors.title,
    fontSize: 45,
    fontWeight:'bold'
  },

  text: {
    color: Colors.textlight,
    fontSize: 25,
  }
})
