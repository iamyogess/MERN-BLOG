import { useForm } from "react-hook-form";
import MainLayout from "../../components/MainLayout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { userAction } from "../../store/reducers/userReducer";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { login } from "../../services/user";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => {
      return login({ email, password });
    },
    onSuccess: (data) => {
      dispatch(userAction.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
    },
    onError: (error) => {
      console.log(error);
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
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { email, password } = data;
    mutate({ email, password });
  };

  return (
    <MainLayout>
      <section className="mt-20 container mx-auto pt-10">
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-4xl font-bold mb-6">Login</h1>
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
                    message: "Password length must be at least 1 character!",
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

            <button className="px-10 py-4 mt-3 bg-black text-white w-full rounded-lg border-2 hover:border-black hover:bg-transparent hover:text-black transition duration-300">
              LOGIN
            </button>
          </form>
          <div className="mt-2">
            <p>
              Don't have an account?{" "}
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
