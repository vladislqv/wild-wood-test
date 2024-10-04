import { Outlet } from "react-router-dom";
import { Header } from "./header";
import ConfirmationModal from "./confirmation-modal";
import { useAppStore } from "@/store/appStore";
import LoginPage from "./login-page";

export default function RootLayout() {
    const { tableNumber } = useAppStore();

    return (
        <div className="min-h-screen font-sans bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background.webp')" }}>
            {tableNumber ? (
                <div className="min-h-screen bg-black bg-opacity-50">
                    <Header />
                    <main className="container mx-auto px-6 py-8">
                        <Outlet />
                    </main>
                    <ConfirmationModal />
                </div>
            ) : (
                <LoginPage />
            )}

        </div>
    )
}