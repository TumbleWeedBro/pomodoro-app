import { Colors } from "@/constants/Colors";
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import type { Todo } from "@/db/schema";

type TaskCardProp = {
    taskObj: Todo,
    onToggle: () => void,
}

const TaskCard = ({taskObj, onToggle}:TaskCardProp) => {
    const completed = taskObj.completed === 1;
    return(
        <View style = {styles.taskCard}>
            <TouchableOpacity onPress={onToggle}>
                <Ionicons name={completed ? "checkmark-circle" : "ellipse-outline"} size={36} color={completed ? Colors.primary : Colors.surface} />
            </TouchableOpacity>
            <Text style = {[styles.taskTitle, completed && styles.completedTitle]} numberOfLines={1}>{taskObj.title}</Text>
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

    completedTitle: {
        textDecorationLine: 'line-through',
        color: '#9e9e9e',
    },
})


export default TaskCard