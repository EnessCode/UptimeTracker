using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UptimeTracker.Application.Interfaces.Repositories;
using UptimeTracker.Persistence.Contexts;
using UptimeTracker.Persistence.Repositories;

namespace UptimeTracker.Persistence
{
	public static class ServiceRegistration
	{
		public static void AddPersistenceServices(this IServiceCollection services, IConfiguration configuration)
		{
			services.AddDbContext<AppDbContext>(options =>
				options.UseNpgsql(configuration.GetConnectionString("PostgreSQL")));

			services.AddScoped<IEndpointRepository, EndpointRepository>();

			services.AddScoped<IPingHistoryRepository, PingHistoryRepository>();
		}
	}
}
