import { Stack } from "expo-router";
import { Colors } from "../constants/Colors";
import BottomNav from "../components/bottomNav";
import HeaderCard  from "../components/headerCard";
import { View, StyleSheet } from "react-native";

export default function RootLayout()  {

  const theme = Colors
  return (
  <View style= {styles.container}>
    <HeaderCard name="Mike" />
      <Stack 
        screenOptions= {{
          headerShown:false,
          
          contentStyle: {
            backgroundColor: theme.background,
          },
        }}>         
      </Stack>
      <BottomNav/>
  </View>
)
}

const styles = StyleSheet.create({

  container: {
    flex: 1, 
    backgroundColor: Colors.background,
  }
})


