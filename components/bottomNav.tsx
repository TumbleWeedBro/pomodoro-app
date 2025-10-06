import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions} from 'react-native';
import Svg, { Path } from 'react-native-svg'
import Animated from 'react-native-reanimated'
import { Colors } from "../constants/Colors";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Agenda = () => {
    const AnimatedSvg = Animated.createAnimatedComponent(Svg);
    const router = useRouter();

    return(

        <View style = {styles.container}>
            <View style = {styles.navbar}>

                <View style = { styles.animatedSvg}>
                <AnimatedSvg
                    width={110}
                    height={60}
                    viewBox="0 0 110 60"
                    // viewBox="10 0  110 70"
                    // style={[styles.animatedSvg]}
                >
                    <Path
                    fill= {Colors.background}
                    d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
                    />
                </AnimatedSvg>
                </View>
            </View>
                <View style = {styles.plusIcon}>
                    <Ionicons name="add-circle" size={75} color={Colors.primary} />
                </View>

                <TouchableOpacity style = {[ styles.navButton, {position:'absolute', bottom: '40%', left: '10%'}]}
                                    onPress= {()=> router.push('/')}>
                    <Ionicons name="home" size={40} color={Colors.accentDark} />
                </TouchableOpacity>

                <TouchableOpacity style = {[styles.navButton, { position:'absolute', bottom: '40%', left: '25%'}]}
                                    onPress={() => router.push('./calendar')}>
                        <Ionicons name="calendar-outline" size={40} color={Colors.surface} />
                </TouchableOpacity>

                <View style = {{ position:'absolute', bottom: '40%', right: '25%'}}>
                    <Ionicons name="stats-chart-outline" size={40} color={Colors.surface} />
                </View>

                <View style = {{ position:'absolute', bottom: '40%', right: '10%'}}>
                    <Ionicons name="person" size={40} color={Colors.accentDark} />
                </View>

        </View>
    )

}


const styles = StyleSheet.create({
    container:{
        position:'absolute',
        alignItems: 'center',
        width:'100%',
        height:90,
        bottom:5,
        left:0,
        right:0,
    },

    navbar: {
        backgroundColor: Colors.navBackground,
        width: '95%',
        height: '80%',
        borderRadius:30,
    },

    navButton: {

    },

    animatedSvg: {
       alignSelf: 'center',
    //    bottom: '10%'
       
    },

    plusIcon: {
        position: 'absolute',
        top: '-20%'    
    }
})

export default Agenda