import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import useAppointments from '../../hooks/useAppointments';
import { PatientAppointment } from '../../types/PatientAppointment';
import SmallAppointmentCard from './SmallAppointmentCard';
import { useFocusEffect } from '@react-navigation/native';
import { formatUtcToLocalDate, getMonthNameFromDateString, getUserTimeZone } from '../../utils/date';

interface DayItem {
  date: string;
  day: number;
  short: string;
}

const getTodayISO = () => formatUtcToLocalDate(new Date(), getUserTimeZone());

const generateWeek = (referenceDate: Date): DayItem[] => {
  const week = [];
  const timeZone = getUserTimeZone();

  for (let i = 0; i < 7; i++) {
    const date = new Date(referenceDate);
    date.setDate(referenceDate.getDate() + i);

    const localDate = formatUtcToLocalDate(date, timeZone);
    const dayDate = new Date(localDate + 'T00:00:00');

    week.push({
      date: localDate,
      day: dayDate.getDate(),
      short: dayDate
        .toLocaleDateString('es-AR', { weekday: 'short', timeZone })
        .replace('.', '')
        .toUpperCase(),
    });
  }

  return week;
};

export default function WeeklySchedule() {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(getTodayISO());
  const [appointments, setAppointments] = useState<PatientAppointment[]>([])

  const { getAppointmentsByDate, isLoading } = useAppointments()

  useFocusEffect(
    useCallback(() => {
      getAppointmentsByDate(selectedDate).then(setAppointments)
    }, [selectedDate])
  )

  const days = generateWeek(weekStartDate);

  const monthName = getMonthNameFromDateString(selectedDate);

  const goToPreviousWeek = () => {
    const newDate = new Date(weekStartDate);
    newDate.setDate(newDate.getDate() - 7);
    setWeekStartDate(newDate);
    setSelectedDate(formatUtcToLocalDate(newDate));
  };

  const goToNextWeek = () => {
    const newDate = new Date(weekStartDate);
    newDate.setDate(newDate.getDate() + 7);
    setWeekStartDate(newDate);
    setSelectedDate(formatUtcToLocalDate(newDate));
  };

  const handleDayPress = async (date: string) => {
    setSelectedDate(date);
  }

  return (
    <View className="rounded-xl gap-4">
      <View className="flex-row items-center justify-between">
        <TouchableOpacity onPress={goToPreviousWeek}>
          <ChevronLeft color="#006A71" size={28} />
        </TouchableOpacity>

        <Text className="text-xl font-bold text-primary">
          {monthName}
        </Text>

        <TouchableOpacity onPress={goToNextWeek}>
          <ChevronRight color="#006A71" size={28} />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="justify-center items-center w-full"
      >
        {days.map((day) => {
          const isSelected = selectedDate === day.date;
          const isToday = day.date === getTodayISO();

          return (
            <TouchableOpacity
              key={day.date}
              onPress={() => handleDayPress(day.date)}
              className="items-center mx-3"
            >
              <Text className="text-sm text-primary">{day.short}</Text>

              <View
                className={`w-10 h-10 items-center ${isSelected && !isToday ? 'bg-primary/10 rounded-md' : ''} justify-center mt-1 ${isToday ? 'bg-primary rounded-full ' : ''}`}
              >
                <Text
                  className={`text-lg font-bold ${isToday ? 'text-white' : 'text-primary'}`}
                >
                  {day.day}
                </Text>
              </View>

              {isSelected && (
                <View className="h-[2px] w-full bg-primary mt-1" />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <FlatList
        data={appointments}
        contentContainerStyle={{ gap: 12 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <SmallAppointmentCard appointment={item} />
        )}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          isLoading.appointmentsByDate ? (
            <View className="items-center justify-center">
              <ActivityIndicator size="large" color="#006A71" />
            </View>
          ) : (
            <View className="flex-1 items-center justify-center">
              <Text className="text-primary text-lg">No hay turnos</Text>
            </View>
          )
        }
      />
    </View>
  );
}
