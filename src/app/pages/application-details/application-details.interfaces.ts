export interface ApplicationDetailsResponse {
    comment: string,
    course: string,
    created: Date,
    email: string,
    expand: {
        division: {
            name: string
        },
        eduCity: {
            name: string
        },
        eduOrg: {
            name: string
        },
        moodle: {
            end_task_date: Date,
            end_test_date: Date,
            start_task_date: Date,
            start_test_date: Date,
            status: number,
            target: number,
            tests: number
        },
        profile: {
            fullName: string
        },
        resCity: {
            name: string
        },
        status: {
            name: string
        }
    },
    id: number
}