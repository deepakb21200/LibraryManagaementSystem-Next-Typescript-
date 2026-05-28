"use server"

import { FormValues } from "@/components/other/StudentForm";
import { createClient } from "@/lib/supabase";





export const getStudents = async () => {
  const supabase = createClient()
  const { data: students, error } = await supabase
    .from("students")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.log(error);
    throw new Error("Error while getting list of students. Try again later.");
  }

  // console.log("rocks", students);

  return students;
};







export const addStudent = async (student: FormValues) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("students")
    .insert([student])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Error while adding student. Try again later.");
  }
  // console.log("add student,", data);
  return data;
};



export const getSingleStudent = async (id: string) => {
  const supabase = createClient()
  const { data: student, error } = await supabase
    .from("students")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    throw new Error(
      "Error while getting student information. Try again later."
    );
  }

  return student;
};





export const deleteStudent = async (id: string) => {
  const supabase = createClient()

  const { data, error } = await supabase.from("students").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Error while deleting student. Try again later.");
  }

  return data;
};






export const getStudentByBookId = async (bookId: string) => {
  const supabase = createClient()

  const { data: student_books, error } = await supabase
    .from("student_books")
    .select("student_id")
    .eq("book_id", bookId)
    .maybeSingle();

  // console.log(student_books,"d");

  if (error) {
    console.log(error);
    throw new Error(
      "Error while getting student information. Try again later."
    );
  }

  if (!student_books) {
    console.log(error);
    throw new Error("This book is not assigned to any student.");
  }

  const { data: student, error: studentError } = await supabase
    .from("students")
    .select("*")
    .eq("id", student_books.student_id)
    .maybeSingle();
  console.log(student);

  if (studentError) {
    console.log(studentError);
    throw new Error(
      "Error while getting student information. Try again later."
    );
  }

  return student;

};
