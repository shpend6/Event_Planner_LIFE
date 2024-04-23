using EventPlannerBackend.Services.CategoryService;
using EventPlannerBackend.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using EventPlannerBackend.Models;

namespace EventPlannerBackend.Controllers
{

    [ApiController]
    [Route("/api/categories")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _categoryService.GetAllCategoriesAsync();
            return Ok(categories);
        }

        [HttpPost]
        public async Task<IActionResult> AddCategory([FromBody] AddCategoryDto newCategory)
        {
            var categoryToCreate = new Category
            {
                Name = newCategory.Name
            };

             var createdCategory = await _categoryService.AddCategoryAsync(categoryToCreate);
             return Ok(createdCategory);
        }
    }
}
