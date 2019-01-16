import { CityDTO } from './city.dto';

export interface AddressDTO {
    id: string;
    publicPlace: string;
    number: number;
    complement: string;
    neighborhood: string;
    zipcode: string;
    city: CityDTO;
}