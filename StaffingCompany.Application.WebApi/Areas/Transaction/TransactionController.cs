using Microsoft.AspNetCore.Mvc;
using StaffingCompany.Application.Service.Transaction;
using StaffingCompany.Application.WebApi.Areas.Base;
using System;

namespace StaffingCompany.Application.WebApi.Areas.Transaction
{
    public class TransactionController : BaseController
    {
        private ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpGet]
        public IActionResult GetAllTransaction()
        {
            try
            {
                dynamic jsonString = _transactionService.GetAllTransaction();
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        public IActionResult GetTransaction(string json)
        {
            try
            {
                dynamic jsonString = _transactionService.GetTransaction(json);
                return Ok(jsonString);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
