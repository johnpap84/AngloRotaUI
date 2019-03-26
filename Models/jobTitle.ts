import { Employee } from './employee';

export interface JobTitle {

    id: number;

    jobTitleName: string;

    inDepartment: string;

    numberOfEmployees: number;

    employeesInJob: Employee[];
}