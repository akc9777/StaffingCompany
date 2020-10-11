using Microsoft.Extensions.Configuration;
using StaffingCompany.Application.DataAccess;
using StaffingCompany.Application.Model.Invoice;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace StaffingCompany.Application.Service.Invoice
{
    public class InvoiceService : IInvoiceService
    {
        private string _connectionString;
        private DataAccessHelper _dah;

        public InvoiceService(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DatabaseConnection");
            _dah = new DataAccessHelper(_connectionString);
        }
        public dynamic AddInvoice(MvInvoice invoice)
        {
            using (var dbConnection = _dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.CommandText = "SpInvoiceInsertTsk";
                dbCommand.Parameters.Add("@Json", SqlDbType.NVarChar);
                dbCommand.Parameters["@Json"].Value = "{\"entityType\":" + invoice.EntityType + "," +
                                                      "\"entityId\":" + invoice.EntityId + "," +
                                                      "\"transaction\":\"" + invoice.Transactions + "\"," +
                                                      "\"insertPersonId\":" + invoice.InsertPersonId + "}";
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

        public dynamic GetAllInvoice()
        {
            using (var dbConnection = _dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.CommandText = "SpInvoiceSel";

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

        public dynamic GetInvoice(string json)
        {
            using (var dbConnection = _dah.GetConnection())
            {
                var dbCommand = dbConnection.CreateCommand();
                dbCommand.CommandType = CommandType.StoredProcedure;
                dbCommand.CommandText = "SpInvoiceDetailSel";
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
