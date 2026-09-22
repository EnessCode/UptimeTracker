using MediatR;
using UptimeTracker.Application.Interfaces.Repositories;
using UptimeTracker.Application.Interfaces.Services; 

namespace UptimeTracker.Application.Features.PingHistory.Commands.LogPingResult
{
	public class LogPingResultCommandHandler : IRequestHandler<LogPingResultCommand>
	{
		private readonly IEndpointRepository _endpointRepository;
		private readonly IPingHistoryRepository _pingHistoryRepository;
		private readonly INotificationService _notificationService; 

		public LogPingResultCommandHandler(
			IEndpointRepository endpointRepository,
			IPingHistoryRepository pingHistoryRepository,
			INotificationService notificationService) 
		{
			_endpointRepository = endpointRepository;
			_pingHistoryRepository = pingHistoryRepository;
			_notificationService = notificationService;
		}

		public async Task Handle(LogPingResultCommand request, CancellationToken cancellationToken)
		{
			var endpoint = await _endpointRepository.GetByIdAsync(request.EndpointId);
			if (endpoint == null) return;

			endpoint.Status = request.IsSuccess ? Domain.Enums.EndpointStatus.Online : Domain.Enums.EndpointStatus.Offline;
			_endpointRepository.Update(endpoint);

			var history = new Domain.Entities.PingHistory
			{
				EndpointId = request.EndpointId,
				IsSuccess = request.IsSuccess,
				ResponseTimeInMilliseconds = request.ResponseTimeInMs,
				StatusCode = request.StatusCode,
				CheckedAt = DateTime.UtcNow
			};

			await _pingHistoryRepository.AddAsync(history);
			await _pingHistoryRepository.SaveChangesAsync();

			await _notificationService.SendEndpointUpdateAsync();
		}
	}
}
