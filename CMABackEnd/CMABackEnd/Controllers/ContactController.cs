using CMABackEnd.Services;
using Microsoft.AspNetCore.Mvc;

namespace CMABackEnd.Controllers
{
    [Route("api/contacts")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _service;
        public ContactController(IContactService service)
        {
            this._service = service;
        }

    }
}
