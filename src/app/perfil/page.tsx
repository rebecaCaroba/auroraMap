import { Header } from "@/components/Header";
import { ProfileComponent } from "@/components/ProfileComponent";
import { authUser } from "@/lib/authUser";
import { redirect } from "next/navigation";

export default async function Perfil() {
    const user = await authUser()

    if(!user) {
        return redirect("/login")
    }

    return (
        <>
            <Header user={user} />
            <ProfileComponent user={user} />
        </>
    )
}