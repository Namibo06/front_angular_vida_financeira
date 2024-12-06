export type GetAllGoalsType = [
    {
        title: string;
        status: string;
        number_status: number;
        user: {
            _id: string
            nickname: string,
            email: string,
            token: string | null   
        };
    }
]