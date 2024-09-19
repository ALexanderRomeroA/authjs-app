"use client"

import { CardWrapper } from "./CardWrapper";

import * as z from "zod";
import {NewPaswordSchema} from "@/schemas"

import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { FormError } from "../FormError";
import { FormSucces } from "../FormSuccess";
import { newPassword } from "@/actions/new-password";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";


export const NewPasswordForm =()=>{

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [error, setError] =  useState<string | undefined>("");
    const [success, setSuccess] =  useState<string | undefined>("");


    const [isPending, startTransition] = useTransition();
    
    const form = useForm<z.infer<typeof NewPaswordSchema>>({
        resolver: zodResolver(NewPaswordSchema),
        defaultValues: {
            password:"",
        }
    });

    const onSubmit = (values: z.infer<typeof NewPaswordSchema>) =>{

        setError("");
        setSuccess("");

        startTransition(()=>{
            newPassword(values,token)
            .then((data)=>{
                setSuccess(data?.success);
            })
        });

    }

    return(
        <CardWrapper
        headerLabel="Crea tu nueva contrasña?"
        backButtonLabel="Ingresar"
        backButoonHref="/auth/login"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="******"
                                        type="password"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                             )}
                        />
                        
                    </div>
                    
                    <FormSucces message={success} />
                    <FormError message={error}/>
                    <Button 
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        Restablecer Contraseña
                    </Button>

                </form>
            </Form>
        </CardWrapper>
    )
}