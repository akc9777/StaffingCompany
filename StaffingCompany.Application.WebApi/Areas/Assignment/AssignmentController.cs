using Microsoft.AspNetCore.Mvc;
using StaffingCompany.Application.Model.Assignment;
using StaffingCompany.Application.Service.Assignment;
using StaffingCompany.Application.WebApi.Areas.Base;
using System;

namespace StaffingCompany.Application.WebApi.Areas.Assignment
{
    public class AssignmentController : BaseController
    {
        private IAssignmentService _assignmentService;

        public AssignmentController(IAssignmentService assignmentService)
        {
            _assignmentService = assignmentService;
        }

        [HttpPost]
        public IActionResult AddAssignment([FromBody] MvAssignment assignment)
        {
            try
            {
                dynamic jsonString = _assignmentService.AddAssignment(assignment);
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPut]
        public IActionResult EditAssignment([FromBody] MvAssignment assignment)
        {
            try
            {
                dynamic jsonString = _assignmentService.EditAssignment(assignment);
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPut]
        public IActionResult MarkAssignmentAsComplete([FromBody] MvCompleteAssignment completeAssignment)
        {
            try
            {
                dynamic jsonString = _assignmentService.MarkAssignmentAsComplete(completeAssignment);
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        public IActionResult GetAllAssignment()
        {
            try
            {
                dynamic jsonString = _assignmentService.GetAllAssignment();
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        public IActionResult GetAssignment(string json)
        {
            try
            {
                dynamic jsonString = _assignmentService.GetAssignment(json);
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
