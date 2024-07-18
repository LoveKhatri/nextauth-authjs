"use client";

import { CardWrapper } from "./CardWrapper"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";
import { useState, useTransition } from "react";
import { reset } from "@/actions/reset";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/newPassword";

export const NewPasswordForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        }
    });

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError(undefined);
        setSuccess(undefined);

        startTransition(() => {
            newPassword(values, token!)
                .then((data) => {
                    console.log("data", data);
                    setError(data?.error);
                    // TODO: work on 2FA
                    setSuccess(data?.success);
                })
        })
    }

    return (
        <>
            <CardWrapper
                headerLabel="Enter a new password"
                backButtonLabel="Back to login"
                backButtonHref="/auth/login"
            >
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                {...field}
                                                type="password"
                                                placeholder="*******"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full"
                        >
                            Reset Password
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </>
    )
}