export interface ShippingAddress {
  fullName: string;
  mobileNumber: string;
  address: string;
  city: string;
  landmark?: string; // Optional
  alternateMobile?: string; // Optional
  state: string;
  pinCode: string;
  country: string;

  userId?: number; // Make userId optional initially
  id?: string;
}

  