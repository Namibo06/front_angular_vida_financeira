export type GetOneLifeFinancialType = {
    input_values: number,
    output_values: number,
    balance_amount: number,
    user: {
        _id: string
        nickname: string,
        email: string,
        token: string | null  
    },
    items: [
        {
            _id: string,
            name: string,
            operation: string,
            price: number
        }
    ]
}