"use server";

import * as z from "zod";

import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import {error} from "console"
import { revalidatePath, revalidateTag } from "next/cache";
import { DEFUAL_LOGIN_REDIRECT } from "@/routes";
import { AuthError, CredentialsSignin } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { useForm } from "react-hook-form";
import { GoVerified } from "react-icons/go";


export const Login = async (values:z.infer<typeof LoginSchema>) =>{
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "invalid Fields"};
    }

    const {email, password} =validatedFields.data;


    const existingUser = await getUserByEmail(email as string);

    if( !existingUser || !existingUser.email || !existingUser.password){
        return {error: "Invalid Credentials!"}
    }
    
    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email);
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        );
        return {success: "Confirmation email sent!"}
    }


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