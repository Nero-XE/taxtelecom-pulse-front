export interface ApplicationsResponse {
    readonly items: ApplicationsResponseItems[],
    readonly page: number,
    readonly perPage: number,
    readonly totalItems: number,
    readonly totalPages: number
}

export interface ApplicationsResponseItems {
    readonly created: Date,
    readonly expand: {
        [key: string]: {
            [values: string]: string
        }
    },
    readonly id: number,
    readonly profile: number,
}

export interface ApplicationRequest {
    id: number,
    profile: number,
    division: number,
    status: number,
    resCity: number,
    eduCity: number,
    eduOrg: number,
    moodle: number | null,
    course: string,
    comment: string,
    email: string,
}

export interface ApplicationCreateResponse extends ApplicationRequest {
    collectionId: string,
    collectionName: string,
    created: Date;
}