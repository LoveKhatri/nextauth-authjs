"use client";

import { useTransition } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { settings } from "@/actions/settings";
import { useSession } from "next-auth/react";

const SettingsPage = () => {
    const [isPending, startTransition] = useTransition();

    // Update session inside Client component
    const { update } = useSession();

    const onClick = () => {

        startTransition(() => {
            settings({ name: "New Name 3" })
                .then(() => {
                    update();
                })
        })
    }

    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    ⚙️Settings
                </p>
            </CardHeader>
            <CardContent>
                <Button onClick={onClick} disabled={isPending}>
                    Update Name
                </Button>
            </CardContent>
        </Card>
    )
}

export default SettingsPage;