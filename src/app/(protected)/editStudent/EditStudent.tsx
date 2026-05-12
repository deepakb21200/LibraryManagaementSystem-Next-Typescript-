"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


import { toast } from "sonner";
import { FormValues, Student, UpdateStudent } from "@/types/student";
import StudentForm from "@/components/other/StudentForm";

 
import { updateStudent } from "@/api/studentBooksApi";
import { useRouter } from "next/navigation";
import { getSingleStudent } from "@/api/studentsApi";

type Props = {
  id: string;
};



const EditStudent = ({id}:Props ) => {
  // const params = useParams();
  // const id = params.id as string;
  const router = useRouter()
  const queryClient = useQueryClient();



  const { isPending, mutateAsync } = useMutation<Student[], Error, UpdateStudent>({
    mutationKey: ["editStudent"],
    mutationFn: updateStudent,
    onSuccess: () => {
      toast("✅ student is updated successfully.");
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
      queryClient.invalidateQueries({
        queryKey: ["singleStudent", id],
      });
      setTimeout(() => {
        router.push("/studentsList");
      }, 1000);
    },
    onError: (error) => toast(`❌ ${error.message}`),
  });

  const {
    data: student,
    isPending: studentIsPending,
    error,
  } = useQuery<Student, Error>({
    queryKey: ["singleStudent", id],
    queryFn: () => getSingleStudent(id),
  });





  //  const handleFormSubmit = async ({ id, student }: ) :Promise<boolean>=> {
  //   try {
  //     await mutateAsync({ id, student });
  //     return true;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // };


  // const handleFormSubmit = async (values: FormValues): Promise<boolean> => {
  //   try {
  //     await mutateAsync({ id, student: values });
  //     return true;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // };

//   const handleFormSubmit = async (values: FormValues) :Promise<boolean>=> {
//   // await mutateAsync({
//   //   id: student!.id,
//   //   student: values,
//   // });

//   if (!student) return false;
//   await mutateAsync({
//   id: student.id,
//   student: values,
// });

//   return true;
// };


const handleFormSubmit = async (values: FormValues): Promise<boolean> => {
  try {
    // if (!student) return false;

    await mutateAsync({
      id: student!.id,
      student: values,
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};



  //  const handleFormSubmit = async ({ id, student }:UpdateStudent ) :Promise<boolean>=> {
  //   try {
  //     await mutateAsync({ id, student });
  //     return true;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }

  return (
  <>
    <div  className="flex justify-center h-full items-center ">
      
      {error && <p className="text-2xl text-red-500 tracking-wide text-center">{error.message}</p>}
      {studentIsPending && <p className="text-center text-3xl my-2 tracking-wider">Loading...</p>}
        <StudentForm
        key={student?.id}
        student={student}
        handleFormSubmit={handleFormSubmit}
        isPending={isPending || studentIsPending}
      />
     
    </div>
   
  </>
  );
}

export default EditStudent