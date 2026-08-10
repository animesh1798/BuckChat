import React from "react";
import { useNavigate } from "react-router-dom";

interface User {

      id: string;
      name: string;
  
}

interface OnlineUserProp {
  user: User 
}

const OnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = React.useState<Array<OnlineUserProp>>([]);
  const navigate = useNavigate()
  const currentUserId = React.useRef<string>("")
  
  React.useEffect(() => {
    const myDetails = JSON.parse(sessionStorage.getItem("myDetails") ?? "");
    if (!myDetails) return
    currentUserId.current = myDetails.id
    const getData = async () => {
      // console.log("running")

      try {
        const response = await fetch("http://localhost:3000/online");
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);

        const newUsers: OnlineUserProp[] = data.message
        setOnlineUsers((prevUsers) => {
        // Don't update state if the list hasn't changed
          if (
            prevUsers.length === newUsers.length &&
            prevUsers.every(
              (prevUser, index) =>
                prevUser.user.id === newUsers[index].user.id &&
                prevUser.user.name === newUsers[index].user.name
            )
          ) {
            return prevUsers;
          }
          return newUsers;
        });
        console.log("Message :", data.message);
      } catch (error) {
        console.log(error);
      }
    };
    getData();


    const timerId = setInterval(getData, 5000)
    
    return () => clearInterval(timerId)
  }, []);

  const chatToUserButtonHandler = (user : User) => {
    sessionStorage.setItem("receiverDetails", JSON.stringify({id: user.id, name: user.name}))
    navigate("/chat")
  }

  const handleLogout = async () => {

    const response = await fetch("http://localhost:3000/logout", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({userId: currentUserId.current})
    })
    if (response.ok){
      navigate("/")
      console.log(await response.json())
    }

  }

  return (
    <>
    <button 
      className="logout"
      onClick = {handleLogout}
      >Logout</button>
      {onlineUsers.map((value, index) => {
        return (
          currentUserId.current !== value.user.id && <div className="user-card" key={index+1}>
            {index + 1} {value.user.name}
            <button 
              className="chat-to-user-button"
              onClick = {() => chatToUserButtonHandler(value.user)}
              >Chat</button>
          </div>
        );
      })}
    </>
  );
};

export default OnlineUsers;
