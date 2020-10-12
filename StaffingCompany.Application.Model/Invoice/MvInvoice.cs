namespace StaffingCompany.Application.Model.Invoice
{
    public class MvInvoice
    {
        public int InvoiceId { get; set; }
        public int EntityType { get; set; }
        public int EntityId { get; set; }
        public string Transactions { get; set; }
        public int Amount { get; set; }
        public int InsertPersonId { get; set; }
    }
}
