using Microsoft.AspNetCore.Mvc;
using StaffingCompany.Application.Model.Invoice;
using StaffingCompany.Application.Service.Invoice;
using StaffingCompany.Application.WebApi.Areas.Base;
using System;

namespace StaffingCompany.Application.WebApi.Areas.Invoice
{
    public class InvoiceController : BaseController
    {
        private IInvoiceService _invoiceService;

        public InvoiceController(IInvoiceService invoiceService)
        {
            _invoiceService = invoiceService;
        }

        [HttpPost]
        public IActionResult AddInvoice([FromBody] MvInvoice invoice)
        {
            try
            {
                dynamic jsonString = _invoiceService.AddInvoice(invoice);
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        public IActionResult GetAllInvoice()
        {
            try
            {
                dynamic jsonString = _invoiceService.GetAllInvoice();
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        public IActionResult GetInvoice(string json)
        {
            try
            {
                dynamic jsonString = _invoiceService.GetInvoice(json);
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
