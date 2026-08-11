import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ChatInterface.css'

export interface Message {
    senderId: string,
    receiverId: string,
    data: string,
    time: string
}

export type InMemDetails = {
    id: string,
    name: string
}

const scrollSize = 50

const ChatInterface = () => {

    const navigate = useNavigate()
    const [myDetails, setMyDetails] = React.useState<InMemDetails>()
    const [receiverDetails, setReceiverDetails] = React.useState<InMemDetails>()
    const [ws, setWs] = React.useState<WebSocket>()
    const [commDetFlag, setCommDetFlag] = React.useState<boolean>(false)
    React.useEffect(() => {
        const storedMyDetails = sessionStorage.getItem("myDetails")
        const storedReceiverDetails = sessionStorage.getItem("receiverDetails")

        if (storedMyDetails) {
            setMyDetails(JSON.parse(storedMyDetails))
        }

        if (storedReceiverDetails) {
            setReceiverDetails(JSON.parse(storedReceiverDetails))
        }
    }, [])

    React.useEffect(()=>{
         if (!myDetails || !receiverDetails) return
         
    }, [])
    
    React.useEffect(()=>{
        if (!myDetails) return

        const socket = new WebSocket(`ws://localhost:3000?userId=${myDetails.id}`)

        socket.onopen = () => {
            console.log("Connected to Server")
            setCommDetFlag(true)
        }

        socket.onmessage = (event) => {
            const msg : Message = JSON.parse(event.data)
            console.log("Received:", event.data)
            setMessages(prev => [...prev, msg ])
        }

        socket.onerror = (error) => {
            console.error("WebSocket error:", error)
        }

        setWs(socket)

    }, [myDetails])

    const [initialMessages, setInitialMessages] = React.useState<Message[]>([])
    const [messages, setMessages] = React.useState<Message[]>(
    initialMessages.slice(-scrollSize)
    );
    const [currentMessage, setCurrentMessage] = React.useState("");
    const [scrollingUp, setscrollingUp] = React.useState(false);
    const chatWindowRef = React.useRef<HTMLDivElement>(null);
    const topIndex = React.useRef(scrollSize);

    React.useEffect(() => {
        !scrollingUp && dragToBottom();
    }, [messages, scrollingUp]);

    const sendMessageButtonHandler = () => {
        if (!myDetails || !receiverDetails) return
        const timestamp = Date.now();
        const dateObject = new Date(timestamp);
        const result =
            {
            senderId: myDetails.id,
            receiverId: receiverDetails.id,
            data: currentMessage,
            time: dateObject.toLocaleTimeString(),
            }
        
        setMessages(prev => [...prev, result])
        setCurrentMessage("");
        ws?.send(JSON.stringify(result))
    };

    const handleScroll = () => {
        if (!chatWindowRef.current) return
        const ST = chatWindowRef.current.scrollTop;
        if (ST < 20) {
        const startIndex = Math.max(-topIndex.current - scrollSize, -1000);
        const oldChat = initialMessages.slice(startIndex, -topIndex.current);
        topIndex.current = -startIndex;
        setMessages((prev) => [...oldChat, ...prev]);
        }

        const SH = chatWindowRef.current.scrollHeight;
        const CH = chatWindowRef.current.clientHeight;
        if (SH - CH - ST > 20) {
        setscrollingUp(true);
        } else {
        setscrollingUp(false);
        }
    };

    const dragToBottom = () => {
        if (!chatWindowRef.current) return
        chatWindowRef.current.scrollTop =
        chatWindowRef.current.scrollHeight - chatWindowRef.current.clientHeight;
    };


    const closeChatBtnHandler = () => {
        if (!ws) return
        ws.close()
        navigate("/online")
    }

    return (<>
        {commDetFlag && myDetails && <div className="App">
            {receiverDetails && <div className="label">
                <h2>{receiverDetails.name.charAt(0).toUpperCase() + receiverDetails?.name.slice(1)}</h2>
                <button 
                    className="close-chat"
                    onClick = {closeChatBtnHandler}
                    > X </button>
            </div>}
            <div className="main-chat-container">
                <div
                className="chat-window"
                ref={chatWindowRef}
                onScroll={handleScroll}
                >
                {messages.map((message, index) => {
                    return (
                    <div
                        className="message"
                        key={`message.senderId-${index}`}
                        style={{
                        alignSelf:
                            message.senderId === myDetails.id ? "flex-end" : "flex-start",
                        }}
                    >
                        <span className="time">{message.time}</span> <br />
                        <div className="data">{message.data}</div>
                    </div>
                    );
                })}
                {scrollingUp && (
                    <button
                    className="scroll-to-bottom-button"
                    onClick={() => setscrollingUp(false)}
                    >
                    B
                    </button>
                )}
                </div>

                <div className="send-message">
                <div className="type-message">
                    <input
                    className="text"
                    type="text"
                    placeholder="Message..."
                    value={currentMessage}
                    onChange={(e) => {
                        setCurrentMessage(e.target.value);
                    }}
                    />
                </div>
                <button
                    className="send"
                    onClick={() => {
                    if (!currentMessage.trim()) {
                        setCurrentMessage("");
                        return;
                    }
                    sendMessageButtonHandler();
                    }}
                >
                    Send
                </button>
                </div>
            </div>
        </div>}
    </>
    )
}

export default ChatInterface