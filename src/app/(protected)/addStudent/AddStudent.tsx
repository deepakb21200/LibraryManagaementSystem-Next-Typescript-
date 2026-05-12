"use client"
import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addStudent } from "../../../api/studentsApi";
import { toast } from "sonner";
import StudentForm, { FormValues } from "@/components/other/StudentForm";




function AddStudent() {
    const queryClient = useQueryClient();
    let router = useRouter()

    const { isPending, mutateAsync } = useMutation({
        mutationKey: ["addStudent"],
        mutationFn: addStudent,
        onSuccess: () => {
            toast("✅ Student is added successfully.");
            queryClient.invalidateQueries({
                queryKey: ["students"],
            });
            setTimeout(() => {
                router.push("/studentsList");
            }, 1000);
        },
        onError: (error) => toast(`❌ ${error.message}`),
    });




    const handleFormSubmit = async (book: FormValues) => {
        try {
            await mutateAsync(book);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };
    return (
        <div>
            <h2 className="my-3 text-center text-3xl">Add Student</h2>
            <StudentForm handleFormSubmit={handleFormSubmit} isPending={isPending} />
        </div>
    )
}

export default AddStudent