using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UptimeTracker.Application.Features.PingHistory.Queries.GetPingHistoryByEndpointId
{
	public class PingHistoryDto
	{
		public bool IsSuccess { get; set; }
		public int ResponseTime { get; set; }
		public int StatusCode { get; set; }
		public DateTime CheckedAt { get; set; }
	}
}
