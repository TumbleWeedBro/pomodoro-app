import { Colors } from "@/constants/Colors";
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AgendaTaskCardProps {
    title: string;
    subtitle: string;
    date?: string; // expected format: YYYY-MM-DD
    onDelete?: () => void;
}

const AgendaTaskCard = ({ title, subtitle, date, onDelete }: AgendaTaskCardProps) => {
    let day = '';
    let month = '';

    if (date) {
        const parts = date.split('-');
        const localDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        day = localDate.getDate().toString();
        month = localDate.toLocaleString('default', { month: 'short' });
    } else {
        const now = new Date();
        day = now.getDate().toString();
        month = now.toLocaleString('default', { month: 'short' });
    }
    return(

    <View style = {styles.container}>
        <View style = {styles.groupContainer}>
            <View style = {styles.iconContainer}>
                <Text style = { styles.dateText}>{day}</Text>
                <Text style = { styles.dateText}>{month}</Text>
            </View>

            <View style = {styles.textContainer}> 
                <Text style = {styles.taskTitle} >{title}</Text>
                <Text style = {styles.taskSubTitle}>{subtitle}</Text>
            </View>

        </View>

            <TouchableOpacity 
                style={styles.chartContainer}
                onPress={() => onDelete && onDelete()}
                accessibilityLabel="Delete task"
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