import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import CalendarTimeline  from "@/components/calendar/calendar";
import Agenda  from "@/components/calendar/agenda";
import React, {useState} from 'react';
import AgendaTaskCard from "@/components/calendar/agendaTaskCard";
import { Colors } from "@/constants/Colors";
// import {Agenda} from "react-native-calendars"


export default function CalendarScreen() {
 
    const [tapCount, setTapCount] = useState(0);
    const [tasksByDate, setTasksByDate] = useState<Record<string, Task[]>>({});
    const [selectedDate, setSelectedDate] = useState<string | null>("");
    const [showNewTask, setShowNewTask] = useState(false);

      type Task = {
      id: string;
      title: string;
      subtitle: string;
    };

    const handleDatePress = (dateString: string) => {
        if (selectedDate === dateString) {
        // Same date tapped again → increment counter
        const newCount = tapCount + 1;
        setTapCount(newCount);

        if (newCount === 2) {
            setShowNewTask(true); // double-tap detected
            setTapCount(0);     // reset counter
        }
        } else {
        // Different date selected → reset
        setSelectedDate(dateString);
        setTapCount(1);       // first tap
        setShowNewTask(false);  // hide tasks until double-tap
        }
    };

    const saveTask = (title:string, subtitle:string) => {
    if (selectedDate && title) {
        if (tasksByDate[selectedDate]) {
            tasksByDate[selectedDate].push({id: Date.now().toString(), title, subtitle}); // push onto existing array
        } else {
            tasksByDate[selectedDate] = [{id: Date.now().toString(), title, subtitle}]; // create a new array for this date
        }
    }
    }

    return(

        <View style ={styles.container} >
            <CalendarTimeline onDatePress={handleDatePress} tasksByDate={tasksByDate}/>
            {showNewTask && selectedDate && (
                <Agenda
                date = {selectedDate}
                onSave = {(title, subtitle)=>{
                    console.log("New task for", selectedDate, title, subtitle);
                    setShowNewTask(false);
                    saveTask(title, subtitle);
                }}
                onCancel={() => setShowNewTask(false)}/>
            )}
            
            {selectedDate && tasksByDate[selectedDate]?.length > 0 ? (
                tasksByDate[selectedDate].map(task =>(
                    <AgendaTaskCard
                    key={task.id}
                    title={task.title}
                    subtitle={task.subtitle}/>
                ))
            ) : (<View style = {styles.taskTextContainer}><Text style = {styles.taskText}>No tasks for this day</Text></View>)}
        </View>
    )
}

const styles =  StyleSheet.create({

    container: {
        flex:1,
        gap:40,

    },

    taskText: {
        fontSize: 30,
        color: Colors.surface
    },

    taskTextContainer: {
        height: 80,
        // backgroundColor: Colors.surface,
        alignItems:'center',
        justifyContent:'center',
        borderWidth: 2,       
        borderColor: Colors.surface
        
    }
})


