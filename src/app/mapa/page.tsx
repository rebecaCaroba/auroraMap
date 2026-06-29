import { Header } from "@/components/Header";
import { MapViewport } from "@/components/MapViewport";
import { authUser } from "@/lib/authUser";
import { redirect } from "next/navigation";

export default async function Mapa() {
    const user = await authUser()     

    if(!user) {
        return redirect("/login")
    }

    return (
        <main>
            <Header user={user}  />
            <MapViewport user={user} />
        </main>
    )
}