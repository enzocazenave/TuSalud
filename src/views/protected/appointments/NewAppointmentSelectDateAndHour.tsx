import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import GoBackButton from '../../../components/ui/GoBackButton';
import NewAppointmentStatus from '../../../components/appointments/NewAppointmentStatus';
import {useNewAppointment} from '../../../context/NewAppointmentContext';
import {useEffect, useMemo, useState, useCallback} from 'react';
import useProfessionals from '../../../hooks/useProfessionals';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Button from '../../../components/ui/Button';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CircleCheck} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {MyAppointmentsStackParamList} from './MyAppointmentsView';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  formatUtcToLocalDate,
  formatUtcToLocalDateTime,
  getUserTimeZone,
} from '../../../utils/date';
import {useTheme} from '../../../context/ThemeContext';

LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ],
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
};
LocaleConfig.defaultLocale = 'es';

const getMonthStartEnd = (year: number, month: number) => {
  const today = new Date();
  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() === month;

  const start = isCurrentMonth ? today : new Date(year, month, 1);

  const end = new Date(year, month + 1, 0);

  const timeZone = getUserTimeZone();

  return {
    startDate: formatUtcToLocalDate(start, timeZone),
    endDate: formatUtcToLocalDate(end, timeZone),
  };
};

export default function NewAppointmentSelectDateAndHour() {
  const {bottom} = useSafeAreaInsets();
  const {professional, setSlot} = useNewAppointment();
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const {navigate} =
    useNavigation<NativeStackNavigationProp<MyAppointmentsStackParamList>>();
  const timeZone = getUserTimeZone();
  const {theme} = useTheme();

  const {getProfessionalAvailability, isLoading, handleLoading} =
    useProfessionals();

  const [availability, setAvailability] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(
    formatUtcToLocalDate(new Date(), timeZone),
  );
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [error, setError] = useState<string | null>(null);

  const fetchAvailability = useCallback(async () => {
    try {
      setError(null);
      const {startDate, endDate} = getMonthStartEnd(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
      );
      const data = await getProfessionalAvailability(
        professional.id,
        startDate,
        endDate,
      );
      setAvailability(data);

      const validDates = data
        .filter((d: any) => d.slots.length > 0)
        .map((d: any) => d.date);
      if (!validDates.includes(selectedDate) && validDates.length > 0) {
        setSelectedDate(validDates[0]);
      }
    } catch (err) {
      console.error(err);
      setError('No se pudo cargar la disponibilidad. Intenta nuevamente.');
    } finally {
      handleLoading('professionalAvailability', false);
    }
  }, [currentMonth, professional.id]);

  useEffect(() => {
    handleLoading('professionalAvailability', true);
    fetchAvailability();
  }, [fetchAvailability]);

  const markedDates = useMemo(() => {
    const marked: Record<string, any> = {};
    const lastDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0,
    );

    const availableDatesMap = new Map(
      availability.map(day => [
        day.date,
        {
          hasSlots: day.slots.length > 0,
          isSelected: day.date === selectedDate,
        },
      ]),
    );

    for (let d = 1; d <= lastDayOfMonth.getDate(); d++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        d,
      );
      const dateString = formatUtcToLocalDate(date, timeZone);
      const dayInfo = availableDatesMap.get(dateString);

      marked[dateString] = dayInfo
        ? {
            disabled: !dayInfo.hasSlots,
            disableTouchEvent: !dayInfo.hasSlots,
            marked: dayInfo.hasSlots,
            dotColor: dayInfo.hasSlots ? '#2E8B57' : undefined,
            selected: dayInfo.isSelected,
            selectedColor: dayInfo.isSelected ? '#006A71' : undefined,
          }
        : {
            disabled: true,
            disableTouchEvent: true,
          };
    }

    return marked;
  }, [availability, selectedDate, currentMonth]);

  const slotsForDate =
    availability.find(d => d.date === selectedDate)?.slots || [];

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
    selectedSlot?.start_time === slot.start_time &&
    selectedSlot?.date === selectedDate;

  const handleContinue = useCallback(() => {
    setSlot(selectedSlot);
    navigate('NewAppointmentConfirm');
  }, [selectedSlot]);

  return (
    <ScrollView
      contentContainerClassName="pt-9 px-5 gap-8"
      contentContainerStyle={{paddingBottom: bottom + 60}}>
      <View className="flex-row items-center justify-between">
        <GoBackButton
          callback={() => {
            setSelectedSlot(null);
            setSlot(null);
          }}
        />
        <Text className="text-primary dark:text-secondary text-lg">
          Paso 4 de 5
        </Text>
      </View>

      <NewAppointmentStatus />

      <View className="gap-4">
        <Text className="text-3xl text-primary dark:text-secondary font-bold">
          Seleccionar turno
        </Text>

        <Calendar
          markedDates={markedDates}
          current={formatUtcToLocalDate(currentMonth, timeZone)}
          onDayPress={handleDayPress}
          onMonthChange={handleMonthChange}
          theme={{
            selectedDayBackgroundColor:
              theme === 'dark' ? '#9ACBD0' : '#006A71',
            todayTextColor: theme === 'dark' ? '#9ACBD0' : '#006A71',
            arrowColor: theme === 'dark' ? '#9ACBD0' : '#006A71',
            monthTextColor: theme === 'dark' ? '#9ACBD0' : '#006A71',
            textMonthFontSize: 16,
            textMonthFontWeight: 'bold',
          }}
          style={{
            borderRadius: 10,
          }}
          disableArrowLeft={
            new Date(currentMonth).getMonth() === new Date().getMonth()
          }
        />

        {isLoading.professionalAvailability && (
          <View
            style={{
              position: 'absolute',
              top: -10,
              left: 0,
              right: 0,
              bottom: -10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.7)',
              zIndex: 1,
              borderRadius: 10,
            }}>
            <ActivityIndicator
              size="large"
              color={theme === 'dark' ? '#9ACBD0' : '#006A71'}
            />
          </View>
        )}

        {error && <Text className="text-red-500 mt-2">{error}</Text>}

        <Text className="text-xl mt-4 text-primary dark:text-secondary font-semibold">
          Horarios para{' '}
          {formatUtcToLocalDateTime(selectedDate + 'T00:00:00', timeZone, {
            weekday: 'long',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: undefined,
            minute: undefined,
          })}
        </Text>

        {slotsForDate.length === 0 ? (
          <Text className="text-gray-500 mt-2">No hay turnos disponibles.</Text>
        ) : (
          <FlatList
            className="mt-2"
            data={slotsForDate}
            keyExtractor={(item, index) => `${item.start_time}-${index}`}
            columnWrapperStyle={{flex: 1, gap: 12, padding: 5}}
            scrollEnabled={false}
            numColumns={2}
            renderItem={({item}) => {
              const isItemSelected = isSlotSelected(item);

              return (
                <TouchableOpacity
                  style={{flex: 1}}
                  className={`px-4 py-2 rounded-lg flex-row items-center gap-2 border-[2px justify-center ${
                    isSlotSelected(item)
                      ? 'border-2 border-primary dark:border-secondary bg-secondary text-primary dark:text-secondary'
                      : 'bg-primary/80 border-2 border-primary/80'
                  }`}
                  onPress={() =>
                    setSelectedSlot({date: selectedDate, ...item})
                  }>
                  {isItemSelected && (
                    <CircleCheck
                      size={15}
                      strokeWidth={3}
                      color={theme === 'dark' ? '#9ACBD0' : '#006A71'}
                    />
                  )}

                  <Text
                    className={`font-bold text-lg ${isItemSelected ? 'text-primary' : 'text-white'}`}>
                    {new Date(
                      `2000-01-01T${item.start_time}:00Z`,
                    ).toLocaleTimeString(undefined, {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                      timeZone,
                    })}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>

      <Button
        disabled={!selectedSlot?.start_time}
        className={
          !selectedSlot?.start_time
            ? 'opacity-50 border-primary/50 font-semibold'
            : ''
        }
        text="Continuar"
        onPress={handleContinue}
      />
    </ScrollView>
  );
}
