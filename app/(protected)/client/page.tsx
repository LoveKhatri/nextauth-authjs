"use client";

import { auth } from "@/auth";
import UserInfo from "@/components/UserInfo";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { currentUser } from "@/lib/auth";

const ClientPage = () => {
    const user = useCurrentUser();

    return (
        <>
            <div>
                <UserInfo
                    label="📱 Client Component"
                    user={user}
                />
            </div>
        </>
    )
}

export default ClientPage;