import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";


const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);
  const [selectedImg, setSelectedImg] = useState(null);
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImg) {
      await updateProfile({ fullName: name, bio });
      toast.success("Profile updated successfully!");
      navigate("/");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({
        profilePic: base64Image,
        fullName: name,
        bio,
      });
      toast.success("Profile updated successfully!");
      navigate("/");
    };
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-black overflow-hidden">
      {/* Glowing Background Blob */}
      <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-purple-700 rounded-full blur-[150px] opacity-30 z-0" />

      <div className="w-full max-w-4xl backdrop-blur-xl border border-gray-700 rounded-xl p-6 md:p-10 flex items-center justify-between gap-10 max-md:flex-col z-10 shadow-2xl">
        {/* Profile Preview */}
        <div className="flex flex-col items-center gap-4 text-center">
          <img
            src={
              selectedImg
                ? URL.createObjectURL(selectedImg)
                : authUser?.profilePic || assets.avatar_icon
            }
            alt="profile"
            className="w-40 h-40 object-cover rounded-full border-4 border-violet-500 shadow-md transition-transform hover:scale-105"
          />
          <p className="text-white font-semibold text-lg">
            {name || "Your Name"}
          </p>
          <p className="text-sm text-gray-400">{bio || "Bio goes here..."}</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 gap-5 text-white"
        >
          <h2 className="text-2xl font-semibold">Edit Your Profile</h2>

          <label
            htmlFor="avatar"
            className="flex items-center gap-4 cursor-pointer text-sm text-gray-300"
          >
            <input
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
              onChange={(e) => setSelectedImg(e.target.files[0])}
            />
            <span className="bg-white/10 px-4 py-2 rounded-md border border-gray-600 hover:bg-white/20 transition">
              Upload Profile Image
            </span>
            <span className="text-xs text-gray-500">
              (JPG, PNG - max 2MB)
            </span>
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            required
            className="p-3 rounded-md bg-white/10 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Write something about yourself..."
            required
            className="p-3 rounded-md bg-white/10 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <button
            type="submit"
            className="py-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-md font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            Save Changes
          </button>
        </form>
      </div>

      <p className="absolute bottom-4 text-xs text-gray-500 text-center w-full">
        Built with 💙 by Vivekanand
      </p>
    </div>
  );
};

export default ProfilePage;
