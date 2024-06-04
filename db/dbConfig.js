// const pgp = require("pg-promise")();
// require("dotenv").config();

// // const cn = {
// //   host: process.env.PG_HOST,
// //   port: process.env.PG_PORT,
// //   database: process.env.PG_DATABASE,
// //   user: process.env.PG_USER,
// //   password: process.env.PG_PASSWORD,
// // };

// // const db = pgp(cn);

// const dbUrl = process.env.DB_URL;

// const db = pgp(dbUrl);

// db.connect()
//   .then((obj) => {
//     console.log("Postgres connection established");
//     obj.done();
//   })
//   .catch((e) => {
//     console.log("ERROR:", e.message || e);
//   });

// module.exports = db;

const pgp = require("pg-promise")();
require("dotenv").config();

const connectionString = process.env["DB_URL"];
if (!connectionString) {
  throw new Error("No connection string; did you set proc ess.envDB_URL?");
}
const cn = {
  connectionString,
  allowExitOnIdle: true,
  max: 30,
};

const db = pgp(cn);

module.exports = db;
