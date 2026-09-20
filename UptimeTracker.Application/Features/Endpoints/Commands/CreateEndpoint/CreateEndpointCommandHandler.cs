using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UptimeTracker.Application.Interfaces.Repositories;
using UptimeTracker.Domain.Entities;

namespace UptimeTracker.Application.Features.Endpoints.Commands.CreateEndpoint
{
	public class CreateEndpointCommandHandler : IRequestHandler<CreateEndpointCommand, Guid>
	{
		private readonly IEndpointRepository _repository;

		public CreateEndpointCommandHandler(IEndpointRepository repository)
		{
			_repository = repository;
		}

		public async Task<Guid> Handle(CreateEndpointCommand request, CancellationToken cancellationToken)
		{
			var endpoint = new Endpoint
			{
				Name = request.Name,
				Url = request.Url,
				CheckIntervalInMinutes = request.CheckIntervalInMinutes
			};

			await _repository.AddAsync(endpoint);
			await _repository.SaveChangesAsync();

			return endpoint.Id;
		}
	}
}
