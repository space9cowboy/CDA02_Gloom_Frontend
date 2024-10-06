import Image from "next/image";
import { Title } from "@/components/Title";
import { Header } from "@/components/Header";
import { Category } from "@/components/Category";
import { Card } from "@/components/Card";
import { ListCardsGuitar, ListCardsPiano, ListCardsRecent } from "@/components/ListCards";
import { Footer } from "@/components/Footer";
import { Carrousel } from "@/components/Carrousel";

export default function Home() {
  return (
    <div className="flex flex-col  min-h-screen font-sans">
      <Header />
      <Category />
      <Title />
      {/* <Card /> */}
      <ListCardsRecent /> 
      <Carrousel />
      <ListCardsGuitar />
      <ListCardsPiano />
      <Footer />   
    </div>
  );
}
