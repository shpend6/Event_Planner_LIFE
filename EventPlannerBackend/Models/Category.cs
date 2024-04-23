using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventPlannerBackend.Models;

[Table("Categories")]
public class Category
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }
}
