import { Outlet } from "react-router-dom";
import { Header } from "./header";
import ConfirmationModal from "./confirmation-modal";

export default function RootLayout() {
    return (
        <div className="min-h-screen font-sans bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background.webp')" }}>
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