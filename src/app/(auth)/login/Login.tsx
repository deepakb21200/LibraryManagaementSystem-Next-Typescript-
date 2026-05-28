"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  MdMenuBook,
  MdEmail,
  MdLock,
  MdArrowForward,
} from "react-icons/md";

import { toast } from "sonner";
import { login } from "@/api/auth";

interface LoginForm {
  email: string;
  password: string;
}


const Login = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isPending, mutate } =
    useMutation({
      mutationKey: ["login"],

      mutationFn: login,

      onSuccess: () => {
        router.push("/dashboard");
      },

      onError: (error) => {
        toast(`❌ ${error.message}`);
      },
    });

const onSubmit = (data: LoginForm) => {
    mutate(data);
  };

  return (
    // <section className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 p-4 flex items-center justify-center">
 


      <div className="w-full max-w-4xl bg-white rounded-[32px] overflow-hidden border border-gray-200 shadow-sm grid lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-between bg-emerald-600 p-7 text-white relative overflow-hidden">

          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

          {/* <div>
            <div className="w-16 h-16 rounded-3xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-6">
              <MdMenuBook className="text-4xl" />
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              Library Management System
            </h1>

            <p className="text-emerald-100 mt-6 leading-relaxed max-w-md">
              Manage books, students,
              analytics and library
              operations from one modern
              dashboard.
            </p>
          </div> */}

          <div>
  
  <div className="flex items-center gap-5">
    
    <div className="w-15 h-15 rounded-3xl bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
      <MdMenuBook className="text-4xl" />
    </div>

    <h1 className="text-2xl font-bold leading-tight">
      Library Management System
    </h1>
  </div>

  <p className="text-emerald-100 mt-6 leading-relaxed max-w-md">
    Manage books, students,
    analytics and library
    operations from one modern
    dashboard.
  </p>
</div>

          <div className="border border-white/20 rounded-3xl p-5 backdrop-blur-sm bg-white/10">
            <p className="text-sm text-emerald-50 leading-relaxed">
              Smart library management
              with analytics, issue &
              return tracking, and
              student management.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center">

          {/* MOBILE LOGO */}
          <div className="lg:hidden flex items-center gap-3 mb-8">

            <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center">
              <MdMenuBook className="text-white text-2xl" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                LibraryMS
              </h2>

              <p className="text-sm text-gray-400">
                Management System
              </p>
            </div>
          </div>

          {/* HEADING */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Welcome Back
            </h2>

            <p className="text-gray-400 mt-2">
              Login to continue managing
              your library.
            </p>
          </div>

          {/* FORM */}
          <form
            className="space-y-5"
            onSubmit={handleSubmit(
              onSubmit
            )}
          >

            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Email Address
              </label>

              <div className="relative">

                <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full h-12 rounded-xl border bg-gray-50 pl-12 pr-4 text-sm outline-none transition-all ${errors.email
                      ? "border-red-300"
                      : "border-gray-200 focus:border-emerald-400 focus:bg-white"
                    }`}
                  {...register(
                    "email",
                    {
                      required:
                        "This is a required field.",

                      pattern: {
                        value:
                          /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/g,

                        message:
                          "Please enter a valid email address",
                      },
                    }
                  )}
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {
                    errors.email
                      .message
                  }
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Password
              </label>

              <div className="relative">

                <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

                <input
                  type="password"
                  placeholder="Enter password"
                  className={`w-full h-12 rounded-xl border bg-gray-50 pl-12 pr-4 text-sm outline-none transition-all ${errors.password
                      ? "border-red-300"
                      : "border-gray-200 focus:border-emerald-400 focus:bg-white"
                    }`}
                  {...register(
                    "password",
                    {
                      required:
                        "This is a required field.",
                    }
                  )}
                />
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {
                    errors.password
                      .message
                  }
                </p>
              )}
            </div>

            {/* FORGOT PASSWORD */}
            <div className="flex  ">
              <Link
                href="/resetPassword"
                className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-all"
              >
                Forgot password?
              </Link>
            </div>

            {/* BUTTON */}
            <button
              disabled={isPending}
              type="submit"
              className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 text-white text-sm font-medium tracking-wide transition-all flex items-center justify-center gap-2"
            >
              {isPending
                ? "Logging in..."
                : "Login"}

              {!isPending && (
                <MdArrowForward className="text-lg" />
              )}
            </button>
          </form>
        </div>
      </div>
   
  );
};

export default Login;