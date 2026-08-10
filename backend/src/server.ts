import express from 'express'
import { createServer } from 'http'
import { WebSocketServer, WebSocket } from 'ws'
import cors from 'cors'
import { validateLoginInfo } from './middleware/validateLoginInfo.js'
import { loginUser } from './controller/loginUser.controller.js'
import { prisma } from './lib/prisma.js' 
import type { Message } from './types/types.js'


const app = express()
app.use(cors())
app.use(express.json())

const server = createServer(app)
const wss = new WebSocketServer({ noServer: true })

app.post("/", validateLoginInfo, loginUser)
app.get("/online", async (_, res) => {

    const onlineUsers = await prisma.onlineUser.findMany({
        select: {
            user: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })

    return res.status(200).json({message: onlineUsers})
})

app.post("/logout", async (req, res) => {
    const {userId} = req.body
    clients.delete(userId);
    await prisma.onlineUser.deleteMany({
      where: { userId },
    });
    return res.status(200).json({message: "Logged Out!"})
})

server.on("upgrade", (req, ws, head) => {
    try {   
        
        wss.handleUpgrade(req, ws, head, (ws) => {
            wss.emit("connection", ws, req)
        })

    } catch {
        console.error("websocker authentication error")
        
        ws.write("500: Internal Server Error")
        ws.destroy()
    }
})

const clients = new Map<string, WebSocket>()

wss.on("connection", async (ws, req) => {

    //query url = http://localhost:9000?userId=..userId..
    const url = new URL(req.url ?? "", `http://${req.headers.host}`);
    const userId = url.searchParams.get("userId"); 

    if (!userId) {
        ws.close(400, "Invalid client Id")
        return
    }

    //mark the user -> online -> done when user Logged in

    console.log(`Connection Upgraded: User ${userId}`)
    
    // record the user's socket
    //Behavior when user sends a message
    clients.set(userId, ws)
    ws.on("message", async (rawData) => {
            
        try {
            const message: Message = JSON.parse(rawData.toString())
            // const oldChats = await prisma.message.findMany({
            //     where: { senderId: userId}
            // })
            console.log(message)
            await prisma.message.create({
                data: message,
            }); //either returns the created user or throws an error -> Not null | undefined
        
            // const receiver = await prisma.onlineUser.findUnique({
            //     where: {userId: message.receiverId}
            // })  // Not needed
            const receiverSocket = clients.get(message.receiverId)
            if (!receiverSocket) {
                return
            }
            
            receiverSocket.send(JSON.stringify(message))
        
        }catch (error) {
            console.error(error)
            ws.close(1011, "Internal Server error")
        }
    })

    //Behavior when userLogs out -> closes the connection
    ws.on("close", async ()=>{
        
         //delete will throw error if record not found. deleteMany returns 0

        console.log(`Connection Downgraded: Client ${userId}`)
    })

})

server.listen(3000, ()=> {
    console.log("Server running on port:3000")
})
