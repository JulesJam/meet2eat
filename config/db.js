dbURIs = {
  test: "mongodb://localhost/meet2eat",
  development: "mongodb://localhost/meet2eat",
  production: process.env.MONGOLAB_URI || "mongodb://localhost/auth-express-app"
}

module.exports = function(env) {
  return dbURIs[env];
}