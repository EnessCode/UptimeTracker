using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UptimeTracker.Application.Interfaces.Repositories;
using UptimeTracker.Application.Interfaces.Services;

namespace UptimeTracker.Application.Features.Endpoints.Commands.ToggleEndpointActive
{
	public class ToggleEndpointActiveCommandHandler : IRequestHandler<ToggleEndpointActiveCommand>
	{
		private readonly IEndpointRepository _repository;
		private readonly INotificationService _notificationService;

		public ToggleEndpointActiveCommandHandler(IEndpointRepository repository, INotificationService notificationService)
		{
			_repository = repository;
			_notificationService = notificationService;
		}

		public async Task Handle(ToggleEndpointActiveCommand request, CancellationToken cancellationToken)
		{
			var endpoint = await _repository.GetByIdAsync(request.Id);
			if (endpoint == null) return;

			endpoint.IsActive = !endpoint.IsActive;

			if (!endpoint.IsActive)
			{
				endpoint.Status = Domain.Enums.EndpointStatus.Offline;
			}

			_repository.Update(endpoint);
			await _repository.SaveChangesAsync();

			await _notificationService.SendEndpointUpdateAsync();
		}
	}
}
