"use client";

import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { MdCloudUpload, MdImage, MdMenuBook } from "react-icons/md";
import { validImageCheck } from "@/utils/functions";
import { HandleFormSubmitAdd, HandleFormSubmitEdit } from "@/app/(protected)/addBook/AddBook";

export const formSchema = z.object({
  name: z.string().refine((v) => v.trim() !== "", "This is a required field."),
  author: z.string().refine((v) => v.trim() !== "", "This is a required field."),
  publisher: z.string().refine((v) => v.trim() !== "", "This is a required field."),
  isbn: z.string().refine((v) => v.trim() !== "", "This is a required field."),
});

export type FormSchema = z.infer<typeof formSchema>;

export type AddBookPayload = {
  name: string;
  author: string;
  publisher: string;
  isbn: string;
  image: File | null;
};

export type EditBookPayload = {
  id: string;
  book: {
    name: string;
    author: string;
    publisher: string;
    isbn: string;
  };
  image?: File | null;
};

export interface Book {
  id: string;
  name: string;
  author: string;
  publisher: string;
  isbn: string;
  image?: string;

}

// type AddBookFormProps = {
//   handleFormSubmit: HandleFormSubmitAdd;
//   isPending: boolean;
//   book?: undefined;
// };

// type EditBookFormProps = {
//   handleFormSubmit: HandleFormSubmitEdit;
//   isPending: boolean;
//   book: Book;
// };

// type BookFormProps = AddBookFormProps | EditBookFormProps;


// ✅ ab — ek hi type
type BookFormProps = {
  handleFormSubmit: HandleFormSubmitAdd | HandleFormSubmitEdit;
  isPending: boolean;
  book?: Book;
};

function BookForm({ handleFormSubmit, book, isPending }: BookFormProps) {
  const [image, setImage] = useState<File | null>(null);
  const [removedImage, setRemovedImage] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const fileRef = useRef<HTMLInputElement | null>(null);

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
    console.log(image);

    if (image) return URL.createObjectURL(image);
    return null;
  }, [image]);

  async function onSubmit(values: FormSchema): Promise<void> {
    if (book) {
      // ── EDIT MODE ──
      if (image) {
        const errorMsg = validImageCheck(image);
        if (errorMsg) { toast(`❌ ${errorMsg}`); return; }
      }

      // const ok = await handleFormSubmit({
      //   id: book.id,
      //   book: { ...values },
      //   image: removedImage ? null : image ?? undefined,
      // });
      const ok = await (handleFormSubmit as HandleFormSubmitEdit)({
        id: book.id,
        book: { ...values },
        image: removedImage ? null : image ?? undefined,
      });

      if (ok) {
        setRemovedImage(false);
        if (fileRef.current) fileRef.current.value = "";
      }
    } else {
      // ── ADD MODE ──
      if (image) {
        const errorMsg = validImageCheck(image);
        if (errorMsg) { toast(`❌ ${errorMsg}`); return; }
      }

      // const ok = await handleFormSubmit({
      //   ...values,
      //   image,
      // });

      const ok = await (handleFormSubmit as HandleFormSubmitAdd)({
        ...values,
        image,
      });

      if (ok) {
        form.reset();
        setImage(null);
        if (fileRef.current) fileRef.current.value = "";
      }
    }
  }

  // const leftImage = previewImage ?? (removedImage ? null : book?.image ?? null);
  const leftImage = previewImage ?? (removedImage ? null : book?.image);

  console.log(leftImage);


  return (
    <div className="p-3 sm:p-5">
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="grid lg:grid-cols-[380px_1fr]">

          {/* ── LEFT ── */}
          <div className="bg-gradient-to-b from-emerald-50 to-white border-b lg:border-b-0 lg:border-r border-gray-100 p-5 sm:p-7">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center">
                <MdMenuBook className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {book ? "Update Book" : "Add New Book"}
                </h2>
                <p className="text-sm text-gray-400 mt-1">Library collection management</p>
              </div>
            </div>

            <div className="rounded-3xl border border-dashed border-emerald-200 bg-white min-h-[320px] flex items-center justify-center overflow-hidden p-4">
              {leftImage ? (
                <img src={leftImage} alt={book?.name ?? "preview"} className={`w-full h-full object-contain rounded-2xl
               ${!previewImage && isImageLoading ? "hidden" : "block"}`}
                  onLoad={() => setIsImageLoading(false)}
                  onError={() => setIsImageLoading(false)} />)
                : (
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-3xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                      <MdImage className="text-5xl text-emerald-500" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-700">No Image Selected</h3>
                    <p className="text-sm text-gray-400 mt-2 max-w-xs">
                      Upload a book cover image for better management
                    </p>
                  </div>
                )}
            </div>

            {leftImage && (
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  setRemovedImage(true);
                  if (fileRef.current) fileRef.current.value = "";
                }}
                className="mt-3 w-full text-xs text-red-500 border border-red-100 rounded-xl py-2 hover:bg-red-50 transition-all"
              >
                {image ? "Remove selected image" : "Remove existing image"}
              </button>
            )}
          </div>

          {/* ── RIGHT ── */}
          <div className="p-5 sm:p-7">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

              <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Book Name</label>
                    <input
                      {...field}
                      placeholder="Enter book name"
                      className={`w-full h-12 rounded-xl border bg-gray-50 px-4 text-sm outline-none transition-all
                         ${fieldState.invalid ? "border-red-300 focus:border-red-400"
                          : "border-gray-200 focus:border-emerald-400 focus:bg-white"}`} />
                    {fieldState.error && (<p className="text-red-500 text-xs mt-2">{fieldState.error.message}</p>)}
                  </div>
                )}
              />

              <Controller
                control={form.control}
                name="author"
                render={({ field, fieldState }) => (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Author Name</label>
                    <input
                      {...field}
                      placeholder="Enter author name"
                      className={`w-full h-12 rounded-xl border bg-gray-50 px-4 text-sm outline-none transition-all 
                        ${fieldState.invalid ? "border-red-300 focus:border-red-400"
                          : "border-gray-200 focus:border-emerald-400 focus:bg-white"
                        }`} />

                    {fieldState.error && (
                      <p className="text-red-500 text-xs mt-2">{fieldState.error.message}</p>
                    )}
                  </div>
                )}
              />

              <Controller
                control={form.control}
                name="publisher"
                render={({ field, fieldState }) => (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Publisher</label>
                    <input
                      {...field}
                      placeholder="Enter publisher"
                      className={`w-full h-12 rounded-xl border bg-gray-50 px-4 text-sm outline-none transition-all
                         ${fieldState.invalid ? "border-red-300 focus:border-red-400"
                          : "border-gray-200 focus:border-emerald-400 focus:bg-white"}`} />
                    {fieldState.error && (
                      <p className="text-red-500 text-xs mt-2">{fieldState.error.message}</p>
                    )}
                  </div>
                )}
              />

              <Controller
                control={form.control}
                name="isbn"
                render={({ field, fieldState }) => (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">ISBN</label>
                    <input
                      {...field}
                      placeholder="Enter ISBN"
                      className={`w-full h-12 rounded-xl border bg-gray-50 px-4 text-sm outline-none transition-all ${fieldState.invalid
                        ? "border-red-300 focus:border-red-400"
                        : "border-gray-200 focus:border-emerald-400 focus:bg-white"
                        }`}
                    />
                    {fieldState.error && (
                      <p className="text-red-500 text-xs mt-2">{fieldState.error.message}</p>
                    )}
                  </div>
                )}
              />

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Book Image</label>
                <label className="border-2 border-dashed border-emerald-200 rounded-2xl bg-emerald-50/40 hover:bg-emerald-50 transition-all cursor-pointer flex flex-col items-center justify-center py-8 px-4 text-center">
                  <MdCloudUpload className="text-5xl text-emerald-500 mb-3" />
                  <h3 className="text-sm font-semibold text-gray-700">Upload Book Cover</h3>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG or WEBP image</p>
                  <input type="file" accept="image/*" className="hidden" ref={fileRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setImage(file);
                      if (file) setRemovedImage(false);
                    }} />
                </label>
                {image && (
                  <p className="text-sm text-emerald-700 mt-2 font-medium">
                    Selected: {image.name}
                  </p>
                )}
              </div>

              <button type="submit" disabled={isPending} className="w-full h-12 rounded-xl bg-emerald-600
               hover:bg-emerald-700 disabled:opacity-70 text-white text-sm font-medium tracking-wide transition-all" >
                {isPending ? book ? "Updating..." : "Adding..." : book ? "Update Book" : "Add Book"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookForm;