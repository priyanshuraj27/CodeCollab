import Header from "../components/header";
import Footer from "../components/footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden transition-colors duration-300 bg-gradient-to-br from-[#D1F1D5] to-[#A7C7E7] dark:bg-[#3C4F67] text-gray-800 dark:text-white">
      <Header />
      <main className="flex-grow flex flex-col w-full h-full">
        <Outlet /> {/* Renders route-specific component */}
      </main>
      <Footer />
    </div>
  );
}
