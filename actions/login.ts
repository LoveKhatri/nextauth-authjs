"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Invalid Credentials"
        }
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {
            error: "Use a different login method!"
        }
    }

    // if (!existingUser.emailVerified) {
    //     const verificationToken = await generateVerificationToken(existingUser.email);

    //     return {
    //         success: "Confirmation email sent!"
    //     }
    // }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid Credentials!" }
                default:
                    return { error: "Something went wrong!2" }
            }
        }
        throw error;
    }
}