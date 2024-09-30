import { Outlet } from "react-router-dom";
import { Header } from "./header";
import ConfirmationModal from "./confirmation-modal";

export default function RootLayout() {
    return (
        <div className="min-h-screen font-sans bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202024-09-30%2009.09.02%20-%20A%20seamless%20background%20featuring%20large,%20dark%20green%20tropical%20leaves%20with%20smooth%20textures%20and%20soft%20light%20highlights.%20The%20leaves%20are%20layered%20in%20a%20natural,-hHxFMPjyxfMGW4qNFuKzqMC2DdIDwJ.webp')" }}>
            <div className="min-h-screen bg-black bg-opacity-50">
                <Header />
                <main className="container mx-auto px-6 py-8">
                    <Outlet />

                </main>
                <ConfirmationModal />
            </div>
        </div>
    )
}