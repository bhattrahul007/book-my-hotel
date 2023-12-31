import mongoose from "mongoose";

console.assert(mongoose !== undefined);

export async function connect(mongouri: string): Promise<typeof mongoose> {
  try {
    console.log(`MongoConnection: Trying to connect with mongo server`);
    const connection = await mongoose.connect(mongouri);
    console.log("MongoConnection: Successfully connected to mongodb server.");
    return connection;
  } catch (error) {
    console.log(`MongoConnectionError: ${error}`);
    process.exit(1);
  }
}
