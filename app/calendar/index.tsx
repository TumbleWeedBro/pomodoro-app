import AgendaTaskCard from "@/components/calendar/agendaTaskCard";
import CalendarTimeline from "@/components/calendar/calendar";
import { Colors } from "@/constants/Colors";
import * as schema from "@/db/schema";
import useModal from "@/hooks/useModalContext";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { eq } from 'drizzle-orm';
import { useSQLiteContext } from "expo-sqlite";
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View, Alert } from "react-native"; // Added Alert

export default function CalendarScreen() {
    const db = useSQLiteContext();
    const drizzleDb = useMemo(() => drizzle(db, { schema }), [db]);
    const { openWithDate } = useModal();

    // Get all tasks
    const { data: allTasks } = useLiveQuery(
        drizzleDb.select().from(schema.todos)
    );

    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [tapCount, setTapCount] = useState(0);

    // Group tasks by date
    const tasksByDate = useMemo(() => {
        const grouped: Record<string, typeof allTasks> = {};
        allTasks.forEach(task => {
            if (task.due_date) {
                if (!grouped[task.due_date]) {
                    grouped[task.due_date] = [];
                }
                grouped[task.due_date].push(task);
            }
        });
        return grouped;
    }, [allTasks]);

    // Moved handleDeleteTask OUT of handleDatePress
    const handleDeleteTask = async (taskId: number) => {
        Alert.alert(
            'Delete Task',
            'Are you sure you want to delete this task?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await drizzleDb
                                .delete(schema.todos)
                                .where(eq(schema.todos.id, taskId));
                        } catch (error) {
                            console.error('Failed to delete task', error);
                            Alert.alert('Error', 'Failed to delete task.');
                        }
                    }
                }
            ],
            { cancelable: true }
        );
    };

    const handleDatePress = (dateString: string) => {
        if (selectedDate === dateString) {
            // Same date tapped again → increment counter
            const newCount = tapCount + 1;
            setTapCount(newCount);

            if (newCount === 2) {
                // double-tap detected, open modal with selected date
                const dateParts = dateString.split('-');
                // Create date object treating the string as local time (Year, MonthIndex, Day)
                const localDate = new Date(
                    parseInt(dateParts[0]), 
                    parseInt(dateParts[1]) - 1, 
                    parseInt(dateParts[2])
                );
                
                openWithDate(localDate);
                setTapCount(0); // Reset tap count after action
            }
        } else {
            // Different date selected → reset
            setSelectedDate(dateString);
            setTapCount(1); // first tap
        }
    };

    const selectedDateTasks = selectedDate ? tasksByDate[selectedDate] : [];

    return (
        <View style={styles.container}>
            <CalendarTimeline onDatePress={handleDatePress} tasksByDate={tasksByDate} />

            {selectedDate && selectedDateTasks && selectedDateTasks.length > 0 ? (
                selectedDateTasks.map(task => (
                    <AgendaTaskCard
                        key={task.id.toString()}
                        title={task.title}
                        subtitle={task.priority ? `Priority ${task.priority}` : 'No Priority'}
                        date={task.due_date}
                        onDelete={() => handleDeleteTask(task.id)} // Added onDelete prop back
                    />
                ))
            ) : (
                <View style={styles.taskTextContainer}>
                    <Text style={styles.taskText}>No tasks for this day</Text>
                    {selectedDate && (
                        <Text style={{ color: Colors.text, marginTop: 10 }}>Double tap date to add task</Text>
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 40,
    },
    taskText: {
        fontSize: 30,
        color: Colors.surface
    },
    taskTextContainer: {
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Colors.surface,
        marginTop: 20
    }
});