using EventPlanner.Models;
using EventPlannerBackend.Dtos;
using EventPlannerBackend.Models;

namespace EventPlannerBackend.Services.CategoryService
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> GetAllCategoriesAsync();
        Task<Category> AddCategoryAsync(Category newCategory);
    }
}
