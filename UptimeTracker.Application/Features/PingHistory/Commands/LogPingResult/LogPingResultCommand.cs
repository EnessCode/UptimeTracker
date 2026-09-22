using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UptimeTracker.Application.Features.PingHistory.Commands.LogPingResult
{
	public class LogPingResultCommand : IRequest
	{
		public Guid EndpointId { get; set; }
		public bool IsSuccess { get; set; }
		public int ResponseTimeInMs { get; set; }
		public int StatusCode { get; set; }
	}
}
