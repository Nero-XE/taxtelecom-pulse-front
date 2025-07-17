export interface LogResponse {
    items: LogResponseItem[],
    page: number,
    perPage: number,
    totalItems: number,
    totalPages: number
}

export interface LogResponseItem {
    created: Date,
    description: string
}

export interface LogRequest {
    description: string
}