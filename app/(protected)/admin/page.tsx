"use client";

import { RoleGate } from "@/components/auth/role-gate";
import { FormSucces } from "@/components/FormSuccess";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () =>{

    const onApiRouterClick = () =>{
        fetch("/api/admin")
        .then((response) =>{
            if(response.ok){
                toast.success("Allowed Api Route")
            }else{
                toast.error("FORBIDDEN API");
            }
        })
    }

    const role = useCurrentRole();

    return(
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    🔑Admin
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSucces message="You are allowed to se this"/>
                </RoleGate>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">
                        Admin-only API ROUTE
                    </p>
                    <Button onClick={onApiRouterClick}>
                        Click to test
                    </Button>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">
                        Admin-only server action
                    </p>
                    <Button>
                        Click to test
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default AdminPage