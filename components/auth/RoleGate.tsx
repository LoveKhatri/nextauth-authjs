"use client";

import { useCurrentRole } from "@/hooks/useCurrentRole";
import { UserRole } from "@prisma/client";
import { FormError } from "../FormError";

interface RoleGateProps {
    allowedRole: UserRole;
    children: React.ReactNode;
}

export const RoleGate = ({ allowedRole, children }: RoleGateProps) => {
    const role = useCurrentRole();

    if (role !== allowedRole) {
        return (
            <FormError message="You don't have permission to view this" />
        )
    }

    return (
        <>
            {children}
        </>
    );
};