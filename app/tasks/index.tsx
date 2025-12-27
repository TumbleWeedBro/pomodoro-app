import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button} from "react-native";
import React, {useState, useEffect, useCallback} from 'react';
import { Colors } from "@/constants/Colors";
import TaskCard from "@/components/taskCard";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { eq } from 'drizzle-orm';
import { useLocalSearchParams, useFocusEffect } from 'expo-router';
import { Todo } from "@/db/schema";
import { useRefresh } from "@/context/refreshContext";
import * as schema from "@/db/schema";

export default function TaskScreen() {
    const { taskGroupId } = useLocalSearchParams<{ taskGroupId: string }>();
    const [tasks, setTasks] = useState<Todo[]>([]);
    const db = useSQLiteContext();
    const drizzleDb = drizzle(db, {schema});
    const { refreshKey } = useRefresh();

    const loadTasks = useCallback(async () => {
        if (!taskGroupId) return;
        
        try {
            const taskData = await drizzleDb
                .select()
                .from(schema.todos)
                .where(eq(schema.todos.task_group_id, parseInt(taskGroupId)));
            setTasks(taskData);
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    }, [drizzleDb, taskGroupId]);

    useEffect(() => {
        loadTasks();
    }, [loadTasks, refreshKey]);

    // Refresh when screen comes into focus
    useFocusEffect(
        useCallback(() => {
            loadTasks();
        }, [loadTasks])
    );

    return(
        <ScrollView style = {styles.container}> 
            {tasks.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No tasks yet. Create one to get started!</Text>
                </View>
            ) : (
                tasks.map((task) => (
                    <TaskCard key={task.id} task={task.title} />
                ))
            )}
        </ScrollView>
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