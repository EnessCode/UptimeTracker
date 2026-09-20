using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UptimeTracker.Application.DTOs;
using UptimeTracker.Application.Interfaces.Repositories;

namespace UptimeTracker.Application.Features.Endpoints.Queries.GetAllEndpoints
{
	public class GetAllEndpointsQueryHandler : IRequestHandler<GetAllEndpointsQuery, IEnumerable<EndpointListDto>>
	{
		private readonly IEndpointRepository _repository;

		public GetAllEndpointsQueryHandler(IEndpointRepository repository)
		{
			_repository = repository;
		}

		public async Task<IEnumerable<EndpointListDto>> Handle(GetAllEndpointsQuery request, CancellationToken cancellationToken)
		{
			var endpoints = await _repository.GetAllAsync();

			var dtos = endpoints.Select(e => new EndpointListDto
			{
				Id = e.Id,
				Name = e.Name,
				Url = e.Url,
				CheckIntervalInMinutes = e.CheckIntervalInMinutes,
				Status = e.Status.ToString(), 
				IsActive = e.IsActive
			});

			return dtos;
		}
	}
}
