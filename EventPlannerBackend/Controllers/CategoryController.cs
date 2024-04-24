using EventPlannerBackend.Services.CategoryService;
using EventPlannerBackend.Dtos;
using Microsoft.AspNetCore.Mvc;
using EventPlannerBackend.Models;
using EventPlannerBackend.Models.Enums;
using Microsoft.AspNetCore.Authorization;
using EventPlanner.Database;

namespace EventPlannerBackend.Controllers;

[ApiController]
[Route("/api/categories")]
public class CategoryController : ControllerBase
{
    private readonly EventPlannerDbContext _dbContext;
    private readonly ICategoryService _categoryService;

    public CategoryController(EventPlannerDbContext dbContext, ICategoryService categoryService)
    {
        _dbContext = dbContext;
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllCategories()
    {
        var categories = await _categoryService.GetAllCategoriesAsync();
        return Ok(categories);
    }

    [HttpPost]
    [Authorize(Roles = nameof(UserRole.Admin))]
    public async Task<IActionResult> AddCategory([FromBody] AddCategoryDto newCategory)
    {
        var categoryToCreate = new Category
        {
            Name = newCategory.Name
        };

        var createdCategory = await _categoryService.AddCategoryAsync(categoryToCreate);
        return Ok(createdCategory);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = nameof(UserRole.Admin))]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var categoryToDelete = await _dbContext.Categories.FindAsync(id);

        if (categoryToDelete == null)
        {
            return NotFound("No category found.");
        }

        await _categoryService.DeleteCategoryAsync(categoryToDelete);
        return NoContent();
    }
}
