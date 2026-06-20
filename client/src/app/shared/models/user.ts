export interface User {
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
  roles: [];
}

export interface Address {
  country: string;
  city: string;
  line1: string;
  postalCode: string;
}
