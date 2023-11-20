using CMABackEnd.Models;

namespace CMABackEnd.Repositories
{
    public interface IContactRespository
    {
        Task<List<ContactModel>> GeContacts();
        Task<bool> AddContact(ContactModel contact);
        Task<bool> EditContact(int contactID, ContactModel contact);
        Task<bool> DeleteContact(int contactID);
        Task<int> GetMaxContactId();
    }
}
