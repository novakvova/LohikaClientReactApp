

export interface IStatus {
  status: number
}

export interface UserInfo {
  id: number;
  firstName?: string;
  secondName?: string;
  photo?: string;
  phone?: string;
  email?: string;
}

export interface UsersState {
  users: UserInfo[];
  userData: UserInfo;
  loading: boolean;
  error: string | null;
  currentPage: number;
  pages: number;
  total: number;
}

  

  

  

 