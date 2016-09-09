dbURIs = {
  test: "mongodb://localhost/meet2eat",
  development: "mongodb://localhost/meet2eat",
  production: process.env.MONGODB_URI || "mongodb://localhost/meet2eat"
}

module.exports = function(env) {
  return dbURIs[env];
}