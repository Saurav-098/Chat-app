import React, { useEffect, useState } from "react";
import dp from "../assets/dp.png";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../main";
import axios from "axios";
import { setOtherUsers, setSearchData, setSelectedUser, setUserData } from "../store/reducer/UserSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { userData, otherUsers, selectedUser, onlineUsers, searchData } = useSelector((state) => state.user);

  const user = userData?.user || userData;

  const [input, setInput] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });

      dispatch(setUserData(null));
      dispatch(setOtherUsers(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/search?query=${input}`, {
        withCredentials: true,
      });

      dispatch(setSearchData(result.data));

      console.log("Search Result:", result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (input.trim()) {
      handleSearch();
    } else {
      dispatch(setSearchData([]));
    }
  }, [input]);

  const usersToShow = input.trim() ? searchData : otherUsers;

  return (
    <aside className={`w-full sm:w-80 md:w-96 h-full bg-rose-50 flex flex-col ${selectedUser ? "hidden lg:flex" : "flex"}`}>

      {/* Header */}
      <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 px-5 pt-7 pb-8 rounded-b-[55px] shadow-[0_8px_25px_rgba(244,63,94,0.18)]">

        <div className="flex items-center justify-between">
          <h1 className="text-white text-2xl font-bold tracking-wide">
            SaKhu
          </h1>

          <span className="text-white/80 text-lg">
            ♡
          </span>
        </div>

        <div className="mt-6 flex items-center justify-between">

          <div className="min-w-0">
            <p className="text-rose-100 text-sm font-medium">
              Hii,
            </p>

            <h2 className="text-white text-xl font-bold mt-1 truncate max-w-[190px]">
              {user?.name || user?.username || "User"}
            </h2>

            <p className="text-white/70 text-xs mt-1">
              Stay connected 💕
            </p>
          </div>

          <div className="relative shrink-0">
            <img
              src={user?.image || dp}
              alt="profile"
              className="w-14 h-14 rounded-full object-cover border-4 border-white/80 shadow-lg cursor-pointer"
              onClick={() => navigate("/profile")}
            />

            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-[3px] border-white" />
          </div>

        </div>
      </div>

      {/* Search */}
      <div className="px-4 pt-5 pb-3">

        <div className="relative">

          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search chats..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-white border border-rose-100 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-700 outline-none shadow-sm placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition"
          />

        </div>
      </div>

      {/* Section Header */}
      <div className="px-5 pt-2 pb-2 flex items-center justify-between">

        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {input.trim() ? "Search Results" : "Messages"}
        </h3>

        <span className="text-xs text-rose-400 font-medium">
          {usersToShow?.length || 0}
        </span>

      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-3 py-1">

        {usersToShow?.length > 0 ? (

          usersToShow.map((user) => {

            const isSelected = selectedUser?._id === user._id;
            const isOnline = onlineUsers?.includes(user._id);

            return (
              <div
                key={user._id}
                onClick={() => dispatch(setSelectedUser(user))}
                className={`group relative flex items-center gap-3 px-3 py-3.5 mb-1.5 rounded-2xl cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "bg-white shadow-[0_4px_18px_rgba(244,63,94,0.12)]"
                    : "hover:bg-white/80 hover:shadow-sm"
                }`}
              >

                {/* Selected Indicator */}
                {isSelected && (
                  <span className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-rose-500" />
                )}

                {/* Profile */}
                <div className="relative shrink-0">

                  <img
                    src={user.image || dp}
                    alt={user.username}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover transition-all duration-200 ${
                      isSelected
                        ? "ring-2 ring-rose-300 ring-offset-2 ring-offset-white"
                        : "ring-2 ring-white group-hover:ring-rose-100"
                    }`}
                  />

                  {/* Online */}
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-[3px] border-white shadow-sm" />
                  )}

                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">

                  <div className="flex items-center justify-between gap-2">

                    <h2 className="text-[14px] sm:text-[15px] font-semibold text-slate-800 truncate">
                      {user.username}
                    </h2>

                    {isOnline && (
                      <span className="hidden sm:block shrink-0 text-[10px] font-semibold text-emerald-500">
                        online
                      </span>
                    )}

                  </div>

                  <div className="flex items-center gap-1.5 mt-1">

                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        isOnline ? "bg-emerald-400" : "bg-slate-300"
                      }`}
                    />

                    <p className="text-xs sm:text-[13px] text-slate-400 truncate">
                      {isOnline ? "Active now" : "Start a conversation"}
                    </p>

                  </div>

                </div>

                {/* Arrow */}
                <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-rose-300 text-xl">
                    ›
                  </span>
                </div>

              </div>
            );
          })

        ) : (

          <div className="flex flex-col items-center justify-center py-16 px-5 text-center">

            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm mb-4">
              <span className="text-3xl">
                {input.trim() ? "🔍" : "💬"}
              </span>
            </div>

            <h3 className="text-sm font-semibold text-slate-700">
              {input.trim() ? "No user found" : "No conversations yet"}
            </h3>

            <p className="text-xs text-slate-400 mt-1">
              {input.trim()
                ? "Try searching with another username"
                : "Start a conversation with someone"}
            </p>

          </div>

        )}

      </div>

      {/* Logout */}
      <div className="p-4 bg-rose-50 border-t border-rose-100">

        <button
          className="w-full py-3 rounded-2xl bg-white border border-rose-200 hover:bg-rose-500 hover:border-rose-500 hover:text-white text-rose-500 font-semibold active:scale-[0.98] transition-all duration-200 shadow-sm"
          onClick={handleLogOut}
        >
          Logout
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;