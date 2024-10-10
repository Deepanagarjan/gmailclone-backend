import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        // Check if the Authorization header is present and properly formatted
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided or wrong format" });
        }

        // Extract the token from the Authorization header
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Check if the decoded token is valid
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Attach the decoded user ID to the request object for future use
        req.id = decoded.userId;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Authentication error:", error);  // Log the error for debugging
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export default isAuthenticated;
