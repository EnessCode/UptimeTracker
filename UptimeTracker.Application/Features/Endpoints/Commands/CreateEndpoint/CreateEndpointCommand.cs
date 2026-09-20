using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UptimeTracker.Application.Features.Endpoints.Commands.CreateEndpoint
{
	public class CreateEndpointCommand : IRequest<Guid>
	{
		public string Name { get; set; } = string.Empty;
		public string Url { get; set; } = string.Empty;
		public int CheckIntervalInMinutes { get; set; }
	}
}
