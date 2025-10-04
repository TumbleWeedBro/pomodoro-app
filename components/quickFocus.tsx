import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Dimensions} from 'react-native';
import { Colors } from "../constants/Colors";

export default function QuickFocus () {
    const [active, setActive] = useState(false)

    const handlePress = () => {
        setActive(!active);
    };
    return(
        <View style={styles.container} >
            <View style={styles.clockContainer}>
                <Text style = {styles.timerText}> 25:00</Text>

                <Pressable 
                    onPress={ handlePress }
                    style={({ pressed}) => [
                        styles.button,
                        { backgroundColor: active? Colors.background : Colors.primary }
                    ]}
                >
                    <Text style = {[
                        styles.buttonText,
                        active && {color: Colors.surface}]}>
                        {active? "Stop": "Start"}
                    </Text>
                </Pressable>

            </View>

            <View style={styles.quotesContainer}>
                 <Text style = {styles.quotesText}>Your future is decided by what you do today, not tomorrow.</Text>  
                 <Text style = {styles.quotesText}> ~Some Wise Man</Text>     
                 {/* <View style = {styles.iconContainer}>
                    <Ionicons name="refresh-circle-outline" size={40} color={Colors.primary} />
                 </View> */}
                 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        flexDirection:"row",
        // backgroundColor: Colors.surface,
        width: '100%',
        height: 150,
        gap:10,
    },

    clockContainer:{
        position:'relative',
        backgroundColor: Colors.surface,
        width:'35%',
        flex: 1,
        borderRadius: 30,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },

    quotesContainer: {
        position:'relative',
        paddingLeft:5,
        backgroundColor: Colors.surface,
        width:'55%',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent:'center'
    },

    quotesText: {
        position: 'relative',
        fontSize: 20,
    },

    // iconContainer: {
    //     position: "absolute",
    //     top:115,
    //     bottom:0,
    //     left:170,
    //     right: 0
    // },

    timerText: {
        fontSize: 55,
        fontWeight: '900',
        color: Colors.background
    },

    button: {
        backgroundColor: Colors.primary,
        width: '80%',
        height: 50,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center'

    },

    buttonText: {
        fontSize: 20, 
        fontWeight: 'bold',
        color: Colors.background,
    }
})