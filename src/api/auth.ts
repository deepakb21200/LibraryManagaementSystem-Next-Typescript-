import { createClient } from "@/lib/supabase";
    const supabase= createClient()

export const login = async ({ email, password }: { email: string; password: string }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log(error);
    throw new Error("Invalid credentials.");
  }

  console.log(data);
  

  return data;
};

export const getUser = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.log(error);
    throw new Error("Invalid session.");
  }

//   console.log(data,"rr");
//   return data 

   if (!data.session) return null;

  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();

  if (getUserError) {
    console.log(getUserError);
    throw new Error("Invalid session.");
  }
  console.log(data,"rr");
  return user;
};

//yeh original h
// export const logoutUser = async () => {
//   const { error, data } = await supabase.auth.signOut();

//   if (error) {
//     console.log(error);
//     throw new Error("Error during logout. Try again later.");
//   }

//   return data;
// };

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
    throw new Error("Error during logout. Try again later.");
  }
};
export const sendResetPasswordEmail = async (email:string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/resetPasswordScreen`,
  });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const updatePassword = async (password:string) => {
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
