using StaffingCompany.Application.Model.Job;

namespace StaffingCompany.Application.Service.Job
{
    public interface IJobService
    {
        dynamic AddJob(MvJob job);
        dynamic EditJob(MvJob job);
        dynamic GetAllJob();
        dynamic GetJob(string json);
    }
}
