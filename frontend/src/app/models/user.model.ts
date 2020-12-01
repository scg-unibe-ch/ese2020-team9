export interface User {
  userId: number;
  admin: boolean;
  wallet: number;
  userName: string;
  password: string;
  userMail: string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: number;
  addressStreet: string;
  addressPin: string;
  addressCity: string;
  addressCountry: string;
}

export interface RegisterUser {
  userName: string;
  password: string;
  userMail: string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: number;
  addressStreet: string;
  addressPin: string;
  addressCity: string;
  addressCountry: string;
}

export interface EditUser {
  userId: number;
  userName: string;
  userMail: string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: number;
  addressStreet: string;
  addressPin: string;
  addressCity: string;
  addressCountry: string;
}

