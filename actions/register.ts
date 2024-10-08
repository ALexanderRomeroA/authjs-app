"use server";

import * as z from "zod";

import { RegisterSchema } from "@/schemas";

import { revalidatePath, revalidateTag } from "next/cache";
import { error } from "console";

import bcrypt from "bcryptjs"
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

import { generateVerificationToken } from "@/lib/tokens";

import { sendVerificationEmail } from "@/lib/mail";


export const Register = async (values:z.infer<typeof RegisterSchema>) =>{
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "invalid Fields"};
    }

    const {name, email, password} = validatedFields.data;
    const hashPassword = await bcrypt.hash(password,10);

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return {error: "Email already in use"};
    }

    await db.user.create({
        data: {name,
        email,
        password: hashPassword,}
    });


    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    )

    return {success: "Comfirmation email sent!"}
}