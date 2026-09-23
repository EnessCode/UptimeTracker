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
	public class PingHistoryRepository : IPingHistoryRepository
	{
		private readonly AppDbContext _context;

		public PingHistoryRepository(AppDbContext context)
		{
			_context = context;
		}

		public async Task AddAsync(PingHistory history)
		{
			await _context.PingHistories.AddAsync(history);
		}

		public async Task<int> SaveChangesAsync()
		{
			return await _context.SaveChangesAsync();
		}

		public async Task<List<PingHistory>> GetByEndpointIdAsync(Guid endpointId)
		{
			return await _context.PingHistories
				.Where(p => p.EndpointId == endpointId)
				.OrderByDescending(p => p.CheckedAt)
				.Take(50)
				.ToListAsync();
		}
	}
}
