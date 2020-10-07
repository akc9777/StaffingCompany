using Microsoft.Extensions.Configuration;
using StaffingCompany.Application.DataAccess;
using StaffingCompany.Application.Model.Employee;
using System;
using System.Data;
using System.Data.SqlClient;

namespace StaffingCompany.Application.Service.Employee
{
    public class EmployeeService : IEmployeeService
    {
        private string _connectionString;
        private DataAccessHelper _dah;

        public EmployeeService(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DatabaseConnection");
            _dah = new DataAccessHelper(_connectionString);
        }
        public dynamic AddEmployee(MvEmployee employee)
        {
            using(var dbConnection = _dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.CommandText = "SpEmployeeInsertTsk";
                dbCommand.Parameters.Add("@Json", SqlDbType.NVarChar);
                dbCommand.Parameters["@Json"].Value = "{\"firstName\":\"" + employee.FirstName + "\"," +
                                                      "\"middleName\":\"" + employee.MiddleName + "\"," +
                                                      "\"lastName\":\"" + employee.LastName + "\"," +
                                                      "\"address\":\"" + employee.Address + "\"," +
                                                      "\"email\":\"" + employee.Email + "\"," +
                                                      "\"mobile\":\"" + employee.Mobile + "\"," +
                                                      "\"organizationId\":\"" + employee.OrganizationId + "\"," +
                                                      "\"insertPersonId\":" + employee.InsertPersonId + "}";
                using(SqlDataReader reader = dbCommand.ExecuteReader())
                {
                    try
                    {
                        if(reader.HasRows)
                        {
                            return _dah.GetJson(reader);
                        }
                        else
                        {
                            return null;
                        }
                    }
                    catch(Exception e)
                    {
                        throw e;
                    }
                }
            }
        }

        public dynamic EditEmployee(MvEmployee employee)
        {
            using (var dbConnection = _dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.CommandText = "SpEmployeeUpdateTsk";
                dbCommand.Parameters.Add("@Json", SqlDbType.NVarChar);
                dbCommand.Parameters["@Json"].Value = "{\"firstName\":\"" + employee.FirstName + "\"," +
                                                      "\"middleName\":\"" + employee.MiddleName + "\"," +
                                                      "\"lastName\":\"" + employee.LastName + "\"," +
                                                      "\"address\":\"" + employee.Address + "\"," +
                                                      "\"email\":\"" + employee.Email + "\"," +
                                                      "\"mobile\":\"" + employee.Mobile + "\"," +
                                                      "\"employeeId\":\"" + employee.EmployeeId + "\"," +
                                                      "\"organizationId\":\"" + employee.OrganizationId + "\"," +
                                                      "\"insertPersonId\":" + employee.InsertPersonId + "}";
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

        public dynamic GetAllEmployee()
        {
            using (var dbConnection = _dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.CommandText = "SpEmployeeSel";

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

        public dynamic GetEmployee(string json)
        {
            using (var dbConnection = _dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.CommandText = "SpEmployeeSel";
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
