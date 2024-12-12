export type GetAllItemsType = [
    {
        _id: string,
        name: string,
        operation: string,
        price: number,
        user: {
            _id: string
            nickname: string,
            email: string,
        }
    }
]