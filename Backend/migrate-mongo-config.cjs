require("dotenv").config();

module.exports = {
  mongodb: {
    url: process.env.MONGO_URL,
    databaseName: "TaskManager",
    options: {},
  },

  migrationsDir: "migrations",

  changelogCollectionName: "changelog",

  lockCollectionName: "changelog_lock",

  lockTtl: 0,

  migrationFileExtension: ".js",

  useFileHash: false,

  // 👇 This is the missing property
  moduleSystem: "commonjs",
}