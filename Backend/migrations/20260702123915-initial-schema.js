module.exports = {
  /**
   * Run the migration
   */
  async up(db) {
    await db.createCollection("notes", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["task"],
          properties: {
            task: {
              bsonType: "string",
              description: "Task is required",
            },
            disc: {
              bsonType: "string",
            },
            completed: {
              bsonType: "bool",
            },
            favorite: {
              bsonType: "bool",
            },
          },
        },
      },
    });

    // Create an index on the task field (optional)
    await db.collection("notes").createIndex({ task: 1 });
  },

  /**
   * Rollback the migration
   */
  async down(db) {
    await db.dropCollection("notes");
  },
};