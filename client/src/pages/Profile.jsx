import React, { useEffect, useMemo } from "react";
import MainLayout from "../components/MainLayout";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, updateProfile } from "../services/user";
import ProfilePicture from "../components/ProfilePicture";
import { userAction } from "../store/reducers/userReducer";
import toast from "react-hot-toast";

const Profile = () => {
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  //fetch data
  const {
    data: profileData,
    isLoading: profileIsLoading,
    error: profileError,
  } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
  });

  // update data
  const { mutate, isLoading: updateProfileIsLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return updateProfile({
        token: userState.userInfo.token,
        userData: {
          name,
          email,
          password,
        },
      });
    },
    onSuccess: (data) => {
      dispatch(userAction.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile is updated!");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  // validate form data
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    values: {
      name: profileIsLoading ? "" : profileData.name,
      email: profileIsLoading ? "" : profileData.email,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (!userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  return (
    <MainLayout>
      <section className="w-full container mx-auto mt-20 py-5">
        <div className="w-full max-w-sm mx-auto">
          <ProfilePicture avatar={profileData?.avatar} />
          <form action="" onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="name"
                className="text-[#5a7183] font-semibold block"
              >
                Name
              </label>
              {console.log(profileData)}
              <input
                type="text"
                placeholder="Name"
                {...register("name", {
                  minLength: {
                    value: 1,
                    message: "Name length must be at least 1 character",
                  },
                  required: {
                    value: true,
                    message: "Name is required!",
                  },
                })}
                id="name"
                name="name"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.name ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.name?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="email"
                className="text-[#5a7183] font-semibold block"
              >
                Email
              </label>
              <input
                type="text"
                placeholder="Email"
                {...register("email", {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please enter a valid email address!",
                  },
                  required: {
                    value: true,
                    message: "Email is required!",
                  },
                })}
                id="email"
                name="email"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.email ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.email?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email?.message}
                </p>
              )}
            </div>

            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="password"
                className="text-[#5a7183] font-semibold block"
              >
                Password
              </label>
              <input
                type="text"
                placeholder="Update your password!"
                {...register("password", {
                  minLength: {
                    value: 6,
                    message: "Password length must be at least 6 character!",
                  },
                })}
                id="password"
                name="password"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.password ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.password?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <button
              disabled={!isValid || profileIsLoading || updateProfileIsLoading}
              className="px-10 py-4 mt-3 bg-green-500 text-white w-full rounded-lg border-2 hover:border-green-500 hover:bg-transparent hover:text-green-500 transition duration-300 disabled:opacity-70"
            >
              UPDATE
            </button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default Profile;
