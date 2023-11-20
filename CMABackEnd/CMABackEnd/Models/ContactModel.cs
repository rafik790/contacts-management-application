using System.ComponentModel.DataAnnotations;

namespace CMABackEnd.Models
{
    public class ContactModel
    {
        [Required]
        public int id { get; set; }

        [Required]
        [MaxLength(100)]
        public string firstName { get; set; }

        [Required]
        [MaxLength(100)]
        public string lastName { get; set; }

        [Required]
        [MaxLength(255)]
        public string email { get; set; }
    }
}
