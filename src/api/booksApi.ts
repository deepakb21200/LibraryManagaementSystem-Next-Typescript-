import { createClient } from "@/lib/supabase";
import { BookFields } from "@/types/type";



export const getBooks = async () => {
      const supabase=createClient()
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





export const updateBook = async ({ id, book }:UpdateBookParams ) => {
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

