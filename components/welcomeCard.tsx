import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions} from 'react-native';
import { ProgressChart } from "react-native-chart-kit";
import { Colors } from "../constants/Colors";

export default function WelcomeCard () {
    const screenWidth = Dimensions.get("window").width;
    const cardWidth = screenWidth * 0.85;
    const chartWidth = screenWidth * 0.45; 
    
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0,
        // something is diming the graph here
        color: (opacity = 1) => `rgba(255, 13, 13, ${opacity})`, 
        useShadowColorFromDataset: false 
    };
    
    const data = {
        labels: ["Swim"],
        data: [0.87]
    };

    return(
        <View style = {styles.cardContainer}> 

            <View style = {styles.textContainer}>
                <Text style = {styles.text}>Your task today is almost done! Keep going</Text>
                <TouchableOpacity style={styles.button} activeOpacity={0.9}>
                    <Text style={styles.buttontext}>View Task</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.chartContainer}>
                <ProgressChart
                    data ={data}
                    width= {chartWidth} 
                    height={180} 
                    strokeWidth={20}
                    radius={70} 
                    chartConfig={chartConfig}
                    hideLegend = {true}
                />

                <View style={styles.progressTextContainer}>
                    <Text style={styles.progressText}>87%</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    cardContainer: {
        flexDirection:'row',
        paddingVertical:2,
        paddingLeft:13,
        width: '100%' ,
        height: 170,
        backgroundColor: Colors.surface,
        borderRadius:30,    
        overflow: 'hidden', 
        gap:1
    },

    textContainer: {
        // backgroundColor: Colors.primary,
        flex: 1, 
        // flexWrap: 'wrap', 
        justifyContent: 'space-around', 
        height: '100%', 
    },
    
    chartContainer: {
        // backgroundColor: "#008000",
        width: "45%",
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        maxWidth:'90%',
        fontSize: 25
    },
    buttontext: {
        maxWidth:'80%',
        fontSize: 23,
        fontWeight: 'semibold',
        color: Colors.textlight
    },

    button: {
        maxWidth: "90%",
        backgroundColor: Colors.background,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },

    progressTextContainer: {
        position: 'absolute',
        top: 14,
        left: 5,
        right: 0,
        bottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },

    progressText: {
        fontSize: 50, 
        fontWeight: '900',
        color: Colors.background
    }
});