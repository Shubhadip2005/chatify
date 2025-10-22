import jwt from 'jsonwebtoken';

export function generateToken(userId, res) {
    const { JWT_SECRET } = process.env;
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: '7d',
    });

    res.cookie('jwt', token, {
        httpOnly: true,// prevent XSS attacks: cross-site scripting
        secure: process.env.NODE_ENV === 'development',
        sameSite: 'strict', // CSRF protection: cross-site request forgery
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return token;
}