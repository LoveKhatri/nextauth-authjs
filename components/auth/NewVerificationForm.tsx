"use client";

import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./CardWrapper";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/newVerification";
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";

const NewVerificationForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const onSubmit = useCallback(() => {
        if (success || error) return;

        if (!token) {
            setError("Missing Token")
            return;
        }
        newVerification(token)
            .then((data) => {
                setSuccess(data.success)
                setError(data.error)
            })
            .catch((error) => {
                setError(error.message)
            })
    }, [token, success, error])

    useEffect(() => {
        onSubmit();
    }, [onSubmit])

    return (
        <>
            <CardWrapper
                headerLabel="Confirming your verification"
                backButtonHref="/auth/login"
                backButtonLabel="Back to login"
            >
                <div className="flex items-center w-full justify-center mb-4">
                    {!success && !error && (
                        <BeatLoader />
                    )}
                </div>
                {!success && (<FormError message={error} />)}
                <FormSuccess message={success} />
            </CardWrapper>
        </>
    )
}

export default NewVerificationForm;