import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { getUserInfo } from "@/services/auth/getUserInfo";

export default async function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getUserInfo();

    return (
        <main className=" min-h-screen flex flex-col">
            <Navbar user={user}></Navbar>
            <div className="grow-1">
                {children}
            </div>
            <Footer></Footer>
        </main>

    )
}