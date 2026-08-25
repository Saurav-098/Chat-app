import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { serverUrl } from "../main";
import { setUserData } from "../store/reducer/UserSlice";
import axios from "axios";

const Profile = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(userData?.user?.name || "");
  const [frontendImage, setFrontendImage] = useState(
    userData?.user?.image || null,
  );
  const [backendImage, setBackendImage] = useState(null);
  const image = useRef();
  const [saving, setSaving] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", name);

      if (backendImage) {
        formData.append("image", backendImage);
      }
      const result = await axios.put(
        `${serverUrl}/api/user/profile`,
        formData,
        { withCredentials: true },
      );
      setSaving(false);
      dispatch(setUserData(result.data));
      navigate("/")
    } catch (error) {
      console.log(error);
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Your Profile</h1>

          <p className="text-slate-400 mt-2 text-sm">
            Manage your profile information
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
          {/* back icon */}
          <div className="fixed cursor-pointer" onClick={() => navigate("/")}>
            <IoIosArrowRoundBack className="text-slate-300 text-4xl" />
          </div>

          {/* Profile Photo */}
          <div
            className="flex flex-col items-center mb-7"
            onClick={() => image.current.click()}
          >
            <div className="relative cursor-pointer group">
              {/* Profile Image */}
              <div className="w-28 h-28 rounded-full overflow-hidden bg-slate-950 border-2 border-slate-700">
                {frontendImage ? (
                  <img
                    src={frontendImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    <FaCamera className="text-3xl" />
                  </div>
                )}
              </div>

              {/* Camera Icon */}
              <div className="absolute bottom-1 right-1 bg-indigo-600 hover:bg-indigo-500 w-9 h-9 rounded-full flex items-center justify-center border-2 border-slate-900 transition">
                <FaCamera className="text-white text-sm" />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <FaCamera className="text-white text-xl" />
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-3">
              Click to change profile photo
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleProfile}>
            {/* image */}
            <input
              type="file"
              accept="image/*"
              ref={image}
              hidden
              onChange={handleImage}
            />
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Name
              </label>

              <input
                type="text"
                placeholder="Enter your Name"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Username
              </label>

              <input
                type="text"
                readOnly
                name="username"
                value={userData?.user?.username}
                placeholder="Enter your username"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Email
              </label>

              <input
                type="email"
                readOnly
                name="email"
                value={userData?.user?.email}
                placeholder="Enter your email"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg py-3 transition"
              disabled={saving}
            >
              {saving ? "saving..." : "Save Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
