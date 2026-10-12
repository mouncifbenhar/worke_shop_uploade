import "dotenv/config";
import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";

const PORT = process.env.PORT || 4000;

if (!process.env.JWT_SECRET || !process.env.MONGODB_URI) {
    throw new Error("JWT_SECRET and MONGODB_URI are required");
}

await connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});