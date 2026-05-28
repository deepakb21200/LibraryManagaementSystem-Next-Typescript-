"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MdLocationOn, MdPerson, MdPhone, MdSchool, } from "react-icons/md";

/* ---------------- SCHEMA ---------------- */

const formSchema = z.object({
  first_name: z.string().refine((v) => v.trim() !== "", "This is a required field."),

  middle_name: z.string().optional(),

  last_name: z.string().refine((v) => v.trim() !== "", "This is a required field."),

  class: z.string().refine((v) => v.trim() !== "", "This is a required field."),

  address: z.string().refine((v) => v.trim() !== "", "This is a required field."),

  state: z.string().refine((v) => v.trim() !== "", "This is a required field."),

  city: z.string().refine((v) => v.trim() !== "", "This is a required field."),

  pincode: z.string().refine((v) => v.trim() !== "", "This is a required field."),

  phone: z.string().refine((v) => v.trim() !== "", "This is a required field.").refine((v) => v.trim().length === 10,
    "Please enter a valid 10-digit number")
});

export type FormValues = z.infer<typeof formSchema>;

export interface Student extends FormValues {
  id: string;
}

export type EditPayload = {
  id: string;
  student: FormValues;
};

export type HandleSubmit = (values: FormValues | EditPayload) => Promise<boolean>;

interface StudentFormProps {
  handleFormSubmit: HandleSubmit;
  student?: Student;
  isPending: boolean;
}
const StudentForm = ({
  handleFormSubmit,
  student,
  isPending,
}: StudentFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      first_name:
        student?.first_name || "",

      middle_name:
        student?.middle_name || "",

      last_name:
        student?.last_name || "",

      class: student?.class || "",

      address:
        student?.address || "",

      state: student?.state || "",

      city: student?.city || "",

      pincode:
        student?.pincode || "",

      phone: student?.phone || "",
    },
  });


  async function onSubmit(values: FormValues) {
    if (student) {
      // edit
      await handleFormSubmit({ id: student.id, student: values });
    } else {
      // add
      const isSuccess = await handleFormSubmit(values);
      if (isSuccess) {
        reset();
      }
    }
  }

  return (
    <div className="p-3 sm:p-5">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="grid lg:grid-cols-[340px_1fr]">
          {/* LEFT SIDE */}
          <div className="bg-gradient-to-b from-emerald-50 to-white border-b lg:border-b-0 lg:border-r border-gray-100 p-5 sm:p-7">
            {/* HEADER */}
            <div className="flex items-center gap-3 mb-7">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center">
                <MdPerson className="text-white text-2xl" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {student ? "Update Student" : "Add New Student"}
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  Student management system
                </p>
              </div>
            </div>

            {/* INFO CARDS */}
            <div className="space-y-4">
              <div className="bg-white border border-gray-100 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <MdSchool className="text-2xl text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                      Class
                    </p>

                    <p className="text-sm font-semibold text-gray-700 mt-1">
                      {student?.class || "Not Assigned"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <MdPhone className="text-2xl text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                      Contact
                    </p>

                    <p className="text-sm font-semibold text-gray-700 mt-1">
                      {student?.phone || "No Phone"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <MdLocationOn className="text-2xl text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                      Location
                    </p>

                    <p className="text-sm font-semibold text-gray-700 mt-1">
                      {student?.city || "City"}
                      {student?.state && `, ${student.state}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-5 sm:p-7">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              {/* NAME ROW */}
              <div className="grid sm:grid-cols-2 gap-5">
                {/* FIRST NAME */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    First Name
                  </label>

                  <input type="text" placeholder="Enter first name"
                    {...register("first_name")}
                    className={`w-full h-12 rounded-xl border bg-gray-50 px-4 text-sm outline-none transition-all
                       ${errors.first_name ? "border-red-300 focus:border-red-400"
                        : "border-gray-200 focus:border-emerald-400 focus:bg-white"
                      }`}
                  />

                  {errors.first_name && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.first_name.message}
                    </p>
                  )}
                </div>

                {/* MIDDLE NAME */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Middle Name
                  </label>

                  <input type="text" placeholder="Enter middle name"
                    {...register("middle_name")}
                    className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none 
                    transition-all focus:border-emerald-400 focus:bg-white"/>

                  {errors.middle_name && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.middle_name.message}
                    </p>
                  )}
                </div>
              </div>

              {/* LAST NAME + CLASS */}
              <div className="grid sm:grid-cols-2 gap-5">
                {/* LAST NAME */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Last Name
                  </label>

                  <input type="text" placeholder="Enter last name"
                    {...register("last_name")}
                    className={`w-full h-12 rounded-xl border bg-gray-50 px-4 text-sm outline-none transition-all ${errors.last_name
                      ? "border-red-300 focus:border-red-400"
                      : "border-gray-200 focus:border-emerald-400 focus:bg-white"
                      }`}
                  />

                  {errors.last_name && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.last_name.message}
                    </p>
                  )}
                </div>

                {/* CLASS */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Class
                  </label>

                  <input type="text" placeholder="Enter class"
                    {...register("class")}
                    className={`w-full h-12 rounded-xl border bg-gray-50 px-4 text-sm outline-none transition-all ${errors.class
                      ? "border-red-300 focus:border-red-400"
                      : "border-gray-200 focus:border-emerald-400 focus:bg-white"
                      }`}
                  />

                  {errors.class && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.class.message}
                    </p>
                  )}
                </div>
              </div>

              {/* ADDRESS */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Address
                </label>

                <textarea rows={4} placeholder="Enter address"
                  {...register("address")}
                  className={`w-full rounded-2xl border bg-gray-50 px-4 py-3 text-sm outline-none resize-none transition-all ${errors.address
                    ? "border-red-300 focus:border-red-400"
                    : "border-gray-200 focus:border-emerald-400 focus:bg-white"
                    }`}
                />

                {errors.address && (
                  <p className="text-red-500 text-xs mt-2">
                    {
                      errors.address.message
                    }
                  </p>
                )}
              </div>

              {/* LOCATION ROW */}
              <div className="grid sm:grid-cols-3 gap-5">
                {/* STATE */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    State
                  </label>

                  <input type="text" placeholder="Enter state"
                    {...register("state")}
                    className={`w-full h-12 rounded-xl border bg-gray-50 px-4 text-sm outline-none transition-all ${errors.state
                      ? "border-red-300 focus:border-red-400"
                      : "border-gray-200 focus:border-emerald-400 focus:bg-white"
                      }`}
                  />

                  {errors.state && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.state.message}
                    </p>
                  )}
                </div>

                {/* CITY */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    City
                  </label>

                  <input type="text" placeholder="Enter city"
                    {...register("city")}
                    className={`w-full h-12 rounded-xl border bg-gray-50 px-4 text-sm outline-none transition-all ${errors.city
                      ? "border-red-300 focus:border-red-400"
                      : "border-gray-200 focus:border-emerald-400 focus:bg-white"
                      }`}
                  />

                  {errors.city && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                {/* PINCODE */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Pincode
                  </label>

                  <input type="text" placeholder="Enter pincode"
                    {...register("pincode")}
                    className={`w-full h-12 rounded-xl border bg-gray-50 px-4 text-sm outline-none transition-all ${errors.pincode
                      ? "border-red-300 focus:border-red-400"
                      : "border-gray-200 focus:border-emerald-400 focus:bg-white"
                      }`}
                  />

                  {errors.pincode && (
                    <p className="text-red-500 text-xs mt-2">
                      {errors.pincode.message}
                    </p>
                  )}
                </div>
              </div>

              {/* PHONE */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Phone Number
                </label>

                <input type="text" placeholder="Enter phone number"
                  {...register("phone")}
                  className={`w-full h-12 rounded-xl border bg-gray-50 px-4 text-sm outline-none transition-all ${errors.phone
                    ? "border-red-300 focus:border-red-400"
                    : "border-gray-200 focus:border-emerald-400 focus:bg-white"
                    }`} />

                {errors.phone && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* BUTTON */}
              <button type="submit" disabled={isPending}
                className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70
                 text-white text-sm font-medium tracking-wide transition-all cursor-pointer">
                {isPending ? student ? "Updating..." : "Adding..." : student ? "Update Student" : "Add Student"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;