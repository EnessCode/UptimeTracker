using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UptimeTracker.Application.Features.PingHistory.Queries.GetPingHistoryByEndpointId
{
	public class GetPingHistoryByEndpointIdQuery : IRequest<List<PingHistoryDto>>
	{
		public Guid EndpointId { get; set; }
	}
}
