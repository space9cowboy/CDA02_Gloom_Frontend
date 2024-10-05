import Image from "next/image";
import { Title } from "@/components/Title";
import { Header } from "@/components/Header";
import { Category } from "@/components/Category";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen ">
      <Header />
      <Category />
      <Title />
    </div>
  );
}
