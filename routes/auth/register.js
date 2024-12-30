import AuthController from "../../controllers/auth.js";
import CypherController from "../../controllers/cypher.js";

export default async function Route_Register(req, res) {
    try {
        const { email, password, name } = req.body;
        console.log(req.body);

        if (!password || !email || !name) {
            return res.status(400).json({ message: "Missing required fields!" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long!" });
        }

        const hash = CypherController.hashPassword(password);

        if (!hash) {
            return res.status(500).json({ message: "Failed to hash password!" });
        }

        const user = await AuthController.register({ email, hash, name });

        return res.status(201).json({
            message: "Register successful!",
            data: user
        });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({
            message: "Registration failed!",
            error: error.message
        });
    }
}