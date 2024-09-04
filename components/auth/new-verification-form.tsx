"use client"

import { useSearchParams } from "next/navigation"
import { CardWrapper } from "./CardWrapper"
import {BeatLoader} from "react-spinners"
import { useCallback, useEffect, useState } from "react"
import { FormError } from "../FormError"
import { FormSucces } from "../FormSuccess"
import { newVerification } from "@/actions/new-verification"


export const NewVerificationForm = () => {


    const [error, setError]= useState<string | undefined>("")
    const [success, setSuccess]= useState<string | undefined>("")
    
   


    const searchParams = useSearchParams();

    const token = searchParams.get("token");
    

    const onSubmit = useCallback(()=>{
        if(!token){
            if(success || error) return;
            setError("Missing Token")
        };

        newVerification(token as string)
        .then((data) => {
            setSuccess(data.success);
            setError(data.error);
        })
        .catch(() =>{
            setError("Something went Wrong")
        });
    }, [token, success, error]);

    useEffect(()=>{
       onSubmit() 
    },[onSubmit]);

    return(
        <CardWrapper
        headerLabel="Confirming your verification"
        backButtonLabel="Back to login"
        backButoonHref="/auth/login"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error && (
                <BeatLoader/>
                )}
                <FormSucces message={success}/>
                {!success && (
                <FormError message={error}/>
                )}
            </div>
        </CardWrapper>
    )
}