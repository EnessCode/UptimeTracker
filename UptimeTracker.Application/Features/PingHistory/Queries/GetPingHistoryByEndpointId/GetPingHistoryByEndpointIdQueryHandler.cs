using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UptimeTracker.Application.Interfaces.Repositories;

namespace UptimeTracker.Application.Features.PingHistory.Queries.GetPingHistoryByEndpointId
{
	public class GetPingHistoryByEndpointIdQueryHandler : IRequestHandler<GetPingHistoryByEndpointIdQuery, List<PingHistoryDto>>
	{
		private readonly IPingHistoryRepository _repository;

		public GetPingHistoryByEndpointIdQueryHandler(IPingHistoryRepository repository)
		{
			_repository = repository;
		}

		public async Task<List<PingHistoryDto>> Handle(GetPingHistoryByEndpointIdQuery request, CancellationToken cancellationToken)
		{
			var historyRecords = await _repository.GetByEndpointIdAsync(request.EndpointId);

			return historyRecords.Select(h => new PingHistoryDto
			{
				IsSuccess = h.IsSuccess,
				ResponseTime = h.ResponseTimeInMilliseconds,
				StatusCode = h.StatusCode,
				CheckedAt = h.CheckedAt
			}).ToList();
		}
	}
}
