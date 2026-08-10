import { type Request, type Response, type NextFunction } from "express"
import type {NewUser} from '../types/types.js'


export const validateLoginInfo = (req: Request, res: Response, next: NextFunction) => {
    const user: NewUser = req.body
    if (!user.email || !user.name) {
        return res.status(400).json({message: "All fields are mandatory"})
    }
    next()
}