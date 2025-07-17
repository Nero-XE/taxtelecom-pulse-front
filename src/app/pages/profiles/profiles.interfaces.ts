export interface ProfilesResponse {
    readonly items: ProfilesResponseItems[],
    readonly page: number,
    readonly perPage: number,
    readonly totalItems: number,
    readonly totalPages: number
}

export interface ProfilesResponseItems {
    readonly fullName: string,
    readonly id: number
}