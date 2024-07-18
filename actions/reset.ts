"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetSchema } from "@/schemas";
import * as z from "zod";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedValues = ResetSchema.safeParse(values);

    if (!validatedValues.success) {
        return {
            error: "Invalid email"
        }
    }

    const { email } = validatedValues.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return { error: "Email not found" }
    }

    const token = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(token.email, token.token);

    return { success: "Email sent" }
}