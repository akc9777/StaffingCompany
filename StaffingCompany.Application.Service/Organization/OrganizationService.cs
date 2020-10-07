using Microsoft.Extensions.Configuration;
using StaffingCompany.Application.DataAccess;
using StaffingCompany.Application.Model.Organization;
using System;
using System.Data;
using System.Data.SqlClient;


namespace StaffingCompany.Application.Service.Organization
{
    public class OrganizationService : IOrganizationService
    {
        private string _connectionString;
        private DataAccessHelper _dah;

        public OrganizationService(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DatabaseConnection");
            _dah = new DataAccessHelper(_connectionString);
        }

        public dynamic AddOrganization(MvOrganization organization)
        {
            using (var dbConnection = _dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.CommandText = "SpOrganizationInsertTsk";
                dbCommand.Parameters.Add("@Json", SqlDbType.NVarChar);
                dbCommand.Parameters["@Json"].Value = "{\"name\":\"" + organization.Name + "\"," +
                                                      "\"address\":\"" + organization.Address + "\"," +
                                                      "\"email\":\"" + organization.Email + "\"," +
                                                      "\"mobile\":\"" + organization.Mobile + "\"," +
                                                      "\"insertPersonId\":" + organization.InsertPersonId + "}";
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

        public dynamic EditOrganization(MvOrganization organization)
        {
            using (var dbConnection = _dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.CommandText = "SpOrganizationUpdateTsk";
                dbCommand.Parameters.Add("@Json", SqlDbType.NVarChar);
                dbCommand.Parameters["@Json"].Value = "{\"name\":\"" + organization.Name + "\"," +
                                                      "\"address\":\"" + organization.Address + "\"," +
                                                      "\"email\":\"" + organization.Email + "\"," +
                                                      "\"mobile\":\"" + organization.Mobile + "\"," +
                                                      "\"organizationId\":\"" + organization.OrganizationId + "\"," +
                                                      "\"insertPersonId\":" + organization.InsertPersonId + "}";
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

        public dynamic GetAllOrganization()
        {
            using (var dbConnection = _dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.CommandText = "SpOrganizationSel";

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

        public dynamic GetOrganization(string json)
        {
            using (var dbConnection = _dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.CommandText = "SpOrganizationSel";
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
