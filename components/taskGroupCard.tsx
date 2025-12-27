import { StyleSheet, View, Text, Pressable, Dimensions, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ProgressChart } from "react-native-chart-kit";
import { Colors } from "../constants/Colors";
import {useState, useEffect, useCallback} from "react";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { eq, count } from 'drizzle-orm';
import {Todo} from "@/db/schema";
import { useRefresh } from "@/context/refreshContext";
import { EditTaskGroupModal } from "./modal/editTaskGroupModal";
import * as schema from "@/db/schema";

type TaskGroupProp = {
    id: number
    name: string
    onPress?: () => void;
    onLongPress?: () => void;
}

export default function TaskGroupCard ({id, name, onPress, onLongPress}: TaskGroupProp) {

    const screenWidth = Dimensions.get("window").width;
    const cardWidth = screenWidth * 0.85;
    const chartWidth = screenWidth * 0.45; 
    
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0,
        // something is diming the graph here
        color: (opacity = 1) => `rgba(0, 71, 171, ${opacity})`, 
        useShadowColorFromDataset: false 
    };

    const Chartdata = {
        labels: ["Swim"],
        data: [0.32]
    };

    // data
      const [data, setData] = useState<Todo[]>([]);
      const [taskCount, setTaskCount] = useState(0)
      const [showEditModal, setShowEditModal] = useState(false);
      const db = useSQLiteContext();
      const drizzleDb = drizzle(db, {schema});
      const { refreshKey, triggerRefresh } = useRefresh();
    
      const loadTasks = useCallback(async () => {
        try {
          const taskData = await drizzleDb
            .select()
            .from(schema.todos)
            .where(eq(schema.todos.task_group_id, id));
          setData(taskData);

          const result = await drizzleDb
            .select({count: count()})
            .from(schema.todos)
            .where(eq(schema.todos.task_group_id, id));
          const value = result[0]?.count ?? 0;
          setTaskCount(value);
        } catch (error) {
          console.error('Error loading tasks:', error);
        }
      }, [drizzleDb, id]);

      // Load on mount, when id changes, and when refreshKey changes
      useEffect(() => {
        loadTasks();
      }, [loadTasks, refreshKey]);

    const handleLongPress = () => {
        if (onLongPress) {
            onLongPress();
            return;
        }
        
        Alert.alert(
            name,
            "Choose an action",
            [
                {
                    text: "Edit",
                    onPress: () => setShowEditModal(true),
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => handleDelete(),
                },
                {
                    text: "Cancel",
                    style: "cancel",
                },
            ],
            { cancelable: true }
        );
    };

    const handleDelete = () => {
        Alert.alert(
            "Delete Task Group",
            `Are you sure you want to delete "${name}"? This will also delete all tasks in this group.`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            // Delete all tasks in this group first
                            await drizzleDb
                                .delete(schema.todos)
                                .where(eq(schema.todos.task_group_id, id));
                            
                            // Then delete the task group
                            await drizzleDb
                                .delete(schema.task_groups)
                                .where(eq(schema.task_groups.id, id));
                            
                            triggerRefresh();
                        } catch (error) {
                            console.error('Error deleting task group:', error);
                            Alert.alert('Error', 'Failed to delete task group. Please try again.');
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };
    

    return(
    <>
    <Pressable 
        style = {styles.container}
        onPress={onPress}
        onLongPress={handleLongPress}
        delayLongPress={500}
    >
        <View style = {styles.groupContainer}>
            <View style = {styles.iconContainer}>
                <Ionicons name="book-outline" size={40} color={Colors.surface} />
            </View>

            <View style = {styles.textContainer}> 

                <Text style = {styles.taskTitle} >{name}</Text>  
                <Text  style = {styles.taskSubTitle}>{taskCount} Tasks</Text>

            </View>

        </View>

            <View style={styles.chartContainer}>
                <ProgressChart
                    data ={Chartdata}
                    width= {chartWidth} 
                    height={100} 
                    strokeWidth={8}
                    radius={25} 
                    chartConfig={chartConfig}
                    hideLegend = {true}
                />

                <View style={styles.progressTextContainer}>
                    <Text style={styles.progressText}>32%</Text>
                </View>
            </View>

    </Pressable>
    <EditTaskGroupModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        taskGroupId={id}
        currentName={name}
    />
    </>
    )

}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        width: '100%',
        height: 70,
        borderRadius:10,
        backgroundColor: Colors.surface,
        // justifyContent: 'space-between'
    },

    groupContainer:{
        flexDirection: 'row',
        width:"100%",
        flex:1,
        padding:2,
        gap: 3
    },

    iconContainer: {
        backgroundColor: Colors.blue,
        borderRadius: 10,
        width:"30%",
        flex:1,
        margin:8,
        alignItems:'center',
        justifyContent:'center'
    },

    textContainer: {
        width:"70%",
    },

    chartContainer: {
        width: "30%",
        alignItems: 'center',
        justifyContent: 'center',
    },

    taskTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.text,
    },

    taskSubTitle: {
        fontSize: 20,
        fontWeight: '400',
        color: Colors.text,
    },

    progressTextContainer: {
    position: 'absolute',
    top: 14,
    left: 4,
    right: 0,
    bottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    },

progressText: {
    fontSize: 19, 
    fontWeight: '900',
    color: Colors.background
}
})