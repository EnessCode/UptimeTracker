using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UptimeTracker.Application.Interfaces.Services
{
	public interface INotificationService
	{
		Task SendEndpointUpdateAsync();
	}
}
