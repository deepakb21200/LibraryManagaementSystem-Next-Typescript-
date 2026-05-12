 "use server"
 
import { createClient } from "@/lib/supabase";
import { BookFields } from "@/types/types";

 



export const getBooks = async () => {
      const supabase= createClient()
  const { data: books, error } = await supabase
    .from("books")
    .select("*")
    // .order("updated_at", { ascending: false });

  if (error) {
    console.log(error);
    throw new Error("Error while getting list of books. Try again later.");
  }

  return books;
};




export const addBook = async (book:BookFields) => {
      const supabase=createClient()
  // const { image, ...rest } = book;
  // let imageURL = "";
  // if (image) {
  //   try {
  //     const imageName = `${Date.now()}_${image.name}`;
  //     const { data, error } = await supabase.storage
  //       .from("book_images")
  //       .upload(imageName, image);
  //     if (error) {
  //       throw new Error("Error while uploading image. Try again later.");
  //     }
  //     imageURL = `${
  //       import.meta.env.VITE_PROJECT_URL
  //     }/storage/v1/object/public/${data.fullPath}`;
  //   } catch (error) {
  //     imageURL = "";
  //     console.log(error);
  //     throw new Error(error.message);
  //   }
  // }

  const { data, error } = await supabase
    .from("books")
    // .insert([
    //   {
    //     ...rest,
    //     image: imageURL,
    //   },
    // ])
    .insert([book])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Error while adding book. Try again later.");
  }

  return data;
};





export const updateBook = async ({ id, book } ) => {
      const supabase=createClient()
  const { data, error } = await supabase
    .from("books")
    .update(book)
    .eq("id", id)
    .select();

  if (error) {
    console.log(error);
    throw new Error("Error while updating book. Try again later.");
  }

  return data;
};

export const getSingleBook = async (id:string) => {
      const supabase=createClient()
  const { data: book, error } = await supabase
    .from("books")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Error while getting book information. Try again later.");
  }

  return book;
};



export const deleteBook = async ({ id, image }) => {
   const supabase=createClient()
  if (image) {
    const { error } = await supabase.storage
      .from("book_images")
      .remove([image.split("/").pop()]);
    if (error) {
      console.log(error);
      throw new Error("Error while deleting book image. Try again later.");
    }
  }
  const { data, error } = await supabase.from("books").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Error while deleting book. Try again later.");
  }

  return data;
};



export const getBooksByStudentId = async (studentId) => {
   const supabase=createClient()
  const { data: student_books, error } = await supabase
    .from("student_books")
    .select("book_id")
    .eq("student_id", studentId);

  if (error) {
    console.log(error);
    throw new Error(
      "Error while getting books by student id. Try again later."
    );
  }

  // console.log(student_books);
  // return student_books
  

  const bookIds = student_books.map((item) => item.book_id);

  const { data: books, error: booksError } = await supabase
    .from("books")
    .select("*, student_books(created_at)")
    .in("id", bookIds);
    console.log("bookss",books);
    

  if (booksError) {
    console.log(booksError);
    throw new Error(
      "Error while getting books by student id. Try again later."
    );
  }

  return books;
};







export const getUnassignedBooks = async () => {

     const supabase=createClient()

  const { data: student_books, error } = await supabase
    .from("student_books")
    .select("book_id");

    console.log(student_books);
    
  if (error) {
    console.log(error);
    throw new Error("Error while getting unassigned books. Try again later.");
  }

  const bookIds = student_books.map((book) => book.book_id).join(",");
    console.log(bookIds);
    

  const { data: books, error: booksError } = await supabase
    .from("books")
    .select("*")
    .not("id", "in", `(${bookIds})`);
  
console.log(books);

  if (booksError) {
    console.log(booksError);
    throw new Error("Error while getting unassigned books. Try again later.");
  }

  return books;
};



// ye hataa mat
// export const getAssignedBooks = async () => {
  
//      const supabase=createClient()
//   const { data: student_books, error } = await supabase
//     .from("student_books")
//     // .select("book_id");
//       .select(`
//       *,
//       books (*),
//       students (*)
//     `);
    

//   if (error) {
//     console.log(error);
//     throw new Error("Error while getting assigned books. Try again later.");
//   }

//   console.log("data no1," ,student_books);
  

//   const bookIds = student_books.map((book) => book.book_id);

//   const { data: books, error: booksError } = await supabase
//     .from("books")
//     .select("*")
//     .in("id", bookIds);

//   if (booksError) {
//     console.log(booksError);
//     throw new Error("Error while getting assigned books. Try again later.");
//   }
//   console.log("data no2", books);
  

//   return books;
// };


export const getAssignedBooks = async () => {

  const supabase = createClient();

  const { data: student_books, error } = await supabase
    .from("student_books")
    .select(`
      *,
      books (*),
      students (*)
    `);

  if (error) {
    console.log(error);

    throw new Error(
      "Error while getting assigned books. Try again later."
    );
  }

  console.log("data no1", student_books);

  const formattedBooks = student_books.map((item) => ({
    id: item.books.id,

    name: item.books.name,

    author: item.books.author,

    isbn: item.books.isbn,

    student: {
      id: item.students.id,

      first_name: item.students.first_name,

      middle_name: item.students.middle_name,

      last_name: item.students.last_name,

      class: item.students.class,
    },
  }));

  console.log("formattedBooks", formattedBooks);

  return formattedBooks;
};
