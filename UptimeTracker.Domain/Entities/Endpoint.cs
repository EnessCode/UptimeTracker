using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UptimeTracker.Domain.Enums;

namespace UptimeTracker.Domain.Entities
{
	public class Endpoint : BaseEntity
	{
		public string Name { get; set; } = string.Empty; 
		public string Url { get; set; } = string.Empty;  

		public int CheckIntervalInMinutes { get; set; } = 5;

		public bool IsActive { get; set; } = true; 
		public EndpointStatus Status { get; set; } = EndpointStatus.Pending;

		public DateTime? LastCheckedAt { get; set; }

		public ICollection<PingHistory> PingHistories { get; set; } = new List<PingHistory>();
	}
}
