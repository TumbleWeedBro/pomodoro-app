import { CreateModal } from "@/components/modal/modal";
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useMemo } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { Colors } from "../../constants/Colors";
import { useSQLiteContext } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as schema from '@/db/schema';
import { task_groups } from '@/db/schema';
import { useRefresh } from '@/context/refreshContext';
import { eq } from 'drizzle-orm';

interface EditTaskGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    taskGroupId: number;
    currentName: string;
}

export const EditTaskGroupModal: React.FC<EditTaskGroupModalProps> = ({ 
    isOpen, 
    onClose, 
    taskGroupId,
    currentName 
}) => {
    const [newName, setNewName] = useState(currentName);
    const db = useSQLiteContext();
    const drizzleDb = useMemo(() => drizzle(db, { schema }), [db]);
    const { triggerRefresh } = useRefresh();

    React.useEffect(() => {
        if (isOpen) {
            setNewName(currentName);
        }
    }, [isOpen, currentName]);

    const handleSave = async () => {
        if (!newName.trim()) {
            Alert.alert('Error', 'Please enter a task group name');
            return;
        }

        if (newName.trim() === currentName) {
            onClose();
            return;
        }

        try {
            await drizzleDb
                .update(task_groups)
                .set({ name: newName.trim() })
                .where(eq(task_groups.id, taskGroupId));

            triggerRefresh();
            onClose();
        } catch (error) {
            console.error('Error updating task group:', error);
            Alert.alert('Error', 'Failed to update task group. Please try again.');
        }
    };

    return (
        <CreateModal isOpen={isOpen} withInput>
            <View style={styles.modalContainer}>
                <Text style={styles.title}>Edit Task Group</Text>
                <TextInput
                    placeholder='Task group name'
                    style={styles.input}
                    value={newName}
                    onChangeText={setNewName}
                    autoFocus
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Ionicons name="close-circle-outline" size={40} color={Colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Ionicons name="checkmark-circle-outline" size={40} color={Colors.green} />
                    </TouchableOpacity>
                </View>
            </View>
        </CreateModal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        backgroundColor: Colors.surface,
        alignSelf: 'center',
        height: 200,
        width: '80%',
        top: 300,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 20,
    },
    input: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.text,
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.black,
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 20,
    },
    button: {
        padding: 0,
        margin: 0,
    },
});

