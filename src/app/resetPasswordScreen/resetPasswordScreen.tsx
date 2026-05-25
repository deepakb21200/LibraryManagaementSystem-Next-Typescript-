"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { MdLockReset } from "react-icons/md";
import { updatePassword } from "@/api/auth";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  password: z
    .string()
    .refine((v) => v.trim() !== "", "This is a required field."),
});

const ResetPasswordScreen = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const { isPending, mutate } = useMutation({
    mutationKey: ["updatePassword"],
    mutationFn: updatePassword,

    onSuccess: () => {
      toast("✅ Password is successfully updated.");
      reset();

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    },

    onError: (error) => {
      toast(`❌ ${error.message}`);
    },
  });





  function onSubmit(values) {
    mutate(values.password);
  }

  return (
    // <div className=" px-4 py-6 sm:px-6 flex items-center justify-center ">
    <div className="">
      <div className="w-full max-w-4xl bg-white border border-emerald-100 rounded-[32px] overflow-hidden shadow-2xl">

        <div className="grid lg:grid-cols-[420px_1fr]">

          {/* LEFT SIDE */}
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-500 p-8 sm:p-7 text-white flex flex-col justify-center
       relative overflow-hidden">

            {/* BG CIRCLES */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10"></div>
            <div className="absolute bottom-0 left-0 w-28 h-28 rounded-full bg-white/10"></div>

            {/* <div className="relative z-10">
          <div className="w-20 h-20 rounded-3xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-6">
            <MdLockReset className="text-5xl" />
          </div>

          <h2 className="text-4xl font-bold tracking-wide leading-tight">
            Update Password
          </h2>

          <p className="text-emerald-50 mt-5 text-sm leading-relaxed max-w-sm">
            Create a new strong password to keep your
            library management account secure and protected.
          </p>
        </div> */}

            <div className="relative z-10">

              <div className="flex items-center gap-5">

                <div className="w-20 h-20 rounded-3xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center flex-shrink-0">
                  <MdLockReset className="text-5xl" />
                </div>

                <h2 className="text-2xl font-bold tracking-wide leading-tight">
                  Update Password
                </h2>
              </div>

              <p className="text-emerald-50 mt-5 text-sm leading-relaxed max-w-sm">
                Create a new strong password to keep your
                library management account secure and protected.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-6 sm:p-7 flex items-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              {/* HEADING */}
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-800">
                  Set New Password
                </h3>

                <p className="text-sm text-gray-400 mt-2">
                  Enter your new password below.
                </p>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>

                <input
                  type="password"
                  placeholder="Enter new password"
                  {...register("password")}
                  className={`w-full h-13 rounded-2xl border bg-gray-50 px-4 text-sm outline-none transition-all ${errors.password
                    ? "border-red-300 focus:border-red-400"
                    : "border-gray-200 focus:border-emerald-400 focus:bg-white"
                    }`}
                />

                {errors.password && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full h-13 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 text-white text-sm font-semibold tracking-wide transition-all shadow-lg shadow-emerald-100"
              >
                {isPending
                  ? "Updating Password..."
                  : "Update Password"}
              </button>

              {/* FOOTER */}
              <p className="text-xs text-gray-400 text-center leading-relaxed">
                You’ll automatically be redirected to the login
                page after updating your password.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>



  );
};

export default ResetPasswordScreen;