using Amazon.S3;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PlayArt.Api;
using PlayArt.Core.entities;
using PlayArt.Core.Interfaces.IRepositories;
using PlayArt.Core.Interfaces.Services_interfaces;
using PlayArt.Core.Interfaces;
using PlayArt.Core;
using PlayArt.Data.Repositories;
using PlayArt.Data.Repository;
using PlayArt.Data;
using PlayArt.Service;
using PlayArt.Sevice;
using System.Text;
using DotNetEnv;
using Amazon.Extensions.NETCore.Setup;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Identity;
using Web.Net.Service;
using YourNamespace.Services;

// קריאת משתני סביבה
Env.Load();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDefaultAWSOptions(builder.Configuration.GetAWSOptions());
builder.Services.AddSingleton<IAmazonS3>(serviceProvider =>
{
    var options = serviceProvider.GetRequiredService<IOptions<AWSOptions>>().Value;

    // הגדרת Credentials באופן ידני
    var credentials = new Amazon.Runtime.BasicAWSCredentials(
       Environment.GetEnvironmentVariable("AWS_ACCESS_KEY"),
        Environment.GetEnvironmentVariable("AWS_SECRET_KEY")
    );

    // הגדרת Region
    var region = Amazon.RegionEndpoint.GetBySystemName(builder.Configuration["AWS:Region"]);


    return new AmazonS3Client(credentials, region);
});

builder.Services.AddHttpClient();  // הוספת HttpClient לשירותים




// הוספת CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
           policy.AllowAnyOrigin()  // מאפשר לכל מקור לגשת
                 .AllowAnyMethod()
                 .AllowAnyHeader());
});



// הוספת JWT Authentication
builder.Services.AddScoped<AuthService>();

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
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

// הוספת הרשאות מבוססות-תפקידים
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
    options.AddPolicy("UserorOrAdmin", policy => policy.RequireRole("User", "Admin"));
    options.AddPolicy("UserOnly", policy => policy.RequireRole("User"));
});

builder.Services.Configure<KestrelServerOptions>(options =>
{
    options.AllowSynchronousIO = true;
});

// הוספת שירותים לפני יצירת ה-Application
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Bearer Authentication with JWT Token",
        Type = SecuritySchemeType.Http
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
    });
});

builder.Services.AddDbContext<DataContext>();
builder.Services.AddHttpClient<DalleService>();

// הוספת ה-Repositories
builder.Services.AddScoped<IRepository<User>, UserRepository>();
builder.Services.AddScoped<IDrawingRepository, DrawingRepository>();
builder.Services.AddScoped<IPaintedDrawingRepository, PaintedDrawingRepository>();
builder.Services.AddScoped<IDrawingService, DrawingService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserRoleRepository, UserRoleRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<IRepositoryManager, RepositoryManager>();

// הוספת ה-Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IDrawingService, DrawingService>();
builder.Services.AddScoped<IPaintedDrawingService, PaintedDrawingService>();
builder.Services.AddScoped<IUserRoleService, UserRoleService>();
builder.Services.AddScoped<IStatisticsService, StatisticsService>();
//builder.Services.AddHttpClient<IGeminiService, GeminiService>();
builder.Services.AddHttpClient<DalleService>();


// הוספת AutoMapper
builder.Services.AddAutoMapper(typeof(ProfileMapping), typeof(ProfileMappingPostModel));

builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();


//builder.Services.AddDbContext<DataContext>(option =>
//{
//    option.UseSqlServer("Data Source = DESKTOP-SSNMLFD; Initial Catalog = PlayArt; Integrated Security = true; Trusted_Connection = SSPI; MultipleActiveResultSets = true; TrustServerCertificate = true;");
//});

var connectionString = "Server=beqdqzgusumabq3kbes4-mysql.services.clever-cloud.com;Port=3306;Database=beqdqzgusumabq3kbes4;User=uo44ivmkbvid09wi;Password=uW496zhf7ImCGeNGPSjj;";
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

var app = builder.Build();

// Middleware להגדרת ה-API
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger(); // מפעיל את Swagger
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "PlayArt API V1");
    });
//}

app.UseHttpsRedirection();

// הפעלת ה-CORS
app.UseCors("AllowAllOrigins");

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();



