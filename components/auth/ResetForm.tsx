"use client"

import { CardWrapper } from "./CardWrapper";

import * as z from "zod";
import {ResetSchema} from "@/schemas"

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
import { reset } from "@/actions/reset";

import { useState, useTransition } from "react";


export const ResetForm =()=>{

    const [error, setError] =  useState<string | undefined>("");
    const [success, setSuccess] =  useState<string | undefined>("");


    const [isPending, startTransition] = useTransition();
    
    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email:"",
        }
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) =>{

        setError("");
        setSuccess("");

        startTransition(()=>{
            reset(values)
            .then((data)=>{
                setSuccess(data?.success);
            })
        });

    }

    return(
        <CardWrapper
        headerLabel="Olvidaste Tu conmtraseña?"
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
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="john.doe@example.com"
                                        type="email"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                             )}
                        />
                        
                    </div>
                    
                    <FormSucces message={success} />

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