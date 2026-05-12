"use client"
import { useMutation } from "@tanstack/react-query";
import type { BookFields } from "../../../types/type"
 
import { addBook } from "../../../api/booksApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import BookForm from "@/components/other/BookForm";
import { FormSchema } from "@/types/types";
 
export interface AddBookPayload extends FormSchema {
  image: File | null;   // string wala image yahan nahi aata
}


function AddBook() {
  // let navigate = useNavigate()

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["addBook"],
    mutationFn: addBook,
    onSuccess: () => {
      toast("✅ Book is added successfully.");
      // QueryClient.invalidateQueries({
      //   queryKey: ["books"],
      // });
      // setTimeout(() => {
      //   navigate("/dashboard");
      // }, 1000);
    },
    onError: (error) => toast(`❌ ${error?.message}`),
  })




  async function handleFormSubmit(book: BookFields): Promise<boolean> {
    try {
     await mutateAsync(book)
      return true
    } catch (error) {
      console.log(error);

      return false
    }
  }


  return (
    <>
      
      <BookForm  handleFormSubmit={handleFormSubmit} isPending={isPending}
      />
    </>
  )
}

export default AddBook



// The Cat in the Hat
// Dr. Seuss
// Random House
// 978039480001


//Room on the Brooms
//Julia Donaldson
//Puffin Books
//9780142501122