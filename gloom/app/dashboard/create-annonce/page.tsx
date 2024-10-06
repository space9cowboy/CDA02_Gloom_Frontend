import Image from "next/image";
// import { Title } from "@/components/Title";
import { SignupForm } from "@/components/SignupForm";
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function Auth() {
  return (
    <div className="flex flex-col items-center h-screen gap-12">
    <Header />
    {/* <SignupForm /> */}
    <Footer />
    </div>
  );
}
