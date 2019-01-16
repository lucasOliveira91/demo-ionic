import { StateDTO } from "./state.dto";

export interface CityDTO {
    id: number;
    name: string;
    state?: StateDTO;
}