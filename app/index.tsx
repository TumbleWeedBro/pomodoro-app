import { Text, View, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import WelcomeCard from "../components/welcomeCard";
import QuickFocus from "../components/quickFocus";
import TaskCard from "../components/taskCard";
import { Colors } from "../constants/Colors";

export default function HomeScreen() {
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
