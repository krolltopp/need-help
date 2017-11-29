export interface IUser {
  userName: string;
  location?: ILocation;
  locationDate?: Date;
  accident?: IAccident;
}

export interface ILocation {
  lat: number;
  lng: number;
}

export interface IAccident {
  type: string;
  severity: string;
  date: Date;
}
