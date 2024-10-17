"use client"

import * as React from "react"
import { useEffect, useState } from "react";
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { IconSearch } from '@tabler/icons-react';
// import jwt_decode from "jwt-decode";
import { decodeJwt } from "jose"; // Importation de jose pour décoder le JWT
import { useRouter } from "next/navigation"; // 

import { cn } from "@/lib/utils"
//import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

interface UserPayload {
  username: string;
  email: string;
  // Ajoute d'autres propriétés si nécessaire
}

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]


export function Navbar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    {/* <Icons.logo className="h-6 w-6" /> */}
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components that you can copy and
                      paste into your apps. Accessible. Customizable. Open
                      Source.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export function Header() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/auth/signup"); // Redirection vers /dashboard
  };

    return (
      <div className="sticky bg-white top-0 w-full h-16 flex items-center justify-between px-4 z-[999]">
       <h1>GLOOM</h1>
        <Navbar />
        <div className="flex w-full max-w-[35rem] items-center space-x-2">
          <Input type="Search" placeholder="Search" className="rounded-3xl" />
          <Button type="submit" className="flex items-center space-x-2 bg-[#012611] text-white rounded-lg">
            <IconSearch size={20} />
            {/* <span>Subscribe</span> */}
          </Button>
        </div>
        <div className="flex gap-4">
          <Button className="bg-[green] text-white rounded-2xl" type="button" onClick={handleRedirect}>S'inscrire</Button>
          <Button className="bg-black text-white rounded-2xl" type="button">Ajouter une annonce</Button>
        </div>
      </div>
    );
  }
  export function HeaderLog() {
    const [userInfo, setUserInfo] = useState<UserPayload | null>(null);
    const router = useRouter(); // Initialiser le router pour gérer les redirections
  
    useEffect(() => {
      // Récupérer le token depuis le sessionStorage
      const token = sessionStorage.getItem("authToken");
  
      if (token) {
        try {
          // Décoder le token pour extraire les informations
          const decoded = decodeJwt(token); // Utilise decodeJwt pour décoder le JWT
  
          // Le JWT décodé contient les informations dans son payload
          const userPayload: UserPayload = {
            username: decoded.username as string,
            email: decoded.email as string,
          };
  
          setUserInfo(userPayload); // Mettre les infos utilisateur dans l'état
        } catch (error) {
          console.error("Erreur lors du décodage du token:", error);
        }
      }
    }, []);
  
    // Fonction pour rediriger vers /dashboard
    const handleRedirect = () => {
      router.push("/dashboard"); // Redirection vers /dashboard
    };
  
    return (
      <div className="sticky bg-white top-0 w-full h-16 flex items-center justify-between px-4 z-[999]">
        <h1>GLOOM</h1>
        <Navbar />
        <div className="flex w-full max-w-[35rem] items-center space-x-2">
          <Input type="Search" placeholder="Search" className="rounded-3xl" />
          <Button type="submit" className="flex items-center space-x-2 bg-[#012611] text-white rounded-lg">
            <IconSearch size={20} />
          </Button>
        </div>
        <div className="flex gap-4">
          <Button className="bg-black text-white rounded-2xl" type="submit">
            Ajouter une annonce
          </Button>
          <Button
            className="bg-[green] text-white rounded-2xl"
            type="button"
            onClick={handleRedirect} // Ajouter l'événement onClick pour la redirection
          >
            {userInfo ? userInfo.username : "Chargement..."}
          </Button>
        </div>
      </div>
    );
  }
  
