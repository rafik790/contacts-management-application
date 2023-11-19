using CMABackEnd.dto.Requests;
using CMABackEnd.dto.Responses;

namespace CMABackEnd.Services
{
    public interface IContactService
    {
        Task<BaseResponse<ContactListResponse>> GetContacts(int pageNumber, int pageSize, string? searchTerm = "");
        Task<BaseResponse<Object>> AddContact(CreateContactReq contact);
        Task<BaseResponse<object>> EditContact(int contactID, CreateContactReq contact);
        Task<BaseResponse<object>> DeleteContact(int contactID);
    }
}
