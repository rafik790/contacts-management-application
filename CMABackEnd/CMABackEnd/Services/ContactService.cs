using CMABackEnd.dto.Requests;
using CMABackEnd.dto.Responses;
using CMABackEnd.Models;
using CMABackEnd.Repositories;
using CMABackEnd.Utility;

namespace CMABackEnd.Services
{
    public class ContactService : IContactService
    {
        private readonly IContactRespository _repository;
        public ContactService(IContactRespository repository)
        {
            this._repository = repository;
        }
        public async Task<BaseResponse<object>> AddContact(CreateContactReq req)
        {
            var contact = new ContactModel();
            contact.id = await this._repository.GetMaxContactId();
            contact.firstName = req.FirstName;
            contact.lastName = req.LastName;
            contact.email = req.Email;

            bool added = await this._repository.AddContact(contact);

            var returnObj = new BaseResponse<Object>();
            if (added)
            {
                returnObj.Code = (int)ResponseEnum.SUCCESS;
                returnObj.Message = "Contact added successfully";
            }
            else
            {
                returnObj.Code = (int)ResponseEnum.BAD_REQUEST;
                returnObj.Message = "Failed to add contact";
            }

            return returnObj;
        }

        public async Task<BaseResponse<object>> DeleteContact(int contactID)
        {
            bool deleted = await this._repository.DeleteContact(contactID);
            var returnObj = new BaseResponse<Object>();
            if (deleted)
            {
                returnObj.Code = (int)ResponseEnum.SUCCESS;
                returnObj.Message = "Contact deleted successfully";
            }
            else
            {
                returnObj.Code = (int)ResponseEnum.BAD_REQUEST;
                returnObj.Message = "Failed to delete contact";
            }

            return returnObj;
        }

        public async Task<BaseResponse<object>> EditContact(int contactID, CreateContactReq req)
        {
            var returnObj = new BaseResponse<Object>();
            try
            {
                var contact = new ContactModel();
                contact.id = contactID;
                contact.firstName = req.FirstName;
                contact.lastName = req.LastName;
                contact.email = req.Email;

                bool edited = await this._repository.EditContact(contactID, contact);
                if (edited)
                {
                    returnObj.Code = (int)ResponseEnum.SUCCESS;
                    returnObj.Message = "Contact updated successfully";
                }
                else
                {
                    returnObj.Code = (int)ResponseEnum.BAD_REQUEST;
                    returnObj.Message = "Failed to update contact";
                }
            }
            catch (Exception ex)
            {

                returnObj.Code = (int)ResponseEnum.SERVER_ERROR;
                returnObj.Message = ex.Message;
            }
            return returnObj;
        }

        public async Task<BaseResponse<ContactListResponse>> GetContacts(int pageNumber, int pageSize, string? searchTerm = "")
        {
            List<ContactModel> contactList = await this._repository.GeContacts();
            List<ContactModel> filteredList = contactList;

            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                filteredList = contactList.Where(u => u.firstName.ToLower().Contains(searchTerm.ToLower()) || u.lastName.ToLower().Contains(searchTerm.ToLower()) || u.email.ToLower().Contains(searchTerm.ToLower())).ToList();
            }

            var totalHits = filteredList.Count;
            var totalPages = (int)Math.Ceiling((double)totalHits / pageSize);
            var paginatedContacts = filteredList.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

            ContactListResponse response = new ContactListResponse();
            response.HitCount = totalHits;
            response.Contacts = paginatedContacts;

            var returnObj = new BaseResponse<ContactListResponse>();
            returnObj.Code = (int)ResponseEnum.SUCCESS;
            returnObj.Message = "Success";
            returnObj.Data = response;

            return returnObj;
        }
    }
}
