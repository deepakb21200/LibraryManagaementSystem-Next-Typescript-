 

























import { EditPayload } from "@/components/other/StudentForm";
import { createClient } from "@/lib/supabase";



export const issueBook = async ({ book_id, student_id }: { book_id: string; student_id: string }) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("student_books")
    .insert([{ book_id, student_id }])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Error while issuing book. Try again later.");
  }

  return data;
};


export const updateStudent = async ({ id, student } :EditPayload) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("students")
    .update(student)
    .eq("id", id)
    .select();

  if (error) {
    console.log(error);
    throw new Error("Error while updating student. Try again later.");
  }

  return data;
};


export const returnBook = async ({ book_id }: { book_id: string }) => {
  const supabase = createClient()
  const { error, data } = await supabase
    .from("student_books")
    .delete()
    .eq("book_id", book_id);

  if (error) {
    console.log(error);
    throw new Error("Error while returning book. Try again later.");
  }

  return data;
};








export const getAnalyticsByStudentId = async ({ studentId, date }: { studentId: string; date: { from: Date; to: Date } }) => {
  const supabase = createClient()
  const { data, error, } = await supabase
    .from("student_books")
    .select("book_id")
    .eq("student_id", studentId)
    .gte("created_at", date.from.toISOString())
    .lte("created_at", date.to.toISOString())

  // console.log(data);

  // console.log(date.from.toISOString());
  // console.log(date.to.toISOString());


  if (error) {
    console.log(error);
    throw new Error("Error while getting analytics data. Try again later.");
  }

  if (data?.length === 0) {
    throw new Error("No issued books found for the provided data.");
  }

  const bookIds = data.map((item) => item.book_id);

  const { error: booksError, data: books } = await supabase
    .from("books")
    .select("*, student_books(created_at)")
    .in("id", bookIds);

  // console.log(books);


  if (booksError) {
    console.log(booksError);
    throw new Error("Error while getting analytics data. Try again later.");
  }

  const { error: studentsError, data: student } = await supabase
    .from("students")
    .select("*")
    .eq("id", studentId)
    .maybeSingle();

  if (studentsError) {
    console.log(studentsError);
    throw new Error("Error while getting analytics data. Try again later.");
  }

  return { books, student };
};