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
        <main>
            <Navbar user={user}></Navbar>
            {/* <Navbar role={user?.role}></Navbar> */}
            {children}
            <Footer></Footer>
        </main>

        // <div className="min-h-screen bg-gray-50">
        //     <Navbar />
        //     <div className="flex">
        //         <Sidebar />
        //         <main className="flex-1 p-6 lg:p-8">
        //             {children}
        //         </main>
        //     </div>
        // </div>
    )
}