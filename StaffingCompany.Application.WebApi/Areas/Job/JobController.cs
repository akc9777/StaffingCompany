using Microsoft.AspNetCore.Mvc;
using StaffingCompany.Application.Model.Job;
using StaffingCompany.Application.Service.Job;
using StaffingCompany.Application.WebApi.Areas.Base;
using System;

namespace StaffingCompany.Application.WebApi.Areas.Job
{
    public class JobController : BaseController
    {
        private IJobService _jobService;

        public JobController(IJobService jobService)
        {
            _jobService = jobService;
        }

        [HttpPost]
        public IActionResult AddJob([FromBody] MvJob job)
        {
            try
            {
                dynamic jsonString = _jobService.AddJob(job);
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPut]
        public IActionResult EditJob([FromBody] MvJob job)
        {
            try
            {
                dynamic jsonString = _jobService.EditJob(job);
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        public IActionResult GetAllJob()
        {
            try
            {
                dynamic jsonString = _jobService.GetAllJob();
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        public IActionResult GetJob(string json)
        {
            try
            {
                dynamic jsonString = _jobService.GetJob(json);
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
