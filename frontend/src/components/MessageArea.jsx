import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import dp from "../assets/dp.png";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../store/reducer/UserSlice";
import { RiEmojiStickerLine, RiSendPlane2Fill } from "react-icons/ri";
import { FaImages } from "react-icons/fa6";
import EmojiPicker from "emoji-picker-react";
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import axios from "axios";
import { serverUrl } from "../main";
import { setMessages } from "../store/reducer/MessageSlice";

const Message = () => {
  const { selectedUser, userData, socket, onlineUsers } = useSelector(
    (state) => state.user
  );

  const { messages } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const [showPicker, setShowPicker] = useState(false);
  const [input, setInput] = useState("");
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);

  const image = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (input.length === 0 && backendImage == null) {
      return null;
    }

    try {
      const formData = new FormData();

      formData.append("message", input);

      if (backendImage) {
        formData.append("image", backendImage);
      }

      const result = await axios.post(
        `${serverUrl}/api/message/send/${selectedUser._id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      dispatch(setMessages([...messages, result.data]));

      setInput("");
      setFrontendImage(null);
      setBackendImage(null);

      if (image.current) {
        image.current.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEmojiClick = (emojiData) => {
    setInput((prevInput) => prevInput + emojiData.emoji);
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (mess) => {
      dispatch(setMessages([...messages, mess]));
    });

    return () => socket.off("newMessage");
  }, [messages, socket, dispatch]);

  return (
    <main className={`${selectedUser ? "flex" : "hidden"} sm:flex flex-1 h-full flex-col bg-rose-50`}>

      {selectedUser && (
        <>
          {/* Header */}
          <div className="h-16 sm:h-[72px] px-3 sm:px-5 bg-white border-b border-rose-100 flex items-center gap-3 shadow-[0_1px_8px_rgba(244,63,94,0.06)]">

            {/* Back Button */}
            <div
              className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full hover:bg-rose-50 transition cursor-pointer"
              onClick={() => dispatch(setSelectedUser(null))}
            >
              <IoIosArrowRoundBack className="text-rose-500 text-4xl" />
            </div>

            {/* Profile */}
            <div className="flex items-center gap-3 min-w-0">

              <div className="relative shrink-0">
                <img
                  src={selectedUser?.image || dp}
                  alt="profile"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover ring-2 ring-rose-100"
                />

                {onlineUsers.includes(selectedUser._id) && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
                )}
              </div>

              {/* User Info */}
              <div className="min-w-0">

                <h2 className="text-sm sm:text-base font-semibold text-slate-800 truncate">
                  {selectedUser?.name || selectedUser?.username || "user"}
                </h2>

                {onlineUsers.includes(selectedUser._id) && (
                  <p className="text-xs text-rose-400">Online</p>
                )}

              </div>
            </div>
          </div>

          {/* Message Area */}
          <div className="relative flex flex-col flex-1 min-h-0 bg-gradient-to-br from-rose-50 via-pink-50 to-slate-50">

            {/* Messages */}
            <div className="flex-1 min-h-0 overflow-y-auto">
              <div className="p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4">

                {messages?.map((mess) =>
                  mess.sender === userData?.user?._id ? (
                    <SenderMessage
                      key={mess._id}
                      image={mess.image}
                      message={mess.message}
                    />
                  ) : (
                    <ReceiverMessage
                      key={mess._id}
                      image={mess.image}
                      message={mess.message}
                    />
                  )
                )}

              </div>
            </div>

            {/* Emoji Picker */}
            {showPicker && (
              <div className="absolute z-50 bottom-[58px] left-2 right-2 sm:left-auto sm:right-4 sm:bottom-[65px] w-auto sm:w-[350px] md:w-[380px] max-w-[calc(100%-16px)]">
                <div className="w-full overflow-hidden rounded-2xl shadow-xl border border-rose-100">
                  <EmojiPicker
                    width="100%"
                    height={window.innerWidth < 640 ? 300 : 330}
                    onEmojiClick={onEmojiClick}
                  />
                </div>
              </div>
            )}

          </div>
        </>
      )}

      {/* No Selected User */}
      {!selectedUser && (
        <div className="flex-1 flex items-center justify-center px-6 bg-gradient-to-br from-rose-50 via-pink-50 to-slate-50">

          <div className="text-center">

            <div className="mx-auto mb-6 w-20 h-20 rounded-[28px] bg-white border border-rose-100 shadow-sm flex items-center justify-center">
              <span className="text-4xl">💗</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
              Welcome to <span className="text-rose-500">SaKhu</span>
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-sm mx-auto leading-relaxed">
              Chat with your friends and stay connected.
              <br />
              <span className="text-rose-400">
                Select a conversation to start chatting 💕
              </span>
            </p>

          </div>
        </div>
      )}

      {/* Input Area */}
      {selectedUser && (
        <div className="p-3 border-t border-rose-100 bg-white/95 backdrop-blur-sm shadow-[0_-2px_12px_rgba(244,63,94,0.05)]">

          {/* Image Preview */}
          {frontendImage && (
            <div className="mb-2 relative w-fit">

              <img
                src={frontendImage}
                alt="preview"
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl border border-rose-100"
              />

              <button
                type="button"
                onClick={() => {
                  setFrontendImage(null);
                  setBackendImage(null);

                  if (image.current) {
                    image.current.value = "";
                  }
                }}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-rose-500 text-white text-xs flex items-center justify-center hover:bg-rose-600 transition"
              >
                ✕
              </button>

            </div>
          )}

          {/* Input Form */}
          <form className="flex items-center gap-1.5 sm:gap-2" onSubmit={handleSendMessage}>

            {/* Emoji */}
            <button
              type="button"
              className="shrink-0 text-slate-400 hover:text-rose-500 hover:bg-rose-50 text-xl p-2 rounded-xl transition"
              onClick={() => setShowPicker((prev) => !prev)}
            >
              <RiEmojiStickerLine />
            </button>

            {/* Image */}
            <button
              type="button"
              className="shrink-0 text-slate-400 hover:text-rose-500 hover:bg-rose-50 text-xl p-2 rounded-xl transition"
              onClick={() => image.current.click()}
            >
              <FaImages />
            </button>

            {/* File Input */}
            <input
              type="file"
              accept="image/*"
              ref={image}
              hidden
              onChange={handleImage}
            />

            {/* Message Input */}
            <input
              type="text"
              placeholder="Write something..."
              className="min-w-0 flex-1 bg-rose-50/60 border border-rose-100 rounded-2xl px-3 sm:px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:bg-white focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />

            {/* Send */}
            {(input.length > 0 || backendImage != null) && (
              <button
                type="submit"
                className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl shadow-sm shadow-rose-200 transition flex items-center justify-center"
              >
                <RiSendPlane2Fill className="text-xl" />
              </button>
            )}

          </form>
        </div>
      )}

    </main>
  );
};

export default Message;