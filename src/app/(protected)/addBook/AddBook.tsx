

// "use client";

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import BookForm, { AddBookPayload, EditBookPayload } from "@/components/other/BookForm";
// import { addBook } from "@/api/booksApi";



// export type HandleFormSubmitAdd = (values: AddBookPayload) => Promise<boolean>;

// export type HandleFormSubmitEdit = (values: EditBookPayload) => Promise<boolean>;




// function AddBook() {
//   const queryClient = useQueryClient();
//   const router = useRouter();

//   const { isPending, mutateAsync } = useMutation({
//     mutationKey: ["addBook"],
//     mutationFn: addBook,
//     onSuccess: () => {
//       toast("✅ Book is added successfully.");
//       queryClient.invalidateQueries({ queryKey: ["books"] });
//       setTimeout(() => router.push("/dashboard"), 1000);
//     },
//     onError: (error: Error) => toast(`❌ ${error?.message}`),
//   });



//   const handleFormSubmit: HandleFormSubmitAdd = async (values) => {
//     try {
//       await mutateAsync(values);
//       return true;
//     } catch (error) {
//       console.log(error);
//       return false;
//     }
//   };
//   return <BookForm handleFormSubmit={handleFormSubmit} isPending={isPending} />;
// }

// export default AddBook;














"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import BookForm, { AddBookPayload, EditBookPayload } from "@/components/other/BookForm";
import { addBook } from "@/api/booksApi"

export type HandleFormSubmitAdd = (values: AddBookPayload) => Promise<boolean>;
export type HandleFormSubmitEdit = (values: EditBookPayload) => Promise<boolean>;

function AddBook() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["addBook"],
    mutationFn: addBook,
    onSuccess: () => {
      toast("✅ Book is added successfully.");
      queryClient.invalidateQueries({ queryKey: ["books"] });
      setTimeout(() => router.push("/dashboard"), 1000);
    },
    onError: (error: Error) => toast(`❌ ${error?.message}`),
  });

  const handleFormSubmit = async (values: AddBookPayload): Promise<boolean> => {
    try {
      await mutateAsync(values);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return <BookForm handleFormSubmit={handleFormSubmit} isPending={isPending} />;
}

export default AddBook;







// The Cat in the Hat
// Dr. Seuss
// Random House
// 978039480001


//Room on the Brooms
//Julia Donaldson
//Puffin Books
//9780142501122

