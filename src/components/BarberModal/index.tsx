import React from 'react';
import {useNavigation} from '@react-navigation/native';

import IBarber from '../../interfaces/Barber';

import {Modal} from './styles';

interface BarberModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  barber: IBarber;
  service: number | null;
}

const BarberModal: React.FC<BarberModalProps> = () => {
  return <Modal />;
};

export default BarberModal;
