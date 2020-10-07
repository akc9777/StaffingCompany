namespace StaffingCompany.Application.Model.Assignment
{
    public class MvAssignment
    {
        public int AssignmentId { get; set; }
        public int EmployeeId { get; set; }
        public int JobId { get; set; }
        public string Description { get; set; }
        public int Status { get; set; }
        public int Unit { get; set; }
        public int Rate { get; set; }
        public int InsertPersonId { get; set; }
    }
}
