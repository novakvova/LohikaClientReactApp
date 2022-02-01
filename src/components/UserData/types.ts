import { IProfile } from './Profile/types';
import { Order } from './UserOrders/types';

export interface ProfileState {
  profile: IProfile;
  orders: Array<Order>
  loading: boolean;
  error: undefined | string;
}
