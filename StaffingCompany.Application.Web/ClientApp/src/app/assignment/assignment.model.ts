export interface MvAssignment {
    assignmentId: number;
    employeeId: number;
    lastName: string;
    firstName: string;
    middleName: string;
    organizationId: number;
    organizationName: string;
    jobId: number;
    post: string;
    description: string;
    unit: number;
    rate: number;
    status: number;
    insertPersonId: number;
}

export interface MvCompletedAssignment {
    assignmentId: number;
    employeeId:  number;
    organizationId: number;
    insertPersonId: number;
}