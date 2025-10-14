import { Stack } from "expo-router";
import React, { Suspense, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { BottomNav } from "../components/bottomNav";
import HeaderCard from "../components/headerCard";
import { Colors } from "../constants/Colors";


// database stuff
import migrations from '@/drizzle/migrations';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import * as SQLite from 'expo-sqlite';
import { SQLiteProvider } from 'expo-sqlite';
export const DATABASE_NAME ='tasks';
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";


// contexts
import { AddModal } from "@/components/modal/addModal";
import { modalContext, ModalContextType } from "@/context/modalContext";

export default function RootLayout()  {

  const expo = SQLite.openDatabaseSync(DATABASE_NAME);
  const db = drizzle(expo);
  const { success, error } = useMigrations(db, migrations)
  useDrizzleStudio(expo);

  // console.log("Success: ", success);
  // console.log("Error: ", error);

  // useEffect(() => {
  //   if(success) {
  //     addDummyData(db);
  //   }
  // }, [success])

  const theme = Colors;

  // this is getting stuck in this state, might want to just use a context to get this over with cause damnn
  const [modalOpen, setModalOpen] = useState(false);
  const modalState: ModalContextType = [modalOpen, setModalOpen];

  // console.log("Modal state:", modalOpen);
  return (
      <modalContext.Provider value={[modalOpen, setModalOpen]}>
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
                        justifyContent:'center',
                       
                      },
                    }}>         
                  </Stack>
                  <AddModal/>
                <BottomNav/>
            </View>
          
          </SQLiteProvider>
        </Suspense>
   </modalContext.Provider>
)
}

const styles = StyleSheet.create({

  container: {
    flex: 1, 
    backgroundColor: Colors.background,
  }
})


