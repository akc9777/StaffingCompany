using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace StaffingCompany.Application.WebApi.Areas.Base
{
    [Produces("application/json")]
    [EnableCors("AllowOrigin"), Route("api/[controller]/[action]/{id?}")]
    public class BaseController : Controller
    {
    }
}
