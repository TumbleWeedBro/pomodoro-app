import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import React, {useState} from 'react';
import { Colors } from "@/constants/Colors";
import { Ionicons } from '@expo/vector-icons';
import TaskCard from "@/components/taskCard";




export default function TaskScreen() {

    return(
        <View style = {styles.container}> 
            <TaskCard task="Study Chapter 4"/>
            <TaskCard task="Study Chapter 4"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
    },

    taskCard: {
        width: "100%",
        height:50, 
        backgroundColor: Colors.background,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.black, 
    },

    taskTitle: {
        fontSize: 25,
        fontWeight: '600',
        color: Colors.textlight,
    },
})