using Microsoft.AspNetCore.Mvc;
using StaffingCompany.Application.Model.Organization;
using StaffingCompany.Application.Service.Organization;
using StaffingCompany.Application.WebApi.Areas.Base;
using System;

namespace StaffingCompany.Application.WebApi.Areas.Organization
{
    public class OrganizationController : BaseController
    {
        private IOrganizationService _organizationService;

        public OrganizationController(IOrganizationService organizationService)
        {
            _organizationService = organizationService;
        }

        [HttpPost]
        public IActionResult AddOrganization([FromBody] MvOrganization organization)
        {
            try
            {
                dynamic jsonString = _organizationService.AddOrganization(organization);
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPut]
        public IActionResult EditOrganization([FromBody] MvOrganization organization)
        {
            try
            {
                dynamic jsonString = _organizationService.EditOrganization(organization);
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        public IActionResult GetAllOrganization()
        {
            try
            {
                dynamic jsonString = _organizationService.GetAllOrganization();
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        public IActionResult GetOrganization(string json)
        {
            try
            {
                dynamic jsonString = _organizationService.GetOrganization(json);
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
