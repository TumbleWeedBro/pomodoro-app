import { Stack } from "expo-router";
import { Colors } from "../constants/Colors";


export default function RootLayout()  {

  const theme = Colors
  return <Stack 
    screenOptions= {{
      headerShown:false,
      
      contentStyle: {
        backgroundColor: theme.background,
      },
    }}> 
    <Stack.Screen name ='index' options= {{ title: 'Home'}} />
  </Stack>;
}


