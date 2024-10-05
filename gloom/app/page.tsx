import Image from "next/image";
import { Title } from "@/components/Title";
import { Header } from "@/components/Header";
import { Category } from "@/components/Category";
import { Card } from "@/components/Card";
import { ListCardsGuitar, ListCardsPiano, ListCardsRecent } from "@/components/ListCards";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen ">
      <Header />
      <Category />
      <Title />
      {/* <Card /> */}
      <ListCardsRecent /> 
      <ListCardsGuitar />
      <ListCardsPiano />
      <Footer />   
    </div>
  );
}
