using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UptimeTracker.Application.DTOs;

namespace UptimeTracker.Application.Features.Endpoints.Queries.GetAllEndpoints
{
	public class GetAllEndpointsQuery : IRequest<IEnumerable<EndpointListDto>>
	{
	}
}
