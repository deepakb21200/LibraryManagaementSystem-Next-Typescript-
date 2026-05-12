"use client";

import { Controller, useForm } from "react-hook-form";


import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { toast } from "sonner";


import {
  MdCloudUpload,
  MdImage,
  MdMenuBook,
} from "react-icons/md";
import { BookFields, formSchema, FormSchema } from "@/types/types";
import { AddBookPayload } from "@/app/(protected)/addBook/AddBook";
import { validImageCheck } from "@/utils/functions";

/** Existing Book */
interface ExistingBook extends BookFields {
  id: string;
}

/** Add mode */
type AddSubmitHandler = (book: AddBookPayload) => Promise<boolean>;

/** Edit mode */
type EditSubmitHandler = (payload: { id: string; book: FormSchema }) => Promise<boolean>;

interface BookFormProps {
  handleFormSubmit: AddSubmitHandler | EditSubmitHandler;
  book?: ExistingBook;
  isPending: boolean;
}

function BookForm({ handleFormSubmit, book, isPending }: BookFormProps) {
  const [image, setImage] = useState<File | null>(null);

  const [isImageLoading, setIsImageLoading] = useState(true);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: book?.name || "",
      author: book?.author || "",
      publisher: book?.publisher || "",
      isbn: book?.isbn || "",
    },
  });

  const previewImage = useMemo(() => {
    if (image) {
      return URL.createObjectURL(image);
    }

    return null;
  }, [image]);

  async function onSubmit(values: FormSchema) {
    if (book) {
      await (handleFormSubmit as EditSubmitHandler)(
        {
          id: book.id,
          book: values,
        }
      );
    } else {
      if (image) {
        const errorMsg = validImageCheck(image);

        if (errorMsg) {
          toast(`❌ ${errorMsg}`);
          return;
        }
      }

      const isSuccess = await (
        handleFormSubmit as AddSubmitHandler
      )({
        ...values,
        image,
      });

      if (isSuccess) {
        form.reset();
        setImage(null);
      }
    }
  }

  return (
    <div className="p-3 sm:p-5  ">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm ">
        <div className="grid lg:grid-cols-[380px_1fr]">
          {/* LEFT SIDE */}
          <div className="bg-gradient-to-b from-emerald-50 to-white border-b lg:border-b-0 lg:border-r border-gray-100 p-5 sm:p-7">
            {/* Header */}
            <div className="flex items-center gap-3 mb-7">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center">
                <MdMenuBook className="text-white text-2xl" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {book
                    ? "Update Book"
                    : "Add New Book"}
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  Library collection management
                </p>
              </div>
            </div>

            {/* Image Preview */}
            <div className="rounded-3xl border border-dashed border-emerald-200 bg-white min-h-[320px] flex items-center justify-center overflow-hidden p-4">
              {book?.image ? (
                <img
                  src={book.image}
                  alt={book.name}
                  className={`w-full h-full object-contain rounded-2xl ${isImageLoading
                      ? "hidden"
                      : "block"
                    }`}
                  onLoad={() =>
                    setIsImageLoading(false)
                  }
                  onError={() =>
                    setIsImageLoading(false)
                  }
                />
              ) : previewImage ? (
                <img
                  src={previewImage}
                  alt="preview"
                  className="w-full h-full object-contain rounded-2xl"
                />
              ) : (
                <div className="text-center">
                  <div className="w-20 h-20 rounded-3xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                    <MdImage className="text-5xl text-emerald-500" />
                  </div>

                  <h3 className="text-base font-semibold text-gray-700">
                    No Image Selected
                  </h3>

                  <p className="text-sm text-gray-400 mt-2 max-w-xs">
                    Upload a book cover image for
                    better management
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-5 sm:p-7">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              {/* BOOK NAME */}
              <Controller
                control={form.control}
                name="name"
                render={({
                  field,
                  fieldState,
                }) => (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Book Name
                    </label>

                    <input
                      {...field}
                      placeholder="Enter book name"
                      className={`w-full h-12 rounded-xl border bg-gray-50 px-4 text-sm outline-none transition-all ${fieldState.invalid
                          ? "border-red-300 focus:border-red-400"
                          : "border-gray-200 focus:border-emerald-400 focus:bg-white"
                        }`}
                    />

                    {fieldState.error && (
                      <p className="text-red-500 text-xs mt-2">
                        {
                          fieldState.error.message
                        }
                      </p>
                    )}
                  </div>
                )}
              />

              {/* AUTHOR */}
              <Controller
                control={form.control}
                name="author"
                render={({
                  field,
                  fieldState,
                }) => (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Author Name
                    </label>

                    <input
                      {...field}
                      placeholder="Enter author name"
                      className={`w-full h-12 rounded-xl border bg-gray-50 px-4 text-sm outline-none transition-all ${fieldState.invalid
                          ? "border-red-300 focus:border-red-400"
                          : "border-gray-200 focus:border-emerald-400 focus:bg-white"
                        }`}
                    />

                    {fieldState.error && (
                      <p className="text-red-500 text-xs mt-2">
                        {
                          fieldState.error.message
                        }
                      </p>
                    )}
                  </div>
                )}
              />

              {/* PUBLISHER */}
              <Controller
                control={form.control}
                name="publisher"
                render={({
                  field,
                  fieldState,
                }) => (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Publisher
                    </label>

                    <input
                      {...field}
                      placeholder="Enter publisher"
                      className={`w-full h-12 rounded-xl border bg-gray-50 px-4 text-sm outline-none transition-all ${fieldState.invalid
                          ? "border-red-300 focus:border-red-400"
                          : "border-gray-200 focus:border-emerald-400 focus:bg-white"
                        }`}
                    />

                    {fieldState.error && (
                      <p className="text-red-500 text-xs mt-2">
                        {
                          fieldState.error.message
                        }
                      </p>
                    )}
                  </div>
                )}
              />

              {/* ISBN */}
              <Controller
                control={form.control}
                name="isbn"
                render={({
                  field,
                  fieldState,
                }) => (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      ISBN
                    </label>

                    <input
                      {...field}
                      placeholder="Enter ISBN"
                      className={`w-full h-12 rounded-xl border bg-gray-50 px-4 text-sm outline-none transition-all ${fieldState.invalid
                          ? "border-red-300 focus:border-red-400"
                          : "border-gray-200 focus:border-emerald-400 focus:bg-white"
                        }`}
                    />

                    {fieldState.error && (
                      <p className="text-red-500 text-xs mt-2">
                        {
                          fieldState.error.message
                        }
                      </p>
                    )}
                  </div>
                )}
              />

              {/* IMAGE */}
              {!book && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Book Image
                  </label>

                  <label className="border-2 border-dashed border-emerald-200 rounded-2xl bg-emerald-50/40 hover:bg-emerald-50 transition-all cursor-pointer flex flex-col items-center justify-center py-8 px-4 text-center">
                    <MdCloudUpload className="text-5xl text-emerald-500 mb-3" />

                    <h3 className="text-sm font-semibold text-gray-700">
                      Upload Book Cover
                    </h3>

                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG or WEBP image
                    </p>

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => {
                        setImage(
                          event.target.files?.[0] ||
                          null
                        );
                      }}
                    />
                  </label>

                  {image && (
                    <p className="text-sm text-emerald-700 mt-2 font-medium">
                      Selected : {image.name}
                    </p>
                  )}
                </div>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 text-white text-sm font-medium tracking-wide transition-all"
              >
                {isPending  ? book ? "Updating..."  : "Adding..." : book ? "Update Book": "Add Book"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>




  );
}

export default BookForm;