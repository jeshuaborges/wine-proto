export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferences: {
    wineTypes: string[];
    tastingNotes: string[];
    communicationPreferences: {
      email: boolean;
      sms: boolean;
      phone: boolean;
    };
  };
  addresses: Address[];
  purchaseHistory: Purchase[];
  eventHistory: EventAttendance[];
}

export interface Address {
  id: string;
  type: 'billing' | 'shipping';
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
  isCompliant: boolean;
}

export interface Purchase {
  id: string;
  date: string;
  products: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
}

export interface EventAttendance {
  id: string;
  eventName: string;
  date: string;
  status: 'attended' | 'registered' | 'cancelled';
  notes?: string;
}