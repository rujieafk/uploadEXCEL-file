const config = {
    user: 'admin',
    password: '123',
    server: 'IKSCEWKS02592',
    database: 'EmployeeDB',
    options:{
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instancename: 'SQLEXPRESS'    
    },
    port: 1433
}
module.exports = config;
// export default config;