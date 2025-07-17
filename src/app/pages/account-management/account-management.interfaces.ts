import { FormControl } from "@angular/forms"

export interface AccountsResponse {
    items: AccountsResponseItem[],
    page: number,
    perPage: number,
    totalItems: number,
    totalPages: number
}

export interface AccountsResponseItem {
    email: string,
    fullName: string,
    id: string
}

export interface AccountForm {
    email: FormControl<string | null>,
    fullName: FormControl<string | null>,
    password: FormControl<string | null>,
}

export interface AccountRequest {
    email: string,
    password: string,
    passwordConfirm: string,
    fullName: string
}