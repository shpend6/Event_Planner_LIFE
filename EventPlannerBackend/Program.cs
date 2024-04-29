using EventPlanner.Database;
using EventPlannerBackend.Database;
using EventPlanner.Models;
using EventPlanner.Server.Services.GetEventService;
using EventPlanner.Server.Services.UserService;
using EventPlannerBackend.Services.EventService;
using EventPlannerBackend.Services.TokenService;
using EventPlannerBackend.Services.AttendeeService;
using EventPlannerBackend.Services.CategoryService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using DotNetEnv;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);
Env.Load();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5174", "http://localhost:5173", "http://localhost:32768")
                                .AllowAnyMethod() // Allow any HTTP method
                                .AllowAnyHeader(); // Allow any header
                          policy.WithOrigins("http://localhost:5174", "http://localhost:5173", "http://localhost:32768");
                          //https:localhost:7142 add this?
                      });
});

builder.Services.AddDbContext<EventPlannerDbContext>(options =>
{
    Env.Load();
    var host = Environment.GetEnvironmentVariable("DB_HOST");
    var dbName = Environment.GetEnvironmentVariable("DB_NAME");
    var dbUser = Environment.GetEnvironmentVariable("DB_USER");
    var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD");
    var connectionString = $"Host={host}; Database={dbName}; Username={dbUser}; Password={dbPassword}; Port=5432; SSL Mode=Require; Trust Server Certificate=true";
    Console.WriteLine("Environment Variables:");
    Console.WriteLine($"DB_HOST: {Environment.GetEnvironmentVariable("DB_HOST")}");
    Console.WriteLine($"DB_NAME: {Environment.GetEnvironmentVariable("DB_NAME")}");
    Console.WriteLine($"DB_USER: {Environment.GetEnvironmentVariable("DB_USER")}");
    Console.WriteLine(dbPassword);

    options.UseNpgsql(connectionString);
});


// Add services to the container.
builder.Services.AddScoped<PasswordHasher<User>>();
builder.Services.AddScoped<IEventService, EventService>();
builder.Services.AddScoped<IGetEventService, GetEventService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IAttendeeService, AttendeeService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSwaggerGen(c =>
 {
     c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });

     // Add security definitions
     c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
     {
         Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
         Name = "Authorization",
         In = ParameterLocation.Header,
         Type = SecuritySchemeType.ApiKey,
         Scheme = "Bearer"
     });

     c.AddSecurityRequirement(new OpenApiSecurityRequirement()
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    },
                    Scheme = "oauth2",
                    Name = "Bearer",
                    In = ParameterLocation.Header,
                },
                new List<string>()
            }
        });
 });

// Add Jwt Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Token:Issuer"],
        ValidAudience = builder.Configuration["Token:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(builder.Configuration["Token:Key"])),
        RoleClaimType = "userRole"
    };
});

var app = builder.Build();

// Create a service scope, initialize the database, and create an admin user with hashed password
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var dbContext = services.GetRequiredService<EventPlannerDbContext>();

    var passwordHasher = services.GetRequiredService<PasswordHasher<User>>();

    AddAdminInitializer.CreateAdminUser(dbContext, passwordHasher);
}

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(MyAllowSpecificOrigins);
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
