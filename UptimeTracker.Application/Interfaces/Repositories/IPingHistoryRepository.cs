using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UptimeTracker.Domain.Entities;

namespace UptimeTracker.Application.Interfaces.Repositories
{
	public interface IPingHistoryRepository
	{
		Task AddAsync(PingHistory history);
		Task<int> SaveChangesAsync();
		Task<List<PingHistory>> GetByEndpointIdAsync(Guid endpointId);
	}
}
