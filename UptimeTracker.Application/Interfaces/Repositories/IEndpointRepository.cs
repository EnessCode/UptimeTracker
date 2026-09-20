using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UptimeTracker.Domain.Entities;

namespace UptimeTracker.Application.Interfaces.Repositories
{
	public interface IEndpointRepository
	{
		Task AddAsync(Endpoint endpoint);
		Task<int> SaveChangesAsync();
		Task<IEnumerable<Endpoint>> GetAllAsync();
	}
}
