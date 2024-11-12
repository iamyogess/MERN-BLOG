import React, { useState } from "react";
import { stables } from "../constants";
import { HiOutlineCamera } from "react-icons/hi";
import CropEasy from "./CropImage/CropEasy";
import { createPortal } from "react-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../store/reducers/userReducer";
import { uploadProfilePicture } from "../services/user";

const ProfilePicture = ({ avatar }) => {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [openCrop, setOpenCrop] = useState(false);
  const [photo, setPhoto] = useState(null);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ token: token, formData: formData }) => {
      return uploadProfilePicture({ token: token, formData: formData });
    },
    onSuccess: (data) => {
      dispatch(userAction.setUserInfo(data));
      setOpenCrop(false);
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile photo deleted!");
    },
    onError: (error) => {
      toast.error(error.message || "Unable to delete profile");
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto({ url: URL.createObjectURL(file), file: file });
    setOpenCrop(true);
  };

  const handleDeleteImage = () => {
    if (window.confirm("Do you want to delete your profile picture?")) {
      try {
        const formData = new FormData();
        formData.append("profilePicture", undefined);
        mutate({ token: userState.userInfo.token, formData: formData });
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    }
  };

  return (
    <>
      {openCrop &&
        createPortal(
          <CropEasy photo={photo} setOpenCrop={setOpenCrop} />,
          document.getElementById("portal")
        )}

      <div className="w-full flex items-center gap-x-4">
        <div className="relative w-20 h-20 rounded-full outline-offset-2 outline-1 outline-primary overflow-hidden">
          <label
            htmlFor="profilePicture"
            className="cursor-pointer absolute inset-0 rounded-full bg-transparent"
          >
            {avatar ? (
              <img
                src={stables.UPLOAD_FOLDER_BASE_URL + avatar}
                alt="Profile Picture"
                className="w-full object-cover h-full"
              />
            ) : (
              <div className="w-full h-full bg-blue-50/50 flex justify-center items-center">
                <HiOutlineCamera className="w-7 h-auto text-primary" />
              </div>
            )}
          </label>
          <input
            type="file"
            className="sr-only"
            id="profilePicture"
            onChange={handleFileChange}
          />
        </div>
        <button
          type="button"
          className="border border-red-500 rounded-lg px-4 py-2 text-red-500"
          onClick={handleDeleteImage}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default ProfilePicture;
