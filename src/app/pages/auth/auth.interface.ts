import { FormControl } from '@angular/forms';

export interface AuthForm {
  readonly identity: FormControl<string>;
  readonly password: FormControl<string>;
}

export interface AuthRequest {
  readonly identity: string;
  readonly password: string;
}

interface Record {
  readonly collectionId: string;
  readonly collectionName: string;
  readonly email: string;
  readonly fullName: string;
  readonly id: number;
  readonly roles: number;
}

export interface AuthResponse {
  readonly record: Record;
  readonly token: string;
}

enum AuthErrorKey {'identity', 'password'};

type DataItem = {
  readonly [K in AuthErrorKey]: {
    readonly code: string;
    readonly message: string;
  };
};


export interface FailedAuthResponse {
  readonly data: DataItem | {};
  readonly message: string;
  readonly status: number;
}