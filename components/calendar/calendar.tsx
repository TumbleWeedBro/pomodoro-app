import React, {useState, useRef, useMemo} from 'react';
import {Calendar} from 'react-native-calendars';
import { Colors } from "@/constants/Colors";


interface CalendarTimelineProps {
  onDatePress: (date:string) => void;
  tasksByDate: any
}


const CalendarTimeline = ({onDatePress, tasksByDate}: CalendarTimelineProps) => {

  const [selected, setSelected] = useState('');
  const [count, setCount] = useState(0)

  const handlePress = (date: string) => {
  onDatePress(date);}

  const countRef = useRef(0);
  const prevDayRef = useRef<string | null>(null);

  const onPressCounter = (day: string) => {
    if (prevDayRef.current !== day) {
      prevDayRef.current = day;
      countRef.current = 1; // first tap
      handlePress(day);
      setSelected("");
      return;
    }

    // same day tapped
    countRef.current += 1;

    if (countRef.current === 2) {
      setSelected(day); 
      countRef.current = 0; 
    }

    handlePress(day);
    console.log(day);
  };

  const getMarkedDates = () => {
    const marks: Record<string, any> = {};

    Object.keys(tasksByDate).forEach(date => {
      const taskCount = tasksByDate[date].length;

      marks[date] = {
        marked:true,
        dots:Array(taskCount).fill({color: 'green'}),
      };
    });

    return marks
  }

  const marks = useMemo(() => getMarkedDates(), [tasksByDate]);
  return (
      
    <Calendar

    theme={{
      calendarBackground: Colors.background,

      selectedDayBackgroundColor: Colors.primary,
      arrowColor: Colors.primary,
      dayTextColor: Colors.surface,
      todayTextColor: Colors.primary,
      monthTextColor: Colors.surface,

      textDisabledColor: Colors.disabled,
      textSectionTitleColor: Colors.surface,

      textMonthFontSize: 30,
      textDayHeaderFontSize: 16

    }}

    onDayPress={day => {
      console.log(tasksByDate)
      onPressCounter(day.dateString)
    }}
    markedDates={getMarkedDates()}
    markingType='multi-dot'
  
    />
  );
};



export default CalendarTimeline;