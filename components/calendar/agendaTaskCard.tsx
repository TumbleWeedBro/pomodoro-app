import { StyleSheet, View, Text, TouchableOpacity, TextInput} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "@/constants/Colors";

interface AgendaTaskCardProps {
    key: string;
    title: string;
    subtitle: string;
}



const AgendaTaskCard = ({key, title, subtitle}: AgendaTaskCardProps) => {
    return(

    <View style = {styles.container}>
        <View style = {styles.groupContainer}>
            <View style = {styles.iconContainer}>
                <Text style = { styles.dateText}>14</Text>
                <Text style = { styles.dateText}>Jan</Text>
            </View>

            <View style = {styles.textContainer}> 
                <Text style = {styles.taskTitle} >{title}</Text>
                <Text style = {styles.taskSubTitle}>{subtitle}</Text>
            </View>

        </View>

            <TouchableOpacity 
                style={styles.chartContainer}
                // onPress={() => onSave(title, subtitle)}
                >
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

export default AgendaTaskCard