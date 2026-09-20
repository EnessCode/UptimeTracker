using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UptimeTracker.Domain.Entities;

namespace UptimeTracker.Persistence.Configurations
{
	public class EndpointConfiguration : IEntityTypeConfiguration<Endpoint>
	{
		public void Configure(EntityTypeBuilder<Endpoint> builder)
		{
			builder.HasKey(x => x.Id);
			builder.Property(x => x.Name).IsRequired().HasMaxLength(150);
			builder.Property(x => x.Url).IsRequired().HasMaxLength(2048);

			builder.HasMany(x => x.PingHistories)
				   .WithOne(x => x.Endpoint)
				   .HasForeignKey(x => x.EndpointId)
				   .OnDelete(DeleteBehavior.Cascade);
		}
	}
}
