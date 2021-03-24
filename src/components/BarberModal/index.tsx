import React, {useCallback} from 'react';
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
} from './styles';

interface BarberModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  barber: IBarber;
  service: number | null;
}

const BarberModal: React.FC<BarberModalProps> = ({
  show,
  setShow,
  barber,
  service,
}) => {
  const navigation = useNavigation();

  const handleCloseButton = useCallback(() => {
    setShow(false);
  }, [setShow]);

  const handleFinishClick = useCallback(() => {
    console.log('test');
  }, []);

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
              <DatePrevArea>
                <NavPrevIcon width="35" height="35" fill={colors.black} />
              </DatePrevArea>

              <DateTitleArea>
                <DateTitle>Setembro 2021</DateTitle>
              </DateTitleArea>

              <DateNextArea>
                <NavNextIcon width="35" height="35" fill={colors.black} />
              </DateNextArea>
            </DateInfo>
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
