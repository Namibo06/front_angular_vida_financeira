export type GetOneFinancialType = {
    user: {
        _id: string,
        nickname: string,
        email: string,
        token: string | null    
    },
    emergency_fund: number,
    variable_income: number,
    fixed_income: number,
    total: number
}