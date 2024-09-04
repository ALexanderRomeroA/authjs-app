"use server";

import * as z from "zod";

import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import {error} from "console"
import { revalidatePath, revalidateTag } from "next/cache";
import { DEFUAL_LOGIN_REDIRECT } from "@/routes";
import { AuthError, CredentialsSignin } from "next-auth";

export const Login = async (values:z.infer<typeof LoginSchema>) =>{
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "invalid Fields"};
    }

    const {email, password} =validatedFields.data;

    try {
        await signIn("credentials",{
            email,
            password,
            redirectTo: DEFUAL_LOGIN_REDIRECT,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    
                    return {error: "Invalid Credentials!"};
            
                default:
                    return {error: "Something went wrong!"};
            }
        }
        throw error;
    }
    
}