"use client"

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-curret-user";
import {signOut} from "next-auth/react"

const SettingsPage = ()=> {

    const user = useCurrentUser();
    const onClick = () => {signOut()}
    

    return(
        <div className="bg-white p-10 rounded-xl">
            <form>
                <Button type="submit" onClick={onClick}>sign out</Button>
            </form>
        </div>

    )
    
    
}

export default  SettingsPage