export interface InitValues {
	email: string
};

export interface RequestStatus {
	status: number
}

export interface ResetPasswordRequest {
  userId: string | null;
  token: string | null;
  password: string;
  confirmPassword: string;
}

export interface InitResetValues {
  password: string;
  confirmPassword: string;
};

