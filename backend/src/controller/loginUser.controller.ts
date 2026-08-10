import { type Request, type Response } from 'express'
import { prisma } from '../lib/prisma.js'
import type { NewUser } from '../types/types.js'

export const loginUser = async (req: Request, res: Response) => {
    const user: NewUser = req.body
    
    let userExists = await prisma.user.findUnique({
        where: {email: user.email}
    })

    try {
        if (!userExists){
            userExists = await prisma.user.create({
            data: {name: user.name??"", email: user.email}
            })
        }
        try {
            await prisma.onlineUser.create({
            data: { userId: userExists?.id },
            });
        } catch {
            console.error("User Creation error");
        }
    }
    catch {
        console.error("User Creation error")
    }

    return res.status(200).json({message: userExists})

}