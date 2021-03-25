import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

import IBarber from '../../interfaces/Barber';
import api from '../../services/api';
import {months, days} from '../../utils/ calendar';
import colors from '../../utils/colors';

import ExpandIcon from '../../assets/expand.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';

import {
  Modal,
  ModalArea,
  ModalBody,
  CloseButton,
  ModalItem,
  BarberInfo,
  BarberAvatar,
  BarberName,
  ServiceInfo,
  ServiceName,
  ServicePrice,
  FinishBtn,
  FinishBtnText,
  DateInfo,
  DatePrevArea,
  DateTitleArea,
  DateTitle,
  DateNextArea,
  DateList,
  DateItem,
  DateItemWeekDay,
  DateItemNumber,
  available,
  unavailable,
  selectedStyle,
  selectedText,
  unselectedText,
  TimeList,
  TimeItem,
  TimeItemText,
} from './styles';

interface BarberModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  barber: IBarber;
  service: number | null;
}

interface IListDays {
  status: boolean;
  weekday: string;
  number: number;
}

const BarberModal: React.FC<BarberModalProps> = ({
  show,
  setShow,
  barber,
  service,
}) => {
  const navigation = useNavigation();

  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedHour, setSelectedHour] = useState<number | string>('');
  const [listDays, setListDays] = useState<IListDays[]>([]);
  const [listHours, setListHours] = useState<string[]>([]);

  useEffect(() => {
    let today = new Date();
    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
    setSelectedDay(today.getDate());
  }, []);

  useEffect(() => {
    if (barber.available) {
      let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
      let newListDays: IListDays[] = [];

      for (let i = 1; i <= daysInMonth; i++) {
        let date = new Date(selectedYear, selectedMonth, i);
        let year = date.getFullYear();
        let month: number | string = date.getMonth() + 1;
        let day: number | string = date.getDate();
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? `0${day}` : day;
        let selDate = `${year}-${month}-${day}`;

        let availability = barber.available?.filter((e) => e.date === selDate);

        newListDays.push({
          status: availability?.length > 0 ? true : false,
          weekday: days[date.getDay()],
          number: i,
        });
      }

      setListDays(newListDays);
      setSelectedDay(0);
      setListHours([]);
      setSelectedHour(0);
    }
  }, [selectedMonth, selectedYear, barber]);

  useEffect(() => {
    if (barber.available && selectedDay > 0) {
      let date = new Date(selectedYear, selectedMonth, selectedDay);
      let year = date.getFullYear();
      let month: number | string = date.getMonth() + 1;
      let day: number | string = date.getDate();
      month = month < 10 ? '0' + month : month;
      day = day < 10 ? `0${day}` : day;
      let selDate = `${year}-${month}-${day}`;

      let availability = barber.available?.filter((e) => e.date === selDate);

      if (availability && availability.length > 0) {
        setListHours(availability[0].hours);
      }
    }

    setSelectedHour('');
  }, [selectedDay, selectedMonth, selectedYear, barber]);

  const handlePrevDateClick = useCallback(() => {
    let monthDate = new Date(selectedYear, selectedMonth, 1);
    monthDate.setMonth(monthDate.getMonth() - 1);
    setSelectedYear(monthDate.getFullYear());
    setSelectedMonth(monthDate.getMonth());
    setSelectedDay(0);
  }, [selectedMonth, selectedYear]);

  const handleNextDateClick = useCallback(() => {
    let monthDate = new Date(selectedYear, selectedMonth, 1);
    monthDate.setMonth(monthDate.getMonth() + 1);
    setSelectedYear(monthDate.getFullYear());
    setSelectedMonth(monthDate.getMonth());
    setSelectedDay(0);
  }, [selectedMonth, selectedYear]);

  const handleCloseButton = useCallback(() => {
    setShow(false);
  }, [setShow]);

  const handleFinishClick = useCallback(async () => {
    if (
      barber.id &&
      barber.services &&
      service !== null &&
      selectedYear > 0 &&
      selectedMonth > 0 &&
      selectedDay > 0 &&
      selectedHour
    ) {
      const token = await AsyncStorage.getItem('token');
      const {data: response} = await api.post(
        `barber/${barber.id}/appointment`,
        {
          token,
          service: barber.services[service].id,
          year: selectedYear,
          month: selectedMonth + 1,
          day: selectedDay,
          hour: selectedHour,
        },
      );
      if (!response.error) {
        setShow(false);
        navigation.navigate('Appointments');
      } else {
        Alert.alert('Erro!', `${response.error}`);
      }
    } else {
      Alert.alert('Erro!', 'Preencha todos os dados.');
    }
  }, [
    barber,
    service,
    selectedYear,
    selectedMonth,
    selectedDay,
    selectedHour,
    setShow,
    navigation,
  ]);

  return (
    <Modal transparent={true} visible={show} animationType="slide">
      <ModalArea>
        <ModalBody>
          <CloseButton onPress={handleCloseButton}>
            <ExpandIcon width="40" height="40" fill={colors.black} />
          </CloseButton>

          <ModalItem>
            <BarberInfo>
              <BarberAvatar source={{uri: barber.avatar}} />
              <BarberName>{barber.name}</BarberName>
            </BarberInfo>
          </ModalItem>

          {typeof service === 'number' && barber.services && (
            <ModalItem>
              <ServiceInfo>
                <ServiceName>{barber.services[service].name}</ServiceName>
                <ServicePrice>
                  R$ {barber.services[service].price.toFixed(2)}
                </ServicePrice>
              </ServiceInfo>
            </ModalItem>
          )}

          <ModalItem>
            <DateInfo>
              <DatePrevArea onPress={handlePrevDateClick}>
                <NavPrevIcon width="35" height="35" fill={colors.black} />
              </DatePrevArea>

              <DateTitleArea>
                <DateTitle>
                  {months[selectedMonth]} {selectedYear}
                </DateTitle>
              </DateTitleArea>

              <DateNextArea onPress={handleNextDateClick}>
                <NavNextIcon width="35" height="35" fill={colors.black} />
              </DateNextArea>
            </DateInfo>

            <DateList horizontal={true} showsHorizontalScrollIndicator={false}>
              {listDays.map((item, key) => (
                <DateItem
                  key={key}
                  onPress={() =>
                    item.status ? setSelectedDay(item.number) : null
                  }
                  style={[
                    item.status ? available : unavailable,
                    item.number === selectedDay ? selectedStyle : null,
                  ]}>
                  <DateItemWeekDay
                    style={
                      item.number === selectedDay
                        ? selectedText
                        : unselectedText
                    }>
                    {item.weekday}
                  </DateItemWeekDay>
                  <DateItemNumber
                    style={
                      item.number === selectedDay
                        ? selectedText
                        : unselectedText
                    }>
                    {item.number}
                  </DateItemNumber>
                </DateItem>
              ))}
            </DateList>
          </ModalItem>

          {selectedDay > 0 && listHours.length > 0 && (
            <ModalItem>
              <TimeList
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {listHours.map((item, key) => (
                  <TimeItem
                    key={key}
                    onPress={() => setSelectedHour(item)}
                    style={item === selectedHour ? selectedStyle : null}>
                    <TimeItemText
                      style={
                        item === selectedHour ? selectedText : unselectedText
                      }>
                      {item}
                    </TimeItemText>
                  </TimeItem>
                ))}
              </TimeList>
            </ModalItem>
          )}

          <FinishBtn onPress={handleFinishClick}>
            <FinishBtnText>Finalizar Agendamento</FinishBtnText>
          </FinishBtn>
        </ModalBody>
      </ModalArea>
    </Modal>
  );
};

export default BarberModal;
