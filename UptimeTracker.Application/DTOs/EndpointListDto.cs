using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UptimeTracker.Application.DTOs
{
	public class EndpointListDto
	{
		public Guid Id { get; set; }
		public string Name { get; set; } = string.Empty;
		public string Url { get; set; } = string.Empty;
		public int CheckIntervalInMinutes { get; set; }
		public string Status { get; set; } = string.Empty;
		public bool IsActive { get; set; }
		public DateTime? LastCheckedAt { get; set; }
	}
}
