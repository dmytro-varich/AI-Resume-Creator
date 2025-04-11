using Microsoft.EntityFrameworkCore;
using ResumeCreatorBackend.Data;
using ResumeCreatorBackend.Services;
using ResumeCreatorBackend.Utils;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle`
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register client factory
builder.Services.AddHttpClient();
builder.Services.AddScoped<AccountService>();
builder.Services.AddScoped<AICommunicationService>();
builder.Services.AddScoped<ParserService>();


// DbContext registration
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(ConnectionStringHelper.GetPostgresConnectionStringFromEnv("EXTERNAL_DB_URL"))
);

builder.WebHost.UseUrls("http://0.0.0.0:8080");

var app = builder.Build();

// TO NOT TO FORGET TO UNCOMMENT THIS
//Apply pending migrations on startup
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    context.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

