using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UptimeTracker.Application.Interfaces.Repositories;

namespace UptimeTracker.Application.Features.Endpoints.Commands.DeleteEndpoint
{
	public class DeleteEndpointCommandHandler : IRequestHandler<DeleteEndpointCommand>
	{
		private readonly IEndpointRepository _repository;
		public DeleteEndpointCommandHandler(IEndpointRepository repository) => _repository = repository;

		public async Task Handle(DeleteEndpointCommand request, CancellationToken cancellationToken)
		{
			var endpoint = await _repository.GetByIdAsync(request.Id);
			if (endpoint != null)
			{
				_repository.Remove(endpoint);
				await _repository.SaveChangesAsync();
			}
		}
	}
}
