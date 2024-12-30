import AuthController from "../controllers/auth.js";

export default async function AuthMiddleware(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const user = await AuthController.verifyToken(token);
        req.user = user;
        next();
    } catch (error) {
        console.error('Auth error:', error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}