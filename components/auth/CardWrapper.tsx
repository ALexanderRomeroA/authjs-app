"use client"

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Header } from "./Header";
import { Social } from "./Social";
import { BackButton } from "./BackButton";

interface CardWrapperProps {
    children :React.ReactNode,
    headerLabel: string,
    backButtonLabel: string,
    backButoonHref: string,
    showSocial?: boolean;
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButoonHref,
    showSocial

}:CardWrapperProps)=>{

    return(
        <Card className="w-[400px] shadow-md ">
            <CardHeader>
                <Header label={headerLabel}></Header>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
                
            )}

            <CardFooter>
                <BackButton label={backButtonLabel} href={backButoonHref}></BackButton>
            </CardFooter>
        </Card>
    )
}