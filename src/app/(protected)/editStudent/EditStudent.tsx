"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


import { toast } from "sonner";

import StudentForm, { EditPayload, FormValues, HandleSubmit, Student } from "@/components/other/StudentForm";


import { updateStudent } from "@/api/studentBooksApi";
import { useRouter } from "next/navigation";
import { getSingleStudent } from "@/api/studentsApi";

type Props = {
  id: string;
};



const EditStudent = ({ id }: Props) => {

  const router = useRouter()
  const queryClient = useQueryClient();



  const { isPending, mutateAsync } = useMutation({
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
  } = useQuery({
    queryKey: ["singleStudent", id],
    queryFn: () => getSingleStudent(id),
  });








  //editstudentcomponent
  const handleFormSubmit: HandleSubmit = async (values) => {
    try {

      await mutateAsync(values as EditPayload);

      return true;

    } catch {
      return false;
    }
  };




  return (
    <>
      <div className="flex justify-center h-full items-center ">

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