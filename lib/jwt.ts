import jwt, { SignOptions } from 'jsonwebtoken';
import 'dotenv/config'
export function signJwt(payload: Object, options: SignOptions) {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string
    return jwt.sign(payload, JWT_SECRET_KEY, {
        ...(options && options),
        algorithm: 'HS256'
    }) 

}

export function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!)
        return decoded
    } catch {
        return null
    } 
}
