import { CreateModal } from "@/components/modal/modal";
import { CreateTaskContext, CreateTaskContextType } from '@/context/createTaskGroupContext';
import { useRefresh } from '@/context/refreshContext';
import * as schema from '@/db/schema';
import { task_groups, todos } from '@/db/schema';
import useModal from "@/hooks/useModalContext";
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from "@react-native-community/datetimepicker";
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useMemo, useRef, useState } from "react";
import { Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/Colors";
import TaskGroupDropdown from "../dropdowns/taskGroupDrop";


export const AddModal = () => {
    // All hooks must be called in the same order every render
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false); 
    const [CreateTaskGroup, setCreateTaskGroup] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [selectedTaskGroupId, setSelectedTaskGroupId] = useState<number | null>(null);
    const [priority, setPriority] = useState<number | null>(null);
    const [newTaskGroupName, setNewTaskGroupName] = useState('');
    const [newTaskGroupColor, setNewTaskGroupColor] = useState(Colors.primary);
    const refreshTaskGroupsRef = useRef<(() => Promise<void>) | null>(null);
    const { triggerRefresh } = useRefresh();
    const db = useSQLiteContext();
    const { close, modalOpen } = useModal();
    
    // Use useMemo to avoid recreating drizzle instance on every render
    const drizzleDb = useMemo(() => drizzle(db, { schema }), [db]);
    const createTaskGroupState: CreateTaskContextType = [CreateTaskGroup, setCreateTaskGroup];

    // Available colors for task groups
    const availableColors = [
        { name: 'Red', value: Colors.primary },
        { name: 'Blue', value: Colors.blue },
        { name: 'Green', value: Colors.green },
        { name: 'Yellow', value: Colors.yellow },
    ];

    const onChange = ({type}:any, selectedDate:any) => {
        if(type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate);
            setCreateTaskGroup(false);

            if (Platform.OS === "android"){
                toggleDatePicker();
            }
        }else {
            toggleDatePicker()
        }
    }
 

    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    };

    const handleCreateTaskGroup = async () => {
        if (!newTaskGroupName.trim()) {
            Alert.alert('Error', 'Please enter a task group name');
            return;
        }

        try {
            const dateCreated = new Date().toISOString();
            const result = await drizzleDb.insert(task_groups).values({
                name: newTaskGroupName.trim(),
                color: newTaskGroupColor,
                date_created: dateCreated,
            }).returning({ id: task_groups.id });

            const newTaskGroupId = result[0]?.id;
            if (newTaskGroupId) {
                // Refresh task groups in dropdown and wait for it to complete
                if (refreshTaskGroupsRef.current) {
                    await refreshTaskGroupsRef.current();
                }
                
                // Trigger global refresh
                triggerRefresh();
                
                // Small delay to ensure state updates
                await new Promise(resolve => setTimeout(resolve, 100));
                
                // Select the newly created task group
                setSelectedTaskGroupId(newTaskGroupId);
                setCreateTaskGroup(false);
                setNewTaskGroupName('');
                setNewTaskGroupColor(Colors.primary);
            }
        } catch (error) {
            console.error('Error creating task group:', error);
            Alert.alert('Error', 'Failed to create task group. Please try again.');
        }
    };

    const handleSaveTask = async () => {
        if (!taskTitle.trim()) {
            Alert.alert('Error', 'Please enter a task title');
            return;
        }

        if (!selectedTaskGroupId) {
            Alert.alert('Error', 'Please select a task group');
            return;
        }

        try {
            const dueDateString = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
            const dateCreated = new Date().toISOString();

            await drizzleDb.insert(todos).values({
                title: taskTitle.trim(),
                due_date: dueDateString,
                date_created: dateCreated,
                priority: priority,
                completed: 0,
                task_group_id: selectedTaskGroupId,
            });

            // Trigger global refresh to update all views
            triggerRefresh();

            // Reset form
            setTaskTitle('');
            setDate(new Date());
            setSelectedTaskGroupId(null);
            setPriority(null);
            setCreateTaskGroup(false);
            close();
        } catch (error) {
            console.error('Error saving task:', error);
            Alert.alert('Error', 'Failed to save task. Please try again.');
        }
    };

    return (
           <CreateTaskContext.Provider value={[CreateTaskGroup ,setCreateTaskGroup]}>
            <CreateModal isOpen={modalOpen} withInput>
                <View style={styles.modalContainer}>
                    <TaskGroupDropdown 
                        onTaskGroupSelect={setSelectedTaskGroupId}
                        onRefreshRef={refreshTaskGroupsRef}
                        selectedTaskGroupId={selectedTaskGroupId}
                    />
                    {CreateTaskGroup ? (
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Task Group Name</Text>
                            <TextInput
                                placeholder='Enter task group name'
                                style={styles.taskTitle}
                                value={newTaskGroupName}
                                onChangeText={setNewTaskGroupName}
                            />
                            <Text style={styles.label}>Choose Color</Text>
                            <View style={styles.colorContainer}>
                                {availableColors.map((color) => (
                                    <TouchableOpacity
                                        key={color.name}
                                        onPress={() => setNewTaskGroupColor(color.value)}
                                        style={[
                                            styles.colorOption,
                                            { backgroundColor: color.value },
                                            newTaskGroupColor === color.value && styles.colorOptionSelected
                                        ]}
                                    />
                                ))}
                            </View>
                        </View>
                    ) : (
                        <View style = {styles.inputContainer}>
                            {showPicker && (
                                <DateTimePicker
                                    mode="date"
                                    display="spinner"
                                    value={date}
                                    onChange={onChange}
                                />
                            )}
                            <TouchableOpacity onPress = {toggleDatePicker}>
                                <View style={styles.dateContainer}>
                                    <Text style = {{fontSize: 20, padding: 10}}>{date.toLocaleDateString()}</Text>
                                </View>
                            </TouchableOpacity>
                            <TextInput
                                placeholder='Task title'
                                style = {styles.taskTitle}
                                value={taskTitle}
                                onChangeText={setTaskTitle}
                            />
                        </View>
                    )}
                    
                    {!CreateTaskGroup && (
                        <View style={styles.priorityContainer}>
                            <TouchableOpacity onPress={() => setPriority(priority === 1 ? null : 1)}>
                                <Ionicons 
                                    name={priority === 1 ? "flag" : "flag-outline"} 
                                    size={30} 
                                    color={priority === 1 ? Colors.primary : Colors.primary} 
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setPriority(priority === 2 ? null : 2)}>
                                <Ionicons 
                                    name={priority === 2 ? "flag" : "flag-outline"} 
                                    size={30} 
                                    color={priority === 2 ? Colors.yellow : Colors.yellow} 
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setPriority(priority === 3 ? null : 3)}>
                                <Ionicons 
                                    name={priority === 3 ? "flag" : "flag-outline"} 
                                    size={30} 
                                    color={priority === 3 ? Colors.green : Colors.green} 
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                    
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style= {{padding:0, margin:0}} onPress={() => {
                            setTaskTitle('');
                            setDate(new Date());
                            setSelectedTaskGroupId(null);
                            setPriority(null);
                            setCreateTaskGroup(false);
                            setNewTaskGroupName('');
                            setNewTaskGroupColor(Colors.primary);
                            close();
                        }}>
                                <Ionicons name="close-circle-outline" size={40} color={Colors.primary} />
                        </TouchableOpacity>

                        <TouchableOpacity style= {{padding:0, margin:0}} onPress={CreateTaskGroup ? handleCreateTaskGroup : handleSaveTask}>
                                <Ionicons name="checkmark-circle-outline" size={40} color={Colors.green} />
                        </TouchableOpacity>
                    </View>
                </View>
            </CreateModal>
        </CreateTaskContext.Provider>
    )
}

const styles = StyleSheet.create({
       modalContainer :{
        position:'absolute',
        backgroundColor: Colors.surface,
        alignSelf:'center',
        height: 300,
        width: '80%',
        top: 300,
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center',
    },

    taskTitle: {
        fontSize: 25,
        fontWeight: '600',
        color: Colors.text,
        padding:0,
        margin:0,
        marginTop:2
    },

    inputContainer: {
        height: '40%',
        justifyContent: 'center',
        alignItems:'center'
        
    },

    dateContainer: {
        backgroundColor: Colors.surface,
        borderRadius: 15,
        marginHorizontal:10,
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Colors.black,
    },

    priorityContainer: {
        backgroundColor: Colors.surface,
        padding: 20,
        borderRadius: 15,
        marginHorizontal:10,
        marginTop: 10,
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Colors.black,
    },

    label: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 8,
        marginTop: 10,
    },

    colorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 10,
    },

    colorOption: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: Colors.black,
    },

    colorOptionSelected: {
        borderWidth: 4,
        borderColor: Colors.primary,
    },

})