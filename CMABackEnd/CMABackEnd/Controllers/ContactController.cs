using CMABackEnd.dto.Requests;
using CMABackEnd.Services;
using CMABackEnd.Utility;
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


        [HttpGet()]
        public async Task<IActionResult> GetAll(int pageNumber, int pageSize, string? searchTerm = "")
        {
            try
            {
                return Ok(await this._service.GetContacts(pageNumber, pageSize, searchTerm));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost()]
        public async Task<IActionResult> AddContact(CreateContactReq req)
        {
            var returnObj = await this._service.AddContact(req);
            if (returnObj.Code != (int)ResponseEnum.SUCCESS)
            {
                return BadRequest(returnObj);
            }
            return CreatedAtAction("AddContact", returnObj);

        }


        [HttpPut("{id}")]
        public async Task<IActionResult> EditContact(int id, CreateContactReq req)
        {
            var returnObj = await this._service.EditContact(id, req);
            if (returnObj.Code != (int)ResponseEnum.SUCCESS)
            {
                return BadRequest(returnObj);
            }
            return Ok(returnObj);

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var returnObj = await this._service.DeleteContact(id);
            if (returnObj.Code != (int)ResponseEnum.SUCCESS)
            {
                return BadRequest(returnObj);
            }
            return Ok(returnObj);

        }

    }
}
