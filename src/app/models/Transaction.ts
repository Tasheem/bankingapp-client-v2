export interface ITransaction {
    id: string,
    amount: number,
    originAccountNumber: string,
    destinationAccountNumber: string,
    date: string,
    category: string,
    description: string
}