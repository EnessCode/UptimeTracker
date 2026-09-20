using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using UptimeTracker.Domain.Entities;

namespace UptimeTracker.Persistence.Contexts
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
		{
		}

		public DbSet<Endpoint> Endpoints { get; set; }
		public DbSet<PingHistory> PingHistories { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
			base.OnModelCreating(modelBuilder);
		}

		public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
		{
			var entries = ChangeTracker.Entries<BaseEntity>();
			foreach (var entry in entries)
			{
				if (entry.State == EntityState.Added)
					entry.Entity.CreatedAt = DateTime.UtcNow;
				else if (entry.State == EntityState.Modified)
					entry.Entity.UpdatedAt = DateTime.UtcNow;
			}
			return base.SaveChangesAsync(cancellationToken);
		}
	}
}
