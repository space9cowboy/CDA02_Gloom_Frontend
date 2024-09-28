import Image from "next/image";
import { Title } from "@/components/Title";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen gap-16">
      <Header />
      <Title />
    </div>
  );
}
