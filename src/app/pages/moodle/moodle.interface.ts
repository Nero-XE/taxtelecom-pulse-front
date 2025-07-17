export interface MoodleResponse {
    readonly items: MoodleResponseItems[],
    readonly page: number,
    readonly perPage: number,
    readonly totalItems: number,
    readonly totalPages: number
}

export interface MoodleResponseItems {
    readonly end_task_date: string,
    readonly end_test_date: string,
    readonly expand: {
        profile: {
            fullName: string,
            id: number
        },
        status: {
            id: number,
            name: string
        },
        target: {
            id: number,
            name: string
        },
        tests: {
            cSharp: boolean,
            collectionId: string,
            collectionName: string,
            database: boolean,
            id: number,
            java: boolean,
            js: boolean,
            kotlin: boolean,
            numerical: boolean,
            php: boolean,
            python: boolean,
            swift: boolean,
            systemAdmin: boolean,
            verbal: boolean
        },
    },
    readonly id: number
    readonly start_task_date: string,
    readonly start_test_date: string,
}