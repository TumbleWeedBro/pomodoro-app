import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import React, {useState} from 'react';
import { Colors } from "@/constants/Colors";
import { Ionicons } from '@expo/vector-icons';
import { DimensionValue } from "@/constants/Dimensions";

type TaskCardProp = {
    task:string
}

const TaskCard = ({task}:TaskCardProp) => {
    return(
        <View style = {styles.taskCard}>
            <TouchableOpacity>
                <Ionicons name="ellipse-outline" size={40} color={Colors.surface} />
            </TouchableOpacity>
            <Text style = {styles.taskTitle}>{task}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    taskCard: {
        width: "100%",
        height:60, 
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
        fontSize: 20 ,
        fontWeight: '600',
        color: Colors.textlight,
        overflow: 'hidden',
    },
})


export default TaskCard