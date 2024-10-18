"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function Carrousel() {
  const router = useRouter(); // Initialiser le router pour gérer les redirections

  // Fonction qui redirige vers une page spécifique selon la catégorie
  const redirectionCategory = (category: string) => {
    router.push(`/instrument/category/${category}`); // Utilisation du nom de la catégorie dans l'URL
  };

  const cards = data.map((card, index) => (
    <Card
      key={card.src}
      card={card}
      index={index}
      onClick={() => redirectionCategory(card.category)} // Redirection lors du clic
    />
  ));

  return (
    <div className="w-full h-full pb-5 bg-black">
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <Image
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Guitare",
    title: "Guitares",
    src: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Clavier",
    title: "Claviers",
    src: "https://images.unsplash.com/photo-1524578471438-cdd96d68d82c?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Batteries",
    title: "Batteries",
    src: "https://images.unsplash.com/photo-1602939444907-6e688c594a66?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Instrument à vent",
    title: "Instruments à vent",
    src: "https://images.unsplash.com/photo-1698912237019-3a2b25399dec?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Accessoires",
    title: "Accessoires",
    src: "https://images.unsplash.com/photo-1420161900862-9a86fa1f5c79?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Vinyls",
    title: "Vinyls",
    src: "https://images.unsplash.com/photo-1458560871784-56d23406c091?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
];
