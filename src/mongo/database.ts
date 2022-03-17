import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { users?: mongoDB.Collection } = {};

const connectToDatabase = async () => {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING!
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const usersColletion: mongoDB.Collection = db.collection("users");

  collections.users = usersColletion;

  console.log(`Successfully connected to database!`);
};

export default connectToDatabase;
