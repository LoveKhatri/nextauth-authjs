"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { SettingsSchema } from "@/schemas";
import * as z from "zod";
import bcryptjs from "bcryptjs";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
    const user = await currentUser();
    if (!user) {
        return { error: "User not found" }
    }

    const dbUser = await getUserById(user.id);
    if (!dbUser) {
        return { error: "User not found" }
    }

    if (user.isOAuth) {
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.isTwoFactorEnabled = undefined;
    }

    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email);
        if (existingUser && existingUser.id !== user.id) {
            return { error: "Email already in use" }
        }

        const verificationToken = await generateVerificationToken(values.email);

        await sendVerificationEmail(verificationToken.email, verificationToken.token);

        return { success: "Verification email sent" }
    }

    if (values.newPassword && values.password && dbUser.password) {
        const passwordsMatch = bcryptjs.compare(values.password, dbUser.password);
        if (!passwordsMatch) {
            return { error: "Incorrect password" }
        }

        const hashedPassword = await bcryptjs.hash(values.newPassword, 10);

        values.password = hashedPassword;
        values.newPassword = undefined;
    }

    await db.user.update({
        where: { id: user.id },
        data: {
            ...values
        }
    })

    return { success: "Settings updated" }
}