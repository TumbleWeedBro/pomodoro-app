import { Text, View, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import WelcomeCard from "../components/welcomeCard";
import QuickFocus from "../components/quickFocus";
import TaskGroupCard from "../components/taskGroupCard";
import { Colors } from "../constants/Colors";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useEffect, useState, useCallback } from "react";
import { useRouter, useFocusEffect } from 'expo-router';
import { TaskGroup} from "@/db/schema";
import { useRefresh } from "@/context/refreshContext";
import * as schema from "@/db/schema";

export default function HomeScreen() {


  const router = useRouter();
  const [data, setData] = useState<TaskGroup[]>([]);
  const { refreshKey } = useRefresh();

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, {schema});

  const loadTaskGroups = useCallback(async () => {
    try {
      const taskGroups = await drizzleDb.query.task_groups.findMany();
      setData(taskGroups);
    } catch (error) {
      console.error('Error loading task groups:', error);
    }
  }, [drizzleDb]);

  useEffect(() => {
    loadTaskGroups();
  }, [loadTaskGroups, refreshKey]);

  // Refresh when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadTaskGroups();
    }, [loadTaskGroups])
  );

  return (
    <View style = {{flex: 1, padding: 0, justifyContent:'center' }}>
      
        <ScrollView 
          style={styles.container}
          contentContainerStyle = {{
            gap:15,
            paddingVertical:20,
            paddingHorizontal:5,
            paddingBottom:150,
          }}>
          <WelcomeCard />
          <Text style = {styles.text}>Quick Focus</Text>
          <QuickFocus />
          <Text style = {styles.text}>Task Groups</Text>
          {/* probably some loop to display task groups here */}
          {data.map((element, i) => (
            <TaskGroupCard
              key={element.id ?? i}
              id={element.id}
              name={element.name}
              onPress={() => router.push({ pathname: './tasks', params: { taskGroupId: element.id } })}
            />
          ))}
        </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
        flex: 1,
        padding:5,
        gap:20,
        
  },

  text: {
    fontSize: 35, 
    fontWeight: '900',
    color: Colors.title,
    marginLeft:10,
  }
})
