import { Employee } from "./employee";
import { JobTitle } from './jobTitle';

export interface Department {

    departmentId: number;

    departmentName: string;

    numberOfJobTitles: number;
    numberOfEmployees: number;

    jobTitles: JobTitle[];

    employeesInDepartment: Employee[];
}