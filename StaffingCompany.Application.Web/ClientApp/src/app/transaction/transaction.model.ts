export interface MvTransaction {
    transactionId: number;
    assignmentId: number;
    task: string;
    employeeId: number;
    firstName: string;
    middleName: string;
    lastName: string;
    organizationName: string;
    amount: number;
    date: string;
}
export interface MvTransactionInvoice {
    transactionId: number;
    assignmentId: number;
    organizationId: number;
    organizationName: string;
    employeeId: number;
    employeeName: string;
    task: string;
    amount: number;
    status: number;
    date: string;
}
