"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { useMutation } from "@tanstack/react-query";

import {
  MdEmail,
  MdLockReset,
  MdArrowForward,
  MdMenuBook,
} from "react-icons/md";

import { toast } from "sonner";
import { sendResetPasswordEmail } from "@/api/auth";

 
const formSchema = z.object({
  email: z.string().email({
    message:
      "Enter a valid email address.",
  }),
});


type ResetPasswordForm =
  z.infer<typeof formSchema>;


const ResetPassword = () => {
  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(
      formSchema
    ),

    defaultValues: {
      email: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const {
    isPending,
    mutate: resetPassword,
  } = useMutation({
    mutationKey: [
      "resetPassword",
    ],

    mutationFn:
      sendResetPasswordEmail,

    onSuccess: () => {
      toast(
        "✅ Please check your email for resetting password."
      );

      form.reset();
    },

    onError: (error) =>
      toast(`❌ ${error.message}`),
  });

  function onSubmit(values) {
    resetPassword(values.email);
  }

  return (
    // <section className=" p-4 flex items-center justify-center">
      <section className=" ">
      
      <div className="w-full max-w-4xl bg-white rounded-[32px] overflow-hidden border border-gray-200 shadow-sm grid lg:grid-cols-2">
        
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-between bg-emerald-600 p-10 text-white relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

          <div>
            <div className="w-16 h-16 rounded-3xl bg-white/15 flex items-center justify-center mb-6">
              <MdLockReset className="text-4xl" />
            </div>

            <h2 className="text-4xl font-bold leading-tight">
              Reset
             
              Your
            
              Password
            </h2>

            <p className="text-emerald-100 mt-6 leading-relaxed">
              We will send you a password
              reset email securely.
            </p>
          </div>

          <div className="border border-white/20 rounded-3xl p-5 bg-white/10">
            <p className="text-sm text-emerald-50 leading-relaxed">
              Access your library account
              securely with email password
              recovery.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
          
          {/* MOBILE HEADER */}
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

          {/* TITLE */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Forgot Password?
            </h2>

            <p className="text-gray-400 mt-2">
              Enter your email and we’ll
              send you a reset link.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit(
              onSubmit
            )}
            className="space-y-5"
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
                  className={`w-full h-12 rounded-xl border bg-gray-50 pl-12 pr-4 text-sm outline-none transition-all ${
                    errors.email
                      ? "border-red-300"
                      : "border-gray-200 focus:border-emerald-400 focus:bg-white"
                  }`}
                  {...register(
                    "email"
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

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 text-white text-sm font-medium tracking-wide transition-all flex items-center justify-center gap-2"
            >
              {isPending
                ? "Sending..."
                : "Reset Password"}

              {!isPending && (
                <MdArrowForward className="text-lg" />
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;