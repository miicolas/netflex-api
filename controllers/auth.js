import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import CypherController from "./cypher.js";


const prisma = new PrismaClient();

export default class AuthController {

    static async register({email, hash, name}) {
        if (!name || !hash || !email) {
            throw new Error("Missing required fields");
        }

        const user = await prisma.user.create({
            data: {
                email,
                password: hash,
                name
            }
        });

        return user;
    }

    static async verifyToken(token) {
        try {
            const user = jwt.verify(token, process.env.JWT_SECRET);
            return user;
        } catch (error) {
            throw new Error("Invalid token");
        }
    }

    static async login({email, password}) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return null;
        }
        if (!CypherController.comparePassword(password, user.password)) {
            return null;
        }
        return user;
    }
}