import MainLayout from "../../components/MainLayout";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { userAction } from "../../store/reducers/userReducer";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { signup } from "../../services/user";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const { mutate } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return signup({ name, email, password });
    },
    onSuccess: (data) => {
      dispatch(userAction.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  const password = watch("password");

  return (
    <MainLayout>
      <section className="mt-20 container mx-auto pt-10">
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-4xl font-bold mb-6">Register</h1>
          <form action="" onSubmit={handleSubmit(submitHandler)}>
            {/* NAME  */}
            <div className="flex justify-center items-start flex-col gap-y-2 my-2">
              <label htmlFor="name" className="font-semibold text-gray-500">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                {...register("name", {
                  minLength: {
                    value: 1,
                    message: "Name length must be at least 1 character!",
                  },
                  required: {
                    value: true,
                    message: "Name is required!",
                  },
                })}
                className={`px-10 py-4 border-2 border-black rounded-lg ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name?.message && (
                <p className="text-red-500 text-xs">{errors.name?.message}</p>
              )}
            </div>
            {/* EMAIL  */}
            <div className="flex justify-center items-start flex-col gap-y-2">
              <label htmlFor="email" className="font-semibold text-gray-500">
                Email
              </label>
              <input
                type="email"
                id="email"
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
                className={`px-10 py-4 border-2 border-black rounded-lg ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email?.message && (
                <p className="text-red-500 text-xs">{errors.email?.message}</p>
              )}
            </div>
            {/* PASSWORD  */}
            <div className="flex justify-center items-start flex-col gap-y-2">
              <label htmlFor="password" className="font-semibold text-gray-500">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required!",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/,
                    message:
                      "Password must contain at least 6 characters, one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)",
                  },
                })}
                className={`px-10 py-4 border-2 border-black rounded-lg ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password?.message && (
                <p className="text-red-500 text-xs">
                  {errors.password?.message}
                </p>
              )}
              {/* Password requirements helper text */}
              <ul className="text-xs text-gray-500 list-disc ml-4">
                <li>At least 6 characters long</li>
                <li>One uppercase letter (A-Z)</li>
                <li>One lowercase letter (a-z)</li>
                <li>One number (0-9)</li>
                <li>One special character (!@#$%^&*)</li>
              </ul>
            </div>
            {/* CONFIRM PASSWORD  */}
            <div className="flex justify-center items-start flex-col gap-y-2">
              <label
                htmlFor="confirm_password"
                className="font-semibold text-gray-500"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm_password"
                placeholder="Confirm Password"
                {...register("confirm_password", {
                  required: {
                    value: true,
                    message: "Confirm Password is required!",
                  },
                  validate: (value) => {
                    if (value !== password) {
                      return "Password and Confirm Password does not match!";
                    }
                  },
                })}
                className={`px-10 py-4 border-2 border-black rounded-lg ${
                  errors.confirm_password?.message ? "border-red-500" : ""
                }`}
              />
              {errors.confirm_password?.message && (
                <p className="text-red-500 text-xs">
                  {errors.confirm_password?.message}
                </p>
              )}
            </div>
            <button className="px-10 py-4 mt-3 bg-black text-white w-full rounded-lg border-2  hover:border-black hover:bg-transparent hover:text-black transition duration-300">
              REGISTER
            </button>
          </form>
          <div className="mt-2">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400">
                Login here{" "}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Register;
