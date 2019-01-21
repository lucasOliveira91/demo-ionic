import { OrderItemDTO } from './order_item.dto';
import { PaymentDTO } from './payment.dto';
import { RefDTO } from './ref.dto';
export interface OrderDTO {
    custumer: RefDTO;
    deriveryAddress: RefDTO;
    payment: PaymentDTO;
    items: OrderItemDTO[];
}