using StaffingCompany.Application.Model.Invoice;

namespace StaffingCompany.Application.Service.Invoice
{
    public interface IInvoiceService
    {
        dynamic AddInvoice(MvInvoice invoice);
        dynamic GetAllInvoice();
        dynamic GetInvoice(string json);
    }
}
