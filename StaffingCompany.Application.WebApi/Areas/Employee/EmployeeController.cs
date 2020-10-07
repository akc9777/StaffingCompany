using Microsoft.AspNetCore.Mvc;
using StaffingCompany.Application.Model.Employee;
using StaffingCompany.Application.Service.Employee;
using StaffingCompany.Application.WebApi.Areas.Base;
using System;

namespace StaffingCompany.Application.WebApi.Areas.Employee
{
    public class EmployeeController : BaseController
    {
        private IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpPost]
        public IActionResult AddEmployee([FromBody] MvEmployee employee)
        {
            try
            {
                dynamic jsonString = _employeeService.AddEmployee(employee);
                return Ok(jsonString);
            }
            catch(Exception e)
            {
                throw e;
            }
        }

        [HttpPut]
        public IActionResult EditEmployee([FromBody] MvEmployee employee)
        {
            try
            {
                dynamic jsonString = _employeeService.EditEmployee(employee);
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        public IActionResult GetAllEmployee()
        {
            try
            {
                dynamic jsonString = _employeeService.GetAllEmployee();
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        public IActionResult GetEmployee(string json)
        {
            try
            {
                dynamic jsonString = _employeeService.GetEmployee(json);
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
