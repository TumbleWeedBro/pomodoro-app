import { CreateModal } from "@/components/modal/modal";
import useModal from "@/hooks/useModalContext";
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/Colors";
import TaskGroupDropdown from "../dropdowns/taskGroupDrop";
import DateTimePicker from "@react-native-community/datetimepicker"
import { CreateTaskContext, CreateTaskContextType } from '@/context/createTaskGroupContext';


export const AddModal = () => {

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false); 
    const [CreateTaskGroup ,setCreateTaskGroup] = useState(false)
    const createTaskGroupState: CreateTaskContextType = [CreateTaskGroup ,setCreateTaskGroup]

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

    const { close } = useModal();
    return (
           <CreateTaskContext.Provider value={[CreateTaskGroup ,setCreateTaskGroup]}>
            <CreateModal isOpen={useModal().modalOpen} withInput>
                <View style={styles.modalContainer}>
                    <TaskGroupDropdown/>
                    <View style = {styles.inputContainer}>
                        {showPicker && (
                            <DateTimePicker
                                mode="date"
                                display="spinner"
                                value={date}
                                onChange={onChange}
                            />
                        )}
                        {!CreateTaskGroup &&(
                            <TouchableOpacity onPress = {toggleDatePicker}>
                                <View style={styles.dateContainer}>
                                    <Text style = {{fontSize: 20, padding: 10}}>{date.toLocaleDateString()}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        <TextInput
                        placeholder='Task title'
                            style = {styles.taskTitle} />

                    </View>
                    
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style= {{padding:0, margin:0}} onPress={() =>close()}>
                                <Ionicons name="close-circle-outline" size={40} color={Colors.primary} />
                        </TouchableOpacity>

                        <TouchableOpacity style= {{padding:0, margin:0}} onPress={() =>close()}>
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

})