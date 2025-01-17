"use server";

import { getPasswordResetTokenByToken } from "@/data/passwordResetToken";
import { getUserByEmail } from "@/data/user";
import { NewPasswordSchema } from "@/schemas";
import * as z from "zod";
import bcryptjs from "bcryptjs";
import { db } from "@/lib/db";

export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token: string) => {
    if (!token) {
        return { error: "Missing Token" }
    }

    const validatedValues = NewPasswordSchema.safeParse(values);

    if (!validatedValues.success) {
        return {
            error: "Invalid password"
        }
    }

    const { password } = validatedValues.data;

    const existingToken = await getPasswordResetTokenByToken(token);
    if (!existingToken) {
        return { error: "Invalid token" }
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
        return { error: "Token has expired" }
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
        return { error: "User not found" }
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            password: hashedPassword
        }
    })

    await db.passwordResetToken.delete({
        where: {
            id: existingToken.id
        }
    })

    return { success: "Password updated" }

}