import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../store/reducer/MessageSlice";

const getMessage = () => {
  const dispatch = useDispatch();

  const { selectedUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser?._id) {
        dispatch(setMessages([]));
        return;
      }

      try {
        const result = await axios.get(
          `${serverUrl}/api/message/get/${selectedUser._id}`,
          {
            withCredentials: true,
          }
        );

        dispatch(setMessages(result.data));
      } catch (error) {
        // New conversation ke case mein
        if (error.response?.status === 400) {
          dispatch(setMessages([]));
          return;
        }

        console.log("GET MESSAGE ERROR:", error);
      }
    };

    fetchMessages();
  }, [selectedUser, dispatch]);
};

export default getMessage;