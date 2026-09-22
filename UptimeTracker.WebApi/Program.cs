using Hangfire;
using Hangfire.PostgreSql;
using Scalar.AspNetCore;
using UptimeTracker.Application;
using UptimeTracker.Application.Interfaces.Services;
using UptimeTracker.Persistence;
using UptimeTracker.WebApi.Hubs;
using UptimeTracker.WebApi.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddPersistenceServices(builder.Configuration);
builder.Services.AddApplicationServices();
builder.Services.AddControllers();
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowReactApp", policy =>
	{
		policy.WithOrigins("http://localhost:5173")
			  .AllowAnyHeader()
			  .AllowAnyMethod()
			  .AllowCredentials(); 
	});
});

builder.Services.AddOpenApi();

builder.Services.AddHttpClient();

var connectionString = builder.Configuration.GetConnectionString("PostgreSQL");

builder.Services.AddHangfire(config => config
	.SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
	.UseSimpleAssemblyNameTypeSerializer()
	.UseRecommendedSerializerSettings()
	.UsePostgreSqlStorage(options => options.UseNpgsqlConnection(connectionString)));

builder.Services.AddHangfireServer();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.MapOpenApi();
	app.MapScalarApiReference();
}

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

app.UseHangfireDashboard();

RecurringJob.AddOrUpdate<UptimeTracker.WebApi.BackgroundJobs.PingJob>(
	"check-all-endpoints",
	job => job.ExecuteAsync(),
	Cron.Minutely);

app.MapControllers();

app.MapHub<UptimeHub>("/uptime-hub");

app.Run();