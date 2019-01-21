import { RefDTO } from "./ref.dto";

export interface OrderItemDTO{
    amount: number;
    product: RefDTO;
}