import { CreateModal } from "@/components/modal/modal";
import useModal from "@/hooks/useModalContext";
import { Ionicons } from '@expo/vector-icons';
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/Colors";
import TaskGroupDropdown from "../dropdowns/taskGroupDrop";

export const AddModal = () => {

    const { close } = useModal();
    return (
        
        <CreateModal isOpen={useModal().modalOpen} withInput>
            <View style={styles.modalContainer}>
                <TaskGroupDropdown/>
                <View style = {styles.inputContainer}>
                    <TextInput
                    placeholder='Task title'
                        style = {styles.taskTitle} />
                    <TouchableOpacity onPress={() =>close()}>
                        <Ionicons name="close-circle-outline" size={40} color={Colors.background} />
                    </TouchableOpacity>
                </View>
            </View>
        </CreateModal>
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
        height: '50%'
    }

})