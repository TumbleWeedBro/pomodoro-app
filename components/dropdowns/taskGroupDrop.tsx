import { Colors } from '@/constants/Colors';
import { CreateTaskContext } from '@/context/createTaskGroupContext';
import * as schema from '@/db/schema';
import { TaskGroup } from '@/db/schema';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

interface TaskGroupDropdownProps {
  onTaskGroupSelect?: (taskGroupId: number | null) => void;
}

const TaskGroupDropdown: React.FC<TaskGroupDropdownProps> = ({ onTaskGroupSelect }) => {
  // All hooks must be called in the same order every render
  const [isFocus, setIsFocus] = useState(false);
  const [taskGroup, setTaskGroup] = useState<number | null>(null);
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>([]);
  
  // Call all hooks unconditionally in consistent order
  const db = useSQLiteContext();
  const taskState = useContext(CreateTaskContext);
  
  // Use useMemo to avoid recreating drizzle instance on every render
  const drizzleDb = useMemo(() => drizzle(db, { schema }), [db]);

  // useEffect must always be called - no conditions
  useEffect(() => {
    const loadTaskGroups = async () => {
      try {
        const groups = await drizzleDb.query.task_groups.findMany();
        setTaskGroups(groups);
      } catch (error) {
        console.error('Error loading task groups:', error);
      }
    };
    loadTaskGroups();
  }, [drizzleDb]);

  // Helper functions that use the context (won't throw, just no-op if context not available)
  const setTaskGroupTrue = () => {
    if (taskState) {
      const [, setCreateTaskGroup] = taskState;
      setCreateTaskGroup(true);
    }
  };

  const setTaskGroupFalse = () => {
    if (taskState) {
      const [, setCreateTaskGroup] = taskState;
      setCreateTaskGroup(false);
    }
  };

  const onChangeTaskGroup = (item: any) => {
    if (item.value === 'CTG') {
      setTaskGroupTrue();
      setTaskGroup(null);
      onTaskGroupSelect?.(null);
      return;
    }

    const selectedId = item.value as number;
    setTaskGroup(selectedId);
    setIsFocus(false);
    setTaskGroupFalse();
    onTaskGroupSelect?.(selectedId);
  }

  const taskGroupOptions = [
    { value: 'CTG', label: 'Create Task Group' },
    ...taskGroups.map((group) => ({
      value: group.id,
      label: group.name,
    })),
  ];

  return (
    <View style={styles.container}>
        <View style={styles.dropdownContainer}>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={taskGroupOptions}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Choose or Create Task Group' : '...'}
            value={taskGroup}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={onChangeTaskGroup}
          />
        </View>
    </View>
  );
};

export default TaskGroupDropdown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: Colors.surface,
    
  },
  dropdownContainer: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 0,
  },

  priorityContainer: {
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: 15,
    marginHorizontal:10,
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.black,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,

  },
  placeholderStyle: { fontSize: 16 },
  selectedTextStyle: { fontSize: 16 },
  inputSearchStyle: { height: 40, fontSize: 16 },
  iconStyle: { width: 20, height: 20 },

});
