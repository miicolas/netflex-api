import jwt from 'jsonwebtoken';
import AuthController from '../../controllers/auth.js';

export default async function Route_Login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Missing required fields!" });
        }



        const user = await AuthController.login({ email, password });



        if (!user) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }


        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn
            : '24h' });


        return res.status(200).json({
            message: "Login successful!",
            data: {
                token
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            message: "Login failed!",
            error: error.message
        });
    }
}

