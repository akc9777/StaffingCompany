using StaffingCompany.Application.Model.Assignment;

namespace StaffingCompany.Application.Service.Assignment
{
    public interface IAssignmentService
    {
        dynamic AddAssignment(MvAssignment assignment);
        dynamic EditAssignment(MvAssignment assignment);
        dynamic MarkAssignmentAsComplete(MvCompleteAssignment completeAssignment);
        dynamic GetAllAssignment();
        dynamic GetAssignment(string json);
    }
}
