// "use server"

// import { createClient } from "@/lib/supabase";






// export const getBooks = async () => {
//   const supabase = createClient()
//   const { data: books, error } = await supabase
//     .from("books")
//     .select("*")
//   // .order("updated_at", { ascending: false });

//   if (error) {
//     console.log(error);
//     throw new Error("Error while getting list of books. Try again later.");
//   }

//   return books;
// };




// // export const addBook = async (book:BookFields) => {
// //       const supabase=createClient()
// //   // const { image, ...rest } = book;
// //   // let imageURL = "";
// //   // if (image) {
// //   //   try {
// //   //     const imageName = `${Date.now()}_${image.name}`;
// //   //     const { data, error } = await supabase.storage
// //   //       .from("book_images")
// //   //       .upload(imageName, image);
// //   //     if (error) {
// //   //       throw new Error("Error while uploading image. Try again later.");
// //   //     }
// //   //     imageURL = `${
// //   //       import.meta.env.VITE_PROJECT_URL
// //   //     }/storage/v1/object/public/${data.fullPath}`;
// //   //   } catch (error) {
// //   //     imageURL = "";
// //   //     console.log(error);
// //   //     throw new Error(error.message);
// //   //   }
// //   // }

// //   const { data, error } = await supabase
// //     .from("books")
// //     // .insert([
// //     //   {
// //     //     ...rest,
// //     //     image: imageURL,
// //     //   },
// //     // ])
// //     .insert([book])
// //     .select();

// //   if (error) {
// //     console.log(error);
// //     throw new Error("Error while adding book. Try again later.");
// //   }

// //   return data;
// // };



// export const addBook = async (book: BookFields) => {
//   const supabase = createClient()
//   const { image, ...rest } = book;
//   let imageURL = "";
//   if (image) {
//     try {
//       const imageName = `${Date.now()}_${image.name}`;
//       const { data, error } = await supabase.storage
//         .from("book_images")
//         .upload(imageName, image);
//       if (error) {
//         throw new Error("Error while uploading image. Try again later.");
//       }
//       imageURL = `${process.env.NEXT_PUBLIC_PROJECT_URL}/storage/v1/object/public/${data.fullPath}`;
//     } catch (error: any) {
//       imageURL = "";
//       console.log(error);
//       throw new Error(error.message);
//     }
//   }

//   const { data, error } = await supabase
//     .from("books")
//     .insert([
//       {
//         ...rest,
//         image: imageURL,
//       },
//     ]).select();

//   if (error) {
//     console.log(error);
//     throw new Error("Error while adding book. Try again later.");
//   }

//   return data;
// };


// export const updateBook = async ({ id, book }) => {
//   const supabase = createClient()
//   const { data, error } = await supabase
//     .from("books")
//     .update(book)
//     .eq("id", id)
//     .select();

//   if (error) {
//     console.log(error);
//     throw new Error("Error while updating book. Try again later.");
//   }

//   return data;
// };

// export const getSingleBook = async (id: string) => {
//   const supabase = createClient()
//   const { data: book, error } = await supabase
//     .from("books")
//     .select("*")
//     .eq("id", id)
//     .single();

//   if (error) {
//     console.log(error);
//     throw new Error("Error while getting book information. Try again later.");
//   }

//   return book;
// };



// export const deleteBook = async ({ id, image }) => {
//   const supabase = createClient()
//   if (image) {
//     const { error } = await supabase.storage
//       .from("book_images")
//       .remove([image.split("/").pop()]);
//     if (error) {
//       console.log(error);
//       throw new Error("Error while deleting book image. Try again later.");
//     }
//   }
//   const { data, error } = await supabase.from("books").delete().eq("id", id);

//   if (error) {
//     console.log(error);
//     throw new Error("Error while deleting book. Try again later.");
//   }

//   return data;
// };



// export const getBooksByStudentId = async (studentId) => {
//   const supabase = createClient()
//   const { data: student_books, error } = await supabase
//     .from("student_books")
//     .select("book_id")
//     .eq("student_id", studentId);

//   if (error) {
//     console.log(error);
//     throw new Error(
//       "Error while getting books by student id. Try again later."
//     );
//   }

//   // console.log(student_books);
//   // return student_books


//   const bookIds = student_books.map((item) => item.book_id);

//   const { data: books, error: booksError } = await supabase
//     .from("books")
//     .select("*, student_books(created_at)")
//     .in("id", bookIds);
//   console.log("bookss", books);


//   if (booksError) {
//     console.log(booksError);
//     throw new Error(
//       "Error while getting books by student id. Try again later."
//     );
//   }

//   return books;
// };







// export const getUnassignedBooks = async () => {

//   const supabase = createClient()

//   const { data: student_books, error } = await supabase
//     .from("student_books")
//     .select("book_id");

//   console.log(student_books);

//   if (error) {
//     console.log(error);
//     throw new Error("Error while getting unassigned books. Try again later.");
//   }

//   const bookIds = student_books.map((book) => book.book_id).join(",");
//   console.log(bookIds);


//   const { data: books, error: booksError } = await supabase
//     .from("books")
//     .select("*")
//     .not("id", "in", `(${bookIds})`);

//   console.log(books);

//   if (booksError) {
//     console.log(booksError);
//     throw new Error("Error while getting unassigned books. Try again later.");
//   }

//   return books;
// };



// // ye hataa mat
// // export const getAssignedBooks = async () => {

// //      const supabase=createClient()
// //   const { data: student_books, error } = await supabase
// //     .from("student_books")
// //     // .select("book_id");
// //       .select(`
// //       *,
// //       books (*),
// //       students (*)
// //     `);


// //   if (error) {
// //     console.log(error);
// //     throw new Error("Error while getting assigned books. Try again later.");
// //   }

// //   console.log("data no1," ,student_books);


// //   const bookIds = student_books.map((book) => book.book_id);

// //   const { data: books, error: booksError } = await supabase
// //     .from("books")
// //     .select("*")
// //     .in("id", bookIds);

// //   if (booksError) {
// //     console.log(booksError);
// //     throw new Error("Error while getting assigned books. Try again later.");
// //   }
// //   console.log("data no2", books);


// //   return books;
// // };


// export const getAssignedBooks = async () => {

//   const supabase = createClient();

//   const { data: student_books, error } = await supabase
//     .from("student_books")
//     .select(`
//       *,
//       books (*),
//       students (*)
//     `);

//   if (error) {
//     console.log(error);

//     throw new Error(
//       "Error while getting assigned books. Try again later."
//     );
//   }

//   console.log("data no1", student_books);

//   const formattedBooks = student_books.map((item) => ({
//     id: item.books.id,

//     name: item.books.name,

//     author: item.books.author,

//     isbn: item.books.isbn,

//     student: {
//       id: item.students.id,

//       first_name: item.students.first_name,

//       middle_name: item.students.middle_name,

//       last_name: item.students.last_name,

//       class: item.students.class,
//     },
//   }));

//   console.log("formattedBooks", formattedBooks);

//   return formattedBooks;
// };





//ye original hia 



import { AddBookPayload } from "@/components/other/BookForm";
import { createClient } from "@/lib/supabase";






export const getBooks = async () => {
  const supabase = createClient()
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




// export const addBook = async (book:BookFields) => {
//       const supabase=createClient()
//   // const { image, ...rest } = book;
//   // let imageURL = "";
//   // if (image) {
//   //   try {
//   //     const imageName = `${Date.now()}_${image.name}`;
//   //     const { data, error } = await supabase.storage
//   //       .from("book_images")
//   //       .upload(imageName, image);
//   //     if (error) {
//   //       throw new Error("Error while uploading image. Try again later.");
//   //     }
//   //     imageURL = `${
//   //       import.meta.env.VITE_PROJECT_URL
//   //     }/storage/v1/object/public/${data.fullPath}`;
//   //   } catch (error) {
//   //     imageURL = "";
//   //     console.log(error);
//   //     throw new Error(error.message);
//   //   }
//   // }

//   const { data, error } = await supabase
//     .from("books")
//     // .insert([
//     //   {
//     //     ...rest,
//     //     image: imageURL,
//     //   },
//     // ])
//     .insert([book])
//     .select();

//   if (error) {
//     console.log(error);
//     throw new Error("Error while adding book. Try again later.");
//   }

//   return data;
// };



export const addBook = async (book: AddBookPayload) => {
  const supabase = createClient()
  const { image, ...rest } = book;
  let imageURL = "";
  if (image) {


    try {
      const imageName = `${Date.now()}_${image.name}`;
      const { data, error } = await supabase.storage
        .from("book_images")
        .upload(imageName, image);
      if (error) {
        throw new Error("Error while uploading image. Try again later.");
      }
      imageURL = `${process.env.NEXT_PUBLIC_PROJECT_URL}/storage/v1/object/public/${data.fullPath}`;
    } catch (error: any) {
      imageURL = "";
      console.log(error);
      throw new Error(error.message);
    }
  }

  const { data, error } = await supabase
    .from("books")
    .insert([
      {
        ...rest,
        image: imageURL,
      },
    ]).select();

  if (error) {
    console.log(error);
    throw new Error("Error while adding book. Try again later.");
  }

  return data;
};


// export const updateBook = async ({ id, book }) => {
//   const supabase = createClient();

//   const { image, ...rest } = book;

//   let imageURL = book.image;

//   try {
//     // 🔥 CASE 1: USER UPLOADS NEW IMAGE
//     if (image) {
//       const imageName = `${Date.now()}_${image.name}`;

//       const { data, error } = await supabase.storage
//         .from("book_images")
//         .upload(imageName, image);

//       if (error) {
//         throw new Error("Error while uploading image. Try again later.");
//       }

//       imageURL = `${process.env.NEXT_PUBLIC_PROJECT_URL}/storage/v1/object/public/${data.fullPath}`;

//       // delete old image
//       if (book.image) {
//         const oldPath = book.image.split("/book_images/")[1];

//         if (oldPath) {
//           await supabase.storage
//             .from("book_images")
//             .remove([oldPath]);
//         }
//       }
//     }

//     // 🔥 CASE 2: USER REMOVES IMAGE (no new upload, but image explicitly null)
//     else if (image === null) {
//       imageURL = "";

//       if (book.image) {
//         const oldPath = book.image.split("/book_images/")[1];

//         if (oldPath) {
//           await supabase.storage
//             .from("book_images")
//             .remove([oldPath]);
//         }
//       }
//     }

//     // 🔥 CASE 3: NO CHANGE IN IMAGE
//     // (image undefined → keep old image)
//   } catch (error:any) {
//     console.log(error);
//     throw new Error(error.message);
//   }

//   // 🔥 UPDATE DB
//   const { data, error } = await supabase
//     .from("books")
//     .update({
//       ...rest,
//       image: imageURL,
//     })
//     .eq("id", id)
//     .select();

//   if (error) {
//     console.log(error);
//     throw new Error("Error while updating book. Try again later.");
//   }

//   return data;
// };






export type UpdateBookData = {
  name: string;
  author: string;
  publisher: string;
  isbn: string;
  image?: File | null;
  existingImage?: string;
};


//ye oringalhai
// export type UpdateBookPayload = {
//   id: string;
//   book: UpdateBookData;
// };
// export const updateBook = async ({ id, book }: UpdateBookPayload) => {
//   const supabase = createClient();

//   const { image, existingImage, ...rest } = book;

//   // default = old image
//   let imageURL = existingImage || "";

//   try {
//     // 🔥 CASE 1: NEW IMAGE UPLOAD
//     if (image instanceof File) {
//       const imageName = `${Date.now()}_${image.name}`;

//       const { data, error } = await supabase.storage
//         .from("book_images")
//         .upload(imageName, image);

//       if (error) {
//         console.log(error);

//         throw new Error("Error while uploading image. Try again later.", );

//       }

//        imageURL = `${process.env.NEXT_PUBLIC_PROJECT_URL}/storage/v1/object/public/${data.fullPath}`;

//       // delete old image
//       if (existingImage) {
//         const oldPath = existingImage.split("/book_images/")[1];

//         if (oldPath) {
//           await supabase.storage
//             .from("book_images")
//             .remove([oldPath]);
//         }
//       }
//     }

//     // 🔥 CASE 2: USER REMOVES IMAGE
//     else if (image === null) {
//       imageURL = "";

//       if (existingImage) {
//         const oldPath = existingImage.split("/book_images/")[1];

//         if (oldPath) {
//           await supabase.storage .from("book_images").remove([oldPath]);
//         }
//       }
//     }

//     // 🔥 CASE 3: NO IMAGE CHANGE → keep old image
//     const { data, error } = await supabase.from("books").update({
//         ...rest,
//         image: imageURL,
//       }).eq("id", id).select();

//     if (error) {
//       throw new Error("Error while updating book. Try again later.");
//     }

//     return data;
//   } catch (error: any) {
//     console.log(error);
//     throw new Error(error.message);
//   }
// };


export type UpdateBookPayload = {
  id: string;
  book: {
    name: string;
    author: string;
    publisher: string;
    isbn: string;
  };
  image?: File | null;
};


export const updateBook = async ({ id, book, image }: UpdateBookPayload) => {
  const supabase = createClient();

  // GET OLD IMAGE FROM DB
  const { data: existingBook } = await supabase
    .from("books")
    .select("image")
    .eq("id", id)
    .single();

  let imageURL = existingBook?.image || "";

  // NEW IMAGE UPLOAD
  if (image instanceof File) {
    const imageName = `${Date.now()}_${image.name}`;

    const { data, error } = await supabase.storage
      .from("book_images")
      .upload(imageName, image);

    if (error) {
      throw new Error("Image upload failed");
    }

    imageURL = `${process.env.NEXT_PUBLIC_PROJECT_URL}/storage/v1/object/public/${data.fullPath}`;

    // DELETE OLD IMAGE
    if (existingBook?.image) {
      const oldPath =
        existingBook.image.split("/book_images/")[1];

      if (oldPath) {
        await supabase.storage
          .from("book_images")
          .remove([oldPath]);
      }
    }
  }

  // REMOVE IMAGE
  else if (image === null && existingBook?.image) {
    const oldPath =  existingBook.image.split("/book_images/")[1];

    if (oldPath) {
      await supabase.storage
        .from("book_images")
        .remove([oldPath]);
    }

    imageURL = "";
  }

  // UPDATE DB
  const { data, error } = await supabase.from("books")
    .update({
      ...book, image: imageURL
    }).eq("id", id).select();

  if (error) {
    throw new Error("Book update failed");
  }

  return data;
};

























































// export const updateBook = async ({ id, book }) => {
//   const supabase = createClient()
//   const { data, error } = await supabase
//     .from("books")
//     .update(book)
//     .eq("id", id)
//     .select();

//   if (error) {
//     console.log(error);
//     throw new Error("Error while updating book. Try again later.");
//   }

//   return data;
// };

export const getSingleBook = async (id: string) => {
  const supabase = createClient()
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

type DeleteBookPayload = {
  id: string;
  image: string;
};

export const deleteBook = async ({ id, image }:DeleteBookPayload) => {
  const supabase = createClient()
  if (image) {
    const { error } = await supabase.storage
      .from("book_images")
      .remove([image.split("/").pop()!]);
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



export const getBooksByStudentId = async (studentId:string) => {
  const supabase = createClient()
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
  console.log("bookss", books);


  if (booksError) {
    console.log(booksError);
    throw new Error(
      "Error while getting books by student id. Try again later."
    );
  }

  return books;
};







export const getUnassignedBooks = async () => {

  const supabase = createClient()

  const { data: student_books, error } = await supabase.from("student_books").select("book_id");

  console.log(student_books);

  if (error) {
    console.log(error);
    throw new Error("Error while getting unassigned books. Try again later.");
  }

  const bookIds = student_books.map((book) => book.book_id).join(",");
  // console.log(bookIds);


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



