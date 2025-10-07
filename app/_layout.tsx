import { Stack } from "expo-router";
import { Colors } from "../constants/Colors";
import BottomNav from "../components/bottomNav";
import HeaderCard  from "../components/headerCard";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Suspense, useEffect } from "react";

// database stuff
import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '@/drizzle/migrations';
import { addDummyData } from "@/db/addDummyData";

export const DATABASE_NAME ='tasks';

export default function RootLayout()  {

  const expo = SQLite.openDatabaseSync(DATABASE_NAME);
  const db = drizzle(expo);
  const { success, error } = useMigrations(db, migrations)

  console.log("Success: ", success);
  console.log("Error: ", error);

  useEffect(() => {
    if(success) {
      addDummyData(db);
    }
  }, [success])


  const theme = Colors
  return (
  <Suspense fallback = {<ActivityIndicator size="large"/>}>
    <SQLiteProvider 
      databaseName={DATABASE_NAME}
      options={{ enableChangeListener: true}}
      useSuspense>
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
    </SQLiteProvider>
  </Suspense>
)
}

const styles = StyleSheet.create({

  container: {
    flex: 1, 
    backgroundColor: Colors.background,
  }
})


