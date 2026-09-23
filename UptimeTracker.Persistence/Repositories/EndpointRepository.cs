using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UptimeTracker.Application.Interfaces.Repositories;
using UptimeTracker.Domain.Entities;
using UptimeTracker.Persistence.Contexts;

namespace UptimeTracker.Persistence.Repositories
{
	public class EndpointRepository : IEndpointRepository
	{
		private readonly AppDbContext _context;

		public EndpointRepository(AppDbContext context)
		{
			_context = context;
		}

		public async Task AddAsync(Endpoint endpoint)
		{
			await _context.Endpoints.AddAsync(endpoint);
		}

		public async Task<int> SaveChangesAsync()
		{
			return await _context.SaveChangesAsync();
		}

		public async Task<IEnumerable<Endpoint>> GetAllAsync()
		{
			return await _context.Endpoints.AsNoTracking().ToListAsync();
		}

		public void Update(Endpoint endpoint)
		{
			_context.Endpoints.Update(endpoint);
		}

		public async Task<Endpoint> GetByIdAsync(Guid id)
		{
			return await _context.Endpoints.FindAsync(id);
		}

		public void Remove(Endpoint endpoint)
		{
			_context.Endpoints.Remove(endpoint);
		}
	}
}
