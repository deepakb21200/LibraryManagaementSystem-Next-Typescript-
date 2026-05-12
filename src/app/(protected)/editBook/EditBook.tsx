"use client"
import { useParams, useRouter } from "next/navigation";



import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSingleBook, updateBook } from "../../../api/booksApi";
 
import { toast } from "sonner";
 
import { FormSchema } from "@/types/types";
import BookForm from "@/components/other/BookForm";
 

 
interface UpdateBookPayload {
  id: string;
  book: FormSchema;
}

function EditBook() {
    const { id } = useParams();
    let router = useRouter();
     const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["editBook"],
    mutationFn: updateBook,
    onSuccess: () => {
      toast("✅ Book is updated successfully.");
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
      queryClient.invalidateQueries({
        queryKey: ["singleBook", id],
      });
      setTimeout(() => {
       router.push("/dashboard");
      }, 1000);
    },
    onError: (error) => toast(`❌ ${error.message}`),
  });




    const {
    data :book,
    isPending: bookIsPending,
    error,
  } = useQuery({
     queryKey: ["singleBook", id],
    queryFn: () => getSingleBook(id)}
  )


 console.log(book);
  


 
  const handleFormSubmit = async ({ id, book }: UpdateBookPayload) :Promise<boolean> =>{
  try {
      await mutateAsync({ id, book });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
    
  }
 
  return (
     <div>
      <h2 className="my-5 text-center text-3xl">Edit Book {id}</h2>
      {error && <p className="text-2xl text-red-500 tracking-wide text-center">{error.message}</p>}
      {bookIsPending && <p className="text-center text-3xl my-2 tracking-wider">Loading...</p>}
      <BookForm
      key={book?.id}
        book={book}
        handleFormSubmit={handleFormSubmit}
        isPending={isPending || bookIsPending} 
      />
    </div>
  )
}

export default EditBook