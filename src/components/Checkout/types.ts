export interface IOrder {
  consumerFirstName: string;
  consumerSecondName: string;
  consumerPhone: string;
  region: string;
  city: string;
  street: string;
  homeNumber: string;
  statusId: number;
  orderItems: Array<IOrderItem>
}

export interface IOrderItem {
  productId: number;
  quantity: number;
  buyPrice: number;
}