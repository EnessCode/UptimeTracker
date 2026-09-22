using Microsoft.AspNetCore.SignalR;
using UptimeTracker.Application.Interfaces.Services;
using UptimeTracker.WebApi.Hubs;

namespace UptimeTracker.WebApi.Services
{
	public class NotificationService : INotificationService
	{
		private readonly IHubContext<UptimeHub> _hubContext;

		public NotificationService(IHubContext<UptimeHub> hubContext)
		{
			_hubContext = hubContext;
		}

		public async Task SendEndpointUpdateAsync()
		{
			await _hubContext.Clients.All.SendAsync("ReceiveUpdate");
		}
	}
}