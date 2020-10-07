using Newtonsoft.Json;
using System;
using System.Data;
using System.Data.SqlClient;

namespace StaffingCompany.Application.DataAccess
{
    public class DataAccessHelper
    {
        private SqlConnection _dbConnection;
        private string _dbConnectionString;


        public DataAccessHelper(string dbConnectionString)
        {
            _dbConnectionString = dbConnectionString;
        }

        public SqlConnection GetConnection()
        {
            try
            {
                SetConnection();
                return _dbConnection;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void SetConnection()
        {
            _dbConnection = new SqlConnection(_dbConnectionString);
            if (_dbConnection.State == ConnectionState.Closed)
            {
                _dbConnection.Open();
            }
            else
            {
                _dbConnection.Close();
                _dbConnection.Open();
            }
        }

        public dynamic GetJson(SqlDataReader reader)
        {
            var dataSet = new DataTable();
            dataSet.Load(reader);

            if (dataSet.Rows[0] != null &&
                dataSet.Rows[0]["Json"].ToString() != "")
            {
                return JsonConvert.DeserializeObject(dataSet.Rows[0]["Json"].ToString());
            }
            else
            {
                return null;
            }
        }
    }
}
