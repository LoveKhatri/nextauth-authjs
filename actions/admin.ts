"use server";

import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const admin = async () => {
    const role = await currentRole();

    if (role === UserRole.USER) {
        return { error: "Forbidden", status: 403 }
    }

    return { success: "Allowed to use this action", status: 200 }
}