import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import IBarber from '../../interfaces/Barber';
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
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [listDays, setListDays] = useState<IListDays[]>([]);
  const [listHours, setListHours] = useState([]);

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

  const handlePrevDateClick = useCallback(() => {
    let monthDate = new Date(selectedYear, selectedMonth, 1);
    monthDate.setMonth(monthDate.getMonth() - 1);
    setSelectedYear(monthDate.getFullYear());
    setSelectedMonth(monthDate.getMonth());
    setSelectedDay(1);
  }, [selectedMonth, selectedYear]);

  const handleNextDateClick = useCallback(() => {
    let monthDate = new Date(selectedYear, selectedMonth, 1);
    monthDate.setMonth(monthDate.getMonth() + 1);
    setSelectedYear(monthDate.getFullYear());
    setSelectedMonth(monthDate.getMonth());
    setSelectedDay(1);
  }, [selectedMonth, selectedYear]);

  const handleCloseButton = useCallback(() => {
    setShow(false);
  }, [setShow]);

  const handleFinishClick = useCallback(() => {}, []);

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
                  onPress={() => {
                    console.log('teste');
                  }}>
                  <DateItemWeekDay>{item.weekday}</DateItemWeekDay>
                  <DateItemNumber>{item.number}</DateItemNumber>
                </DateItem>
              ))}
            </DateList>
          </ModalItem>

          <FinishBtn onPress={handleFinishClick}>
            <FinishBtnText>Finalizar Agendamento</FinishBtnText>
          </FinishBtn>
        </ModalBody>
      </ModalArea>
    </Modal>
  );
};

export default BarberModal;
