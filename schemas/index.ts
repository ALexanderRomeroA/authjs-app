import * as z from "zod";


export const LoginSchema = z.object({
    email: z.string().email({
        message:"Email is requiered"
    }),
    password: z.string().min(1,{
        message:"Password is requiered"
    })
})

export const NewPaswordSchema = z.object({
    password: z.string().min(6,{
        message:"Minimun 6 characters"
    }),
})

export const ResetSchema = z.object({
    email: z.string().email({
        message:"Email is requiered"
    }),
})


export const RegisterSchema = z.object({
    name: z.string(),
    email: z.string().email({
        message:"Password is requiered"
    }),
    password: z.string().min(6,{
        message:"Minimun 6 characters"
    }),
    
})