using Microsoft.Extensions.Configuration;
using StaffingCompany.Application.DataAccess;
using StaffingCompany.Application.Model.Assignment;
using System;
using System.Data;
using System.Data.SqlClient;

namespace StaffingCompany.Application.Service.Assignment
{
    public class AssignmentService : IAssignmentService
    {
        private string _connectionString;
        private DataAccessHelper _dah;

        public AssignmentService(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DatabaseConnection");
            _dah = new DataAccessHelper(_connectionString);
        }

        public dynamic AddAssignment(MvAssignment assignment)
        {
            using (var dbConnection = _dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.CommandText = "SpAssignmentIns";
                dbCommand.Parameters.Add("@Json", SqlDbType.NVarChar);
                dbCommand.Parameters["@Json"].Value = "{\"jobId\":\"" + assignment.JobId + "\"," +
                                                      "\"employeeId\":\"" + assignment.EmployeeId + "\"," +
                                                      "\"description\":\"" + assignment.Description + "\"," +
                                                      "\"status\":\"" + assignment.Status + "\"," +
                                                      "\"unit\":\"" + assignment.Unit + "\"," +
                                                      "\"rate\":\"" + assignment.Rate + "\"," +
                                                      "\"insertPersonId\":" + assignment.InsertPersonId + "}";
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

        public dynamic EditAssignment(MvAssignment assignment)
        {
            using (var dbConnection = _dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.CommandText = "SpAssignmentUpd";
                dbCommand.Parameters.Add("@Json", SqlDbType.NVarChar);
                dbCommand.Parameters["@Json"].Value = "{\"assignmentId\":\"" + assignment.AssignmentId + "\"," +
                                                      "\"jobId\":\"" + assignment.JobId + "\"," +
                                                      "\"employeeId\":\"" + assignment.EmployeeId + "\"," +
                                                      "\"description\":\"" + assignment.Description + "\"," +
                                                      "\"status\":\"" + assignment.Status + "\"," +
                                                      "\"unit\":\"" + assignment.Unit + "\"," +
                                                      "\"rate\":\"" + assignment.Rate + "\"," +
                                                      "\"insertPersonId\":" + assignment.InsertPersonId + "}";
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

        public dynamic GetAllAssignment()
        {
            using (var dbConnection = _dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.CommandText = "SpAssignmentSel";

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

        public dynamic GetAssignment(string json)
        {
            using (var dbConnection = _dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.CommandText = "SpAssignmentSel";
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

        public dynamic MarkAssignmentAsComplete(MvCompleteAssignment completeAssignment)
        {
            using (var dbConnection = _dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.CommandText = "SpAssignmentStatusTsk";
                dbCommand.Parameters.Add("@Json", SqlDbType.NVarChar);
                dbCommand.Parameters["@Json"].Value = dbCommand.Parameters["@Json"].Value = "{\"assignmentId\":" + completeAssignment.AssignmentId + "," +
                                                      "\"insertPersonId\":" + completeAssignment.InsertPersonId + "}"; 

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
