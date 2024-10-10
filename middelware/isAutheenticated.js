import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check for the Authorization header
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided or invalid format" });
        }

        // Extract the token
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        // Verify the token and check its validity
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                // Handle token verification errors like expiration or invalid signature
                const message =
                    err.name === "TokenExpiredError"
                        ? "Token has expired"
                        : "Invalid token";

                return res.status(401).json({ message });
            }

            // Attach user ID from the token payload to the request object
            req.id = decoded.userId;

            // Proceed to the next middleware/route handler
            next();
        });
    } catch (error) {
        console.error("Authentication Error:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export default isAuthenticated;
