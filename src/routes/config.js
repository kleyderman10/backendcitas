import sql from 'mssql/msnodesqlv8';
const config=new sql.ConnectionPool({
    //database: "KCREC",
    //server: "SERVERKRYSTALOS",
    connectionString: 'Driver={SQL Server Native Client 11.0};Server={SERVERKRYSTALOS};Database={KPRUEBASCBA};Trusted_Connection={yes};',
    driver: "msnodesqlv8",
    //options: {
    //  trustedConnection: true
    //}
});

module.exports=config;