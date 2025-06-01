import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import GoBackButton from "../../../components/ui/GoBackButton";
import NewAppointmentStatus from "../../../components/appointments/NewAppointmentStatus";
import { useNewAppointment } from "../../../context/NewAppointmentContext";
import { useEffect, useMemo, useState, useCallback } from "react";
import useProfessionals from "../../../hooks/useProfessionals";
import { Calendar, LocaleConfig } from "react-native-calendars";
import Button from "../../../components/ui/Button";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CircleCheck } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { MyAppointmentsStackParamList } from "./MyAppointmentsView";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

LocaleConfig.locales['es'] = {
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
};
LocaleConfig.defaultLocale = 'es';

const formatDate = (date: Date) => date.toISOString().split("T")[0];

const getMonthStartEnd = (year: number, month: number) => {
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);
  return {
    startDate: formatDate(start),
    endDate: formatDate(end),
  };
};

export default function NewAppointmentSelectDateAndHour() {
  const { bottom } = useSafeAreaInsets();
  const { professional, setSlot } = useNewAppointment();
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const { navigate } = useNavigation<NativeStackNavigationProp<MyAppointmentsStackParamList>>();

  const { getProfessionalAvailability, isLoading, handleLoading } = useProfessionals();

  const [availability, setAvailability] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [error, setError] = useState<string | null>(null);

  const fetchAvailability = useCallback(async () => {
    try {
      setError(null);
      const { startDate, endDate } = getMonthStartEnd(currentMonth.getFullYear(), currentMonth.getMonth());
      const data = await getProfessionalAvailability(professional.id, startDate, endDate);
      setAvailability(data);

      const validDates = data.filter((d: any) => d.slots.length > 0).map((d: any) => d.date);
      if (!validDates.includes(selectedDate) && validDates.length > 0) {
        setSelectedDate(validDates[0]);
      }
    } catch (err) {
      console.error(err);
      setError("No se pudo cargar la disponibilidad. Intenta nuevamente.");
    } finally {
      handleLoading("professionalAvailability", false);
    }
  }, [currentMonth, professional.id]);

  useEffect(() => {
    handleLoading("professionalAvailability", true);
    fetchAvailability();
  }, [fetchAvailability]);

  const markedDates = useMemo(() => {
    const marked: any = {};

    for (const day of availability) {
      const hasSlots = day.slots.length > 0;

      marked[day.date] = {
        disabled: !hasSlots,
        disableTouchEvent: !hasSlots,
        marked: hasSlots,
        dotColor: hasSlots ? "#2E8B57" : undefined,
        selected: selectedDate === day.date,
        selectedColor: selectedDate === day.date ? "#006A71" : undefined,
      };
    }
    return marked;
  }, [availability, selectedDate]);

  const slotsForDate = availability.find(d => d.date === selectedDate)?.slots || [];

  const handleDayPress = useCallback((day: any) => {
    setSelectedDate(day.dateString);
  }, []);

  const handleMonthChange = useCallback((month: any) => {
    const today = new Date();
    const monthDate = new Date(month.year, month.month - 1);
    if (monthDate >= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setCurrentMonth(monthDate);
    }
  }, []);

  const isSlotSelected = (slot: any) =>
    selectedSlot?.start_time === slot.start_time && selectedSlot?.date === selectedDate;

  const handleContinue = useCallback(() => {
    setSlot(selectedSlot);
    navigate('NewAppointmentConfirm');
  }, [selectedSlot]);

  return (
    <ScrollView contentContainerClassName="pt-9 px-5 gap-8" contentContainerStyle={{ paddingBottom: bottom + 60 }}>
      <View className="flex-row items-center justify-between">
        <GoBackButton callback={() => {
          setSelectedSlot(null)
          setSlot(null)
        }} />
        <Text className="text-primary text-lg">Paso 4 de 5</Text>
      </View>

      <NewAppointmentStatus />

      <View className="gap-4">
        <Text className="text-3xl text-primary font-bold">Seleccionar turno</Text>

        <Calendar
          markedDates={markedDates}
          current={formatDate(currentMonth)}
          onDayPress={handleDayPress}
          onMonthChange={handleMonthChange}
          theme={{
            selectedDayBackgroundColor: "#006A71",
            todayTextColor: "#006A71",
            arrowColor: "#006A71",
            monthTextColor: "#006A71",
            textMonthFontSize: 16,
            textMonthFontWeight: "bold"
          }}
          style={{
            borderRadius: 10
          }}
          disableArrowLeft={new Date(currentMonth).getMonth() === new Date().getMonth()}
        />

        {isLoading.professionalAvailability && (
          <View style={{
            position: 'absolute', top: -10, left: 0, right: 0, bottom: -10,
            justifyContent: 'center', alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.7)', zIndex: 1,
            borderRadius: 10
          }}>
            <ActivityIndicator size="large" color="#006A71" />
          </View>
        )}

        {error && (
          <Text className="text-red-500 mt-2">{error}</Text>
        )}

        <Text className="text-xl mt-4 text-primary font-semibold">
          Horarios para {new Date(selectedDate).toLocaleDateString('es-AR', {
            weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric'
          })}
        </Text>

        {slotsForDate.length === 0 ? (
          <Text className="text-gray-500 mt-2">No hay turnos disponibles.</Text>
        ) : (
          <FlatList
            className="mt-2"
            data={slotsForDate}
            keyExtractor={(item, index) => `${item.start_time}-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            initialNumToRender={5}
            renderItem={({ item }) => (
              <TouchableOpacity
                className={`px-4 py-2 rounded-lg mr-2 flex-row items-center gap-2 border-[2px] ${isSlotSelected(item) ? 'border-tertiary bg-primary' : 'bg-primary border-transparent'}`}
                onPress={() => setSelectedSlot({ date: selectedDate, ...item })}
              >
                { isSlotSelected(item) && <CircleCheck size={15} color="#fff" /> }
                <Text className="text-white font-semibold">
                  {item.start_time} - {item.end_time}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      <Button
        disabled={!selectedSlot?.start_time}
        className={!selectedSlot?.start_time ? 'opacity-50 border-primary/50 font-semibold' : ''}
        text="Continuar"
        onPress={handleContinue}
      />
    </ScrollView>
  );
}
