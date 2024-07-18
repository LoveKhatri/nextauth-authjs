import { auth } from "@/auth";
import UserInfo from "@/components/UserInfo";
import { currentUser } from "@/lib/auth";

const ServerPage = async () => {
    const user = await currentUser();

    return (
        <>
            <div>
                <UserInfo
                    label="💻 Server Component"
                    user={user}
                />
            </div>
        </>
    )
}

export default ServerPage;