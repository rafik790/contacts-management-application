using CMABackEnd.Models;
using System.Text.Json;

namespace CMABackEnd.Repositories
{
    public class ContactRespository : IContactRespository
    {
        private readonly string _jsonFilePath;
        public ContactRespository(IConfiguration configuration)
        {
            _jsonFilePath = configuration["DataFilePath"];
        }

        public async Task<bool> AddContact(ContactModel contact)
        {
            try
            {
                List<ContactModel> contactList = await ReadDataFromFile();
                contactList.Add(contact);

                bool success = await WriteUsersToJsonAsync(contactList);
                return success;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteContact(int contactID)
        {
            try
            {
                List<ContactModel> contactList = await ReadDataFromFile();
                List<ContactModel> updatedList = contactList.Where(user => user.id != contactID).ToList();
                bool success = await WriteUsersToJsonAsync(updatedList);
                return success;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> EditContact(int contactID, ContactModel contact)
        {
            try
            {
                List<ContactModel> contactList = await ReadDataFromFile();
                ContactModel userToUpdate = contactList.FirstOrDefault(user => user.id == contactID);

                if (userToUpdate == null)
                {
                    throw new Exception("Provided contact id is not valid");
                }

                userToUpdate.id = contactID;
                userToUpdate.firstName = contact.firstName;
                userToUpdate.lastName = contact.lastName;
                userToUpdate.email = contact.email;
                bool success = await WriteUsersToJsonAsync(contactList);
                return success;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<ContactModel>> GeContacts()
        {
            return await ReadDataFromFile();
        }

        public async Task<int> GetMaxContactId()
        {
            if (!File.Exists(_jsonFilePath))
            {
                return 1;
            }

            List<ContactModel> contactList = await ReadDataFromFile();
            if (contactList == null || contactList.Count == 0)
            {
                return 1;
            }

            int id = contactList.Max(user => user.id) + 1;
            return id;
        }

        private async Task<List<ContactModel>> ReadDataFromFile()
        {
            if (!File.Exists(_jsonFilePath))
            {
                return new List<ContactModel>();
            }
            var jsonString = await File.ReadAllTextAsync(_jsonFilePath);
            return JsonSerializer.Deserialize<List<ContactModel>>(jsonString);
        }

        public async Task<bool> WriteUsersToJsonAsync(List<ContactModel> contacts)
        {
            try
            {
                var json = JsonSerializer.Serialize(contacts, new JsonSerializerOptions
                {
                    WriteIndented = true
                });
                await File.WriteAllTextAsync(_jsonFilePath, json);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
