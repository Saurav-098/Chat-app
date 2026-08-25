import React from "react";
import Mainroutes from "./routes/Mainroutes";
import getCurrentUser from "./hooks/CurrentUser";
import getOtherUsers from "./hooks/OtherUsers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { serverUrl } from "./main";
import { setonlineUsers, setSocket } from "./store/reducer/UserSlice";

const App = () => {
  getCurrentUser();
  getOtherUsers();
  const { userData, socket, onlineUsers } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {

    if (userData) {
      const socketio = io(`${serverUrl}`,{
        query: {
          userId: userData?.user?._id
        }
      })
      dispatch(setSocket(socketio));

      socketio.on("getOnlineUsers", (users) => {
        dispatch(setonlineUsers(users));
      });

      return () => socketio.close();

    }else{
      if(socket){
        socket.close()
        dispatch(setSocket(null))
      }
    }

  }, [userData]);

  return (
    <>
      <Mainroutes />
    </>
  );
};

export default App;
