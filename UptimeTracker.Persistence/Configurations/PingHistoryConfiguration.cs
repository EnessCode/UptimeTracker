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
	public class PingHistoryConfiguration : IEntityTypeConfiguration<PingHistory>
	{
		public void Configure(EntityTypeBuilder<PingHistory> builder)
		{
			builder.HasKey(x => x.Id);
			builder.Property(x => x.ErrorMessage).HasMaxLength(500);
		}
	}
}
