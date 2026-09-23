using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UptimeTracker.Application.Features.Endpoints.Commands.DeleteEndpoint
{
	public class DeleteEndpointCommand : IRequest
	{
		public Guid Id { get; set; }
	}
}
