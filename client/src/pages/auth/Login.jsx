import { useForm } from "react-hook-form";
import MainLayout from "../../components/MainLayout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { userAction } from "../../store/reducers/userReducer";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { login } from "../../services/user";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTime, setLockTime] = useState(null);

  const { mutate } = useMutation({
    mutationFn: ({ email, password }) => {
      return login({ email, password });
    },
    onSuccess: (data) => {
      dispatch(userAction.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
    },
    onError: (error) => {
      console.log(error);
      // Check for lock status in error response
      if (error.response?.status === 403) {
        setIsLocked(true);
        // If time information is provided in the error message
        if (error.response.data?.message?.includes("minutes")) {
          const minutes = parseInt(error.response.data.message.match(/\d+/)[0]);
          setLockTime(Date.now() + minutes * 60 * 1000);
        } else {
          setLockTime(Date.now() + 15 * 60 * 1000); // Default 15 minutes
        }
      }
      toast.error(error.response?.data?.message || error.message);
    },
  });

  useEffect(() => {
    if (userState.userInfo) {
      navigate("/");
    }

    // Check and update lock status
    if (lockTime && Date.now() >= lockTime) {
      setIsLocked(false);
      setLockTime(null);
    }

    // Set up interval to check lock status
    const interval = setInterval(() => {
      if (lockTime && Date.now() >= lockTime) {
        setIsLocked(false);
        setLockTime(null);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate, userState.userInfo, lockTime]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    if (isLocked) {
      const timeLeft = Math.ceil((lockTime - Date.now()) / 1000 / 60);
      toast.error(`Account is locked. Please try again after ${timeLeft} minutes.`);
      return;
    }
    const { email, password } = data;
    mutate({ email, password });
  };

  return (
    <MainLayout>
      <section className="mt-20 container mx-auto pt-10">
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-4xl font-bold mb-6">Login</h1>
          {isLocked && lockTime && (
            <div className="mb-4 text-red-500 text-sm">
              Account is locked. Please try again in{" "}
              {Math.ceil((lockTime - Date.now()) / 1000 / 60)} minutes.
            </div>
          )}
          <form action="" onSubmit={handleSubmit(submitHandler)}>
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
                  minLength: {
                    value: 6,
                    message: "Password length must be at least 6 character!",
                  },
                  required: {
                    required: true,
                    message: "Password is required!",
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
            </div>

            <button 
              disabled={isLocked}
              className={`px-10 py-4 mt-3 bg-black text-white w-full rounded-lg border-2 hover:border-black hover:bg-transparent hover:text-black transition duration-300 ${
                isLocked ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLocked ? "ACCOUNT LOCKED" : "LOGIN"}
            </button>
          </form>
          <div className="mt-2">
            <p>
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-blue-400">
                Register here{" "}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Login;