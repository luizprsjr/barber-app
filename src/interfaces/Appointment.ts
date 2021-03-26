import IBarber from './Barber';

export default interface IAppointment {
  id: number;
  datetime: string;
  barber: IBarber;
  service: service;
}

interface service {
  id: number;
  id_barber: number;
  name: string;
  price: number;
}
