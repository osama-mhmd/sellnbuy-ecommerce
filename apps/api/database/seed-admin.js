import bcrypt from 'bcryptjs';
import { db } from '../config/db.js';
import { sql } from 'drizzle-orm';

async function seedAdmin() {
    const email = process.argv[2];
    const password = process.argv[3];

    if (!email || !password) {
        console.error("❌ Error: Please provide an email and password.");
        console.log("👉 Usage: node database/seed-admin.js <email> <password>");
        process.exit(1);
    }

    try {
        console.log(`🚀 Seeding Admin with email: ${email}...`);

        const checkQuery = sql`SELECT * FROM admins WHERE email = ${email}`;
        const checkResult = await db.execute(checkQuery);

        const rows = checkResult.rows || checkResult;

        if (rows.length > 0) {
            console.log("⚡ Admin with this email already exists!");
            process.exit(0);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const name = "Super Admin";

        const insertQuery = sql`
            INSERT INTO admins (name, email, password)
            VALUES (${name}, ${email}, ${hashedPassword})
            RETURNING id, name, email
        `;
        const result = await db.execute(insertQuery);
        const newAdmin = result.rows ? result.rows[0] : result[0];

        console.log("✅ Super Admin created successfully!");
        console.log(newAdmin);

    } catch (error) {
        console.error("❌ Database error during seeding:", error);
    } finally {
        process.exit(0);
    }
}

seedAdmin();
