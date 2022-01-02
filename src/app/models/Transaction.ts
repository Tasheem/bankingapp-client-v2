export interface ITransaction {
    id?: string,
    amount: number,
    originAccountNumber?: string,
    destinationAccountNumber?: string,
    date?: string,
    category: 'WITHDRAWAL' | 'DEPOSIT' | 'SEND',
    description?: string
}