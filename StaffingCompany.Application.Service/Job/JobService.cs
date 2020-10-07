using Microsoft.Extensions.Configuration;
using StaffingCompany.Application.DataAccess;
using StaffingCompany.Application.Model.Job;
using System;
using System.Data;
using System.Data.SqlClient;

namespace StaffingCompany.Application.Service.Job
{
    public class JobService : IJobService
    {
        private string _connectionString;
        private DataAccessHelper _dah;

        public JobService(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DatabaseConnection");
            _dah = new DataAccessHelper(_connectionString);
        }

        public dynamic AddJob(MvJob job)
        {
            using (var dbConnection = _dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.CommandText = "SpJobIns";
                dbCommand.Parameters.Add("@Json", SqlDbType.NVarChar);
                dbCommand.Parameters["@Json"].Value = "{\"post\":\"" + job.Post + "\"," +
                                                      "\"organizationId\":\"" + job.OrganizationId + "\"," +
                                                      "\"insertPersonId\":" + job.InsertPersonId + "}";
                using (SqlDataReader reader = dbCommand.ExecuteReader())
                {
                    try
                    {
                        if (reader.HasRows)
                        {
                            return _dah.GetJson(reader);
                        }
                        else
                        {
                            return null;
                        }
                    }
                    catch (Exception e)
                    {
                        throw e;
                    }
                }
            }
        }

        public dynamic EditJob(MvJob job)
        {
            using (var dbConnection = _dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.CommandText = "SpJobUpd";
                dbCommand.Parameters.Add("@Json", SqlDbType.NVarChar);
                dbCommand.Parameters["@Json"].Value = "{\"post\":\"" + job.Post + "\"," +
                                                      "\"jobId\":\"" + job.JobId + "\"," +
                                                      "\"organizationId\":\"" + job.OrganizationId + "\"," +
                                                      "\"insertPersonId\":" + job.InsertPersonId + "}";
                using (SqlDataReader reader = dbCommand.ExecuteReader())
                {
                    try
                    {
                        if (reader.HasRows)
                        {
                            return _dah.GetJson(reader);
                        }
                        else
                        {
                            return null;
                        }
                    }
                    catch (Exception e)
                    {
                        throw e;
                    }
                }
            }
        }

        public dynamic GetAllJob()
        {
            using (var dbConnection = _dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.CommandText = "SpJobSel";

                using (SqlDataReader reader = dbCommand.ExecuteReader())
                {
                    try
                    {
                        if (reader.HasRows)
                        {
                            return _dah.GetJson(reader);
                        }
                        else
                        {
                            return null;
                        }

                    }
                    catch (Exception e)
                    {
                        throw e;
                    }
                }

            }
        }

        public dynamic GetJob(string json)
        {
            using (var dbConnection = _dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.CommandText = "SpJobSel";
                dbCommand.Parameters.Add("@Json", SqlDbType.NVarChar);
                dbCommand.Parameters["@Json"].Value = json;

                using (SqlDataReader reader = dbCommand.ExecuteReader())
                {
                    try
                    {
                        if (reader.HasRows)
                        {
                            return _dah.GetJson(reader);
                        }
                        else
                        {
                            return null;
                        }

                    }
                    catch (Exception e)
                    {
                        throw e;
                    }
                }
            }
        }
    }
}
