import TaskCard from "@/components/taskCard";
import { Colors } from "@/constants/Colors";
import { useRefresh } from "@/context/refreshContext";
import * as schema from "@/db/schema";
import { Todo } from "@/db/schema";
import { eq } from 'drizzle-orm';
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function TaskScreen() {
    const { taskGroupId } = useLocalSearchParams<{ taskGroupId: string }>();
    const [tasks, setTasks] = useState<Todo[]>([]);
    const [groupName, setGroupName] = useState<string | null>(null);
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

    const loadGroup = useCallback(async () => {
        if (!taskGroupId) return;
        try {
            const rows = await drizzleDb
                .select()
                .from(schema.task_groups)
                .where(eq(schema.task_groups.id, parseInt(taskGroupId)));
            if (rows && rows.length > 0) setGroupName(rows[0].name);
            else setGroupName(null);
        } catch (error) {
            console.error('Error loading task group:', error);
        }
    }, [drizzleDb, taskGroupId]);

    useEffect(() => {
        loadTasks();
        loadGroup();
    }, [loadTasks, refreshKey]);

    // Refresh when screen comes into focus
    useFocusEffect(
        useCallback(() => {
            loadTasks();
            loadGroup();
        }, [loadTasks])
    );

    const toggleComplete = useCallback(async (id: number, currentCompleted: number) => {
        try {
            const newVal = currentCompleted === 1 ? 0 : 1;
            await drizzleDb.update(schema.todos).set({ completed: newVal }).where(eq(schema.todos.id, id));
            await loadTasks();
        } catch (error) {
            console.error('Error toggling completion:', error);
        }
    }, [drizzleDb, loadTasks]);

    return(
        <ScrollView style = {styles.container}> 
            {groupName && (
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>{groupName}</Text>
                </View>
            )}
            {tasks.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No tasks yet. Create one to get started!</Text>
                </View>
                ) : (
                tasks.map((task) => (
                    <TaskCard key={task.id} taskObj={task} onToggle={() => toggleComplete(task.id as number, task.completed)} />
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

    headerContainer: {
        paddingTop: 20,
        paddingBottom: 12,
        paddingHorizontal: 16,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.black,
    },

    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.textlight,
    },

 
})