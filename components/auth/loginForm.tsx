"use client"

import { CardWrapper } from "./CardWrapper";

import * as z from "zod";
import {LoginSchema} from "@/schemas"

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
import { Login } from "@/actions/login";

import { useState, useTransition } from "react";
import Link from "next/link";


export const LoginForm =()=>{

    const [error, setError] =  useState<string | undefined>("");
    const [success, setSuccess] =  useState<string | undefined>("");


    const [isPending, startTransition] = useTransition();
    
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email:"",
            password:""
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) =>{

        setError("");
        setSuccess("");

        startTransition(()=>{
            Login(values)
            .then((data)=>{
                window.location.reload();
                setError(data?.error);
                setSuccess(data?.success);
            })
        });

    }

    return(
        <CardWrapper
        headerLabel="Welcome Back"
        backButtonLabel="Dont have an account?"
        backButoonHref="/auth/register"
        showSocial
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
                                        placeholder="123456"
                                        type="password"
                                        />
                                    </FormControl>
                                    <Button
                                        size="sm"
                                        variant={"link"}
                                        asChild
                                        className="px-0 font-normal"

                                    >
                                        <Link href="/auth/reset">
                                        Olvidaste la contraseña?
                                        </Link>
                                    </Button>
                                    <FormMessage/>
                                </FormItem>
                             )}
                        />
                    </div>
                    
                    <FormError message={error}/>
                    <FormSucces message={success} />

                    <Button 
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        Login
                    </Button>

                </form>
            </Form>
        </CardWrapper>
    )
}