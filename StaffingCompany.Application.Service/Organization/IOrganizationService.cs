using StaffingCompany.Application.Model.Organization;

namespace StaffingCompany.Application.Service.Organization
{
    public interface IOrganizationService
    {
        dynamic AddOrganization(MvOrganization organization);
        dynamic EditOrganization(MvOrganization organization);
        dynamic GetAllOrganization();
        dynamic GetOrganization(string json);

    }
}
