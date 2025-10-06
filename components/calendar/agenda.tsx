import { StyleSheet, View, Text, TouchableOpacity, TextInput} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "@/constants/Colors";
import { useState } from 'react';

interface NewTaskCardProps {
  date: string;
  onSave: (title: string, subtitle: string) => void; // function type
  onCancel: () => void; // function with no arguments
}


const Agenda = ({date, onSave, onCancel}: NewTaskCardProps) => {

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');

    return(

    <View style = {styles.container}>
        <View style = {styles.groupContainer}>
            <View style = {styles.iconContainer}>
                <Text style = { styles.dateText}>14</Text>
                <Text style = { styles.dateText}>Jan</Text>
            </View>

            <View style = {styles.textContainer}> 
                <TextInput
                placeholder='Task title'
                value={title}
                onChangeText={setTitle}
                 style = {styles.taskTitle} />
                <TextInput
                placeholder='Task Subtitle'
                value={subtitle}
                onChangeText={setSubtitle}  style = {styles.taskSubTitle}/>
            </View>

        </View>

            <TouchableOpacity 
                style={styles.chartContainer}
                onPress={() => onSave(title, subtitle)}>
                <Ionicons name="trash-outline" size={30} color={Colors.primary} />
            </TouchableOpacity>

    </View>

    )

}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        width: '95%',
        height: 70,
        borderRadius:20,
        backgroundColor: Colors.surface,
        marginLeft:10,

        // justifyContent: 'space-between'
    },

    groupContainer:{
        backgroundColor: Colors.surface,
        flexDirection: 'row',
        width:"100%",
        flex:1,
        gap: 3,
        marginLeft: 10,
        borderRadius:10,
        
    },

    iconContainer: {
        backgroundColor: Colors.background,
        width:"20%",
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },

    textContainer: {
        width:"80%",
        margin:2,
        
    },

    dateText: {
        fontSize: 25,
        fontWeight:'bold',
        color: Colors.surface
    },

    chartContainer: {
        // backgroundColor: Colors.primary,
        width: "10%",
        alignItems: 'center',
        justifyContent: 'center',
    },

    taskTitle: {
        fontSize: 25,
        fontWeight: '600',
        color: Colors.text,
        padding:0,
        margin:0,
        marginTop:2
    },

    taskSubTitle: {
        fontSize: 18,
        fontWeight: '400',
        color: Colors.text,
        padding:0,
        margin:0,
        marginTop:1
    },

})

export default Agenda