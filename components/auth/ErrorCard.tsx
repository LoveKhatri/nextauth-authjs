import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { BackButton } from "./BackButton";
import { CardWrapper } from "./CardWrapper";
import Header from "./Header";

export const ErrorCard = () => {
    return (
        <>
            <CardWrapper
                headerLabel="Oops! Something went wrong"
                backButtonHref="/auth/login"
                backButtonLabel="Back to login"
            >
                <div className="w-full flex justify-center items-center">
                    <ExclamationTriangleIcon className="text-destructive"/>
                </div>
            </CardWrapper>
        </>
    );
};