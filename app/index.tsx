import { Text, View, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import WelcomeCard from "../components/welcomeCard";
import QuickFocus from "../components/quickFocus";
import TaskCard from "../components/taskCard";
import { Colors } from "../constants/Colors";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useEffect, useState } from "react";
import {Todo, TaskGroup} from "@/db/schema"
import * as schema from "@/db/schema"




export default function HomeScreen() {

  const [data, setData] = useState<Todo[]>([])

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, {schema})


  useEffect(() => {
    const load = async () => {
      const data = await drizzleDb.query.todos.findMany();
      console.log("data: ", data)
      setData(data)
    };

    load();
  }, []);

  return (
    <View style = {{flex: 1, padding: 0, justifyContent:'center' }}>
      
        <ScrollView 
          style={styles.container}
          contentContainerStyle = {{
            gap:15,
            paddingVertical:20,
            paddingHorizontal:5
          }}>
          <WelcomeCard />
          <Text style = {styles.text}>Quick Focus</Text>
          <QuickFocus />
          <Text style = {styles.text}>Task Groups</Text>
          {/* probably some loop to display task groups here */}
          <TaskCard/>
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
