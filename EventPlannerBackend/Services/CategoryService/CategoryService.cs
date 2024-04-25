using EventPlanner.Database;
using EventPlannerBackend.Models;
using Microsoft.EntityFrameworkCore;


namespace EventPlannerBackend.Services.CategoryService;

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
        if (newCategory == null)
            throw new ArgumentNullException(nameof(newCategory));

        if (string.IsNullOrWhiteSpace(newCategory.Name))
            throw new ArgumentException("Category name cannot be empty.");

        bool categoryEists = await _dbContext.Categories.AnyAsync(c => c.Name == newCategory.Name);
        if (categoryEists)
            throw new InvalidOperationException("Category with the same name already exists.");

        _dbContext.Categories.Add(newCategory);
        await _dbContext.SaveChangesAsync();

        return newCategory;
    }

    public async Task DeleteCategoryAsync(Category categoryToDelete)
    {
        if (categoryToDelete == null)
            throw new ArgumentNullException(nameof(categoryToDelete));

        _dbContext.Categories.Remove(categoryToDelete);
        await _dbContext.SaveChangesAsync();
    }
}
