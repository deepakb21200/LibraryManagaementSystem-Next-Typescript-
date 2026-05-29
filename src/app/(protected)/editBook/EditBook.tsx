
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import BookForm, { EditBookPayload } from "@/components/other/BookForm";
import { getSingleBook, updateBook } from "@/api/booksApi";


function EditBook() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["editBook"],
    mutationFn: updateBook,
    onSuccess: () => {
      toast("✅ Book is updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["singleBook", id] });
      setTimeout(() => router.push("/dashboard"), 1000);
    },
    onError: (error: Error) => toast(`❌ ${error.message}`),
  });

  const { data: book, isPending: bookIsPending, error } = useQuery({
    queryKey: ["singleBook", id],
    queryFn: () => getSingleBook(id),
  });

  const handleFormSubmit = async (values: EditBookPayload): Promise<boolean> => {
    try {
      await mutateAsync({
        id: values.id,
        book: values.book,
        image: values.image,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <div>
      <h2 className="my-5 text-center text-3xl">Edit Book {id}</h2>
      {error && (
        <p className="text-2xl text-red-500 tracking-wide text-center">
          {error.message}
        </p>
      )}
      {bookIsPending && (
        <p className="text-center text-3xl my-2 tracking-wider">Loading...</p>
      )}
      <BookForm
        key={book?.id}
        book={book}
        handleFormSubmit={handleFormSubmit}
        isPending={isPending || bookIsPending}
      />
    </div>
  );
}

export default EditBook;









