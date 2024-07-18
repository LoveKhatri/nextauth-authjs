"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/RoleGate";
import { FormSuccess } from "@/components/FormSuccess";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
// Client Component
import { useCurrentRole } from "@/hooks/useCurrentRole";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";
// Server Component
// import { currentRole } from "@/lib/auth";

// Server Component
// const AdminPage = async () => {
// Client Component
const AdminPage = () => {
    const role = useCurrentRole();

    // Server Component
    // const role = await currentRole();

    const onApiRouteClick = () => {
        fetch('/api/admin').then((res) => {
            if (res.ok) {
                toast.success("Allowed to see this route")
            } else {
                toast.error("Not allowed to see this route")
            }
        })
    }

    const onServerActionClick = () => {
        admin()
            .then((data) => {
                if (data.error) {
                    toast.error(data.error)
                }
                if (data.success) {
                    toast.success(data.success)
                }
            })
    }

    return (
        <>
            <Card className="w-[600px]">
                <CardHeader>
                    <p className="text-2xl font-semibold text-center">
                        🧑‍💻Admin
                    </p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <RoleGate allowedRole={UserRole.ADMIN}>
                        <FormSuccess message="You are allowed to see this" />
                    </RoleGate>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                        <p className="text-sm font-medium">
                            Admin only api route
                        </p>
                        <Button onClick={onApiRouteClick}>
                            Route
                        </Button>
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                        <p className="text-sm font-medium">
                            Admin only Server Action
                        </p>
                        <Button onClick={onServerActionClick}>
                            Action
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default AdminPage;