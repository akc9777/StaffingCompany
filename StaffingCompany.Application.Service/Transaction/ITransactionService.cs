namespace StaffingCompany.Application.Service.Transaction
{
    public interface ITransactionService
    {
        dynamic GetTransaction(string json);
        dynamic GetAllTransaction();

    }
}
