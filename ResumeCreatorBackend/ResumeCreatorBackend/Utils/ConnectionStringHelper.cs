using Npgsql;
using System;

namespace ResumeCreatorBackend.Utils
{
    public static class ConnectionStringHelper
    {
        public static string GetPostgresConnectionStringFromEnv(string env_var_name)
        {
            var databaseUrl = Environment.GetEnvironmentVariable(env_var_name);
            if (string.IsNullOrWhiteSpace(databaseUrl))
                throw new InvalidOperationException("Env variable is not set.");

            var uri = new Uri(databaseUrl);
            var userInfo = uri.UserInfo.Split(':');

            var builder = new NpgsqlConnectionStringBuilder
            {
                Host = uri.Host,
                Port = uri.Port > 0 ? uri.Port : 5432,
                Username = userInfo[0],
                Password = userInfo[1],
                Database = uri.AbsolutePath.TrimStart('/'),
                SslMode = SslMode.Require,
                TrustServerCertificate = true // Set as needed
            };

            return builder.ConnectionString;
        }
    }
}
