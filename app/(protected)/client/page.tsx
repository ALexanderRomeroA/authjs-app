"use client"

import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-curret-user";

const ClientPage = () =>{

    const user =useCurrentUser();

    return (
        <UserInfo
            label="client component"
            user={user}
            />
    )
};


export default ClientPage