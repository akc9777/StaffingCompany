using StaffingCompany.Application.Model.Employee;
using System;
using System.Collections.Generic;
using System.Text;

namespace StaffingCompany.Application.Service.Employee
{
    public interface IEmployeeService
    {
        dynamic AddEmployee(MvEmployee employee);
        dynamic EditEmployee(MvEmployee employee);
        dynamic GetAllEmployee();
        dynamic GetEmployee(string json);
        
    }
}
