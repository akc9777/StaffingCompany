using StaffingCompany.Application.Model.Assignment;

namespace StaffingCompany.Application.Service.Assignment
{
    public interface IAssignmentService
    {
        dynamic AddAssignment(MvAssignment assignment);
        dynamic EditAssignment(MvAssignment assignment);
        dynamic MarkAssignmentAsComplete(MvAssignment assignment);
        dynamic GetAllAssignment();
        dynamic GetAssignment(string json);
    }
}
