namespace StaffingCompany.Application.Model.Employee
{
    public class MvEmployee
    {
        public int EmployeeId { get; set; }
        public int OrganizationId { get; set; }
        public int PersonId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public int InsertPersonId { get; set; }
    }
}
