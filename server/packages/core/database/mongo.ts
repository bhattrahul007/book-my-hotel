import mongoose from "mongoose";

const NODE_ENV = process.env.NODE_ENV;
console.assert(mongoose !== undefined);

export async function connect(mongouri: string): Promise<typeof mongoose> {
  try {
    console.log(`MongoConnection: Trying to connect with mongo server`);
    const connection = await mongoose.connect(mongouri);
    console.log("MongoConnection: Successfully connected to mongodb server.");
    if (NODE_ENV !== "production") {
      console.log(`MongoConnection: Connection url '${mongouri}'`);
    }
    return connection;
  } catch (error) {
    console.log(`MongoConnectionError: ${error}`);
    process.exit(1);
  }
}
