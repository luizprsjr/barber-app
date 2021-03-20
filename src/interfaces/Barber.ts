export default interface IBarber {
  id: number;
  name: string;
  avatar: string;
  stars: number;
  latitude?: string;
  longitude?: string;
  distance?: number;
  favorited?: boolean;
  photos?: photo[];
  services?: service[];
  testimonials?: testimonial[];
  available?: available[];
}

interface photo {
  id: number;
  url: string;
}

interface service {
  id: number;
  name: string;
  price: number;
}

interface testimonial {
  id: number;
  name: string;
  rate: number;
  body: string;
}

interface available {
  date: string;
  hours: string[];
}
