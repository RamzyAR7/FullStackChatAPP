using chatapp_v1._0._0.Models;
using System.Collections.Concurrent;

namespace chatapp_v1._0._0.Data
{
    public class ShareDB
    {
        private readonly ConcurrentDictionary<string, UserConnection> _connection = new ConcurrentDictionary<string, UserConnection>();

        //methoud
        public ConcurrentDictionary<string, UserConnection> connections => _connection;
    }
}
