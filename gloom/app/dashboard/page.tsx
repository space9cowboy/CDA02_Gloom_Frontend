import { SidebarDashboard } from "@/components/Sidebar";
import { Header } from "@/components/Header";

export default function Auth() {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
      <Header />
      
      <SidebarDashboard />
      
      </div>
    );
  }