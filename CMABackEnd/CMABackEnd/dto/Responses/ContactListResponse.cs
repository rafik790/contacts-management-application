using CMABackEnd.Models;

namespace CMABackEnd.dto.Responses
{
    public class ContactListResponse
    {
        public int HitCount { get; set; }
        public List<ContactModel> Contacts { get; set; }
    }
}
