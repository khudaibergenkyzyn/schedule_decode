// require('dotenv').config();
console.log(process.env);
// module.exports = {
//   SECRET_KEY : 'secret1122',
//   development: {
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     dialect: "postgres",
//     define : {
//       timestamps : true
//     }
//   }
// }
module.exports = {
  SECRET_KEY : 'secret1122',
  development: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    dialect: "postgres",
    define : {
      timestamps : true
    }
  }
}
