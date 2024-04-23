using EventPlanner.Database;
using EventPlannerBackend.Models;
using Microsoft.EntityFrameworkCore;


namespace EventPlannerBackend.Services.CategoryService
{
    public class CategoryService : ICategoryService

    {
        private readonly EventPlannerDbContext _dbContext;

        public CategoryService(EventPlannerDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
        {
            return await _dbContext.Categories.ToListAsync();
        }

        public async Task<Category> AddCategoryAsync(Category newCategory)
        {

            _dbContext.Categories.Add(newCategory);
            await _dbContext.SaveChangesAsync();

            return newCategory;
        }
    }
}
