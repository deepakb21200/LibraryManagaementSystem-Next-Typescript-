import z from "zod";

export const formSchema = z.object({
    name: z.string().refine((v) => v.trim() !== "", "This is a required field."),
    author: z.string().refine((v) => v.trim() !== "", "This is a required field."),
    publisher: z .string().refine((v) => v.trim() !== "", "This is a required field."),
    isbn: z.string().refine((v) => v.trim() !== "", "This is a required field."),
});


export type FormSchema = z.infer<typeof formSchema>



export interface BookFields{
  name:string
  author:string
  publisher:string
  isbn:string
}


// export interface BookFields {
//   name: string
//   author: string
//   publisher: string
//   isbn: string
// }

// export interface BookFieldsArray {
//   books: BookFields[]
// }