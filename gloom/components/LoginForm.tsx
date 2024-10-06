"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { InputAceternity } from "@/components/ui/input-aceternity";
import { cn } from "@/lib/utils";
import { BackgroundGradient } from "./ui/background-gradient";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setErrorMessage(""); // Réinitialiser le message d'erreur

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erreur de connexion");
      }

      const data = await res.json();

      // Stocker le token dans le sessionStorage ou les cookies
      const token = data.data.token;
       // Assurez-vous que l'API renvoie un token dans la réponse
      sessionStorage.setItem("authToken", token); // Stocke le token dans le sessionStorage

      // Rediriger l'utilisateur ou mettre à jour l'interface après une connexion réussie
      console.log("Utilisateur connecté, token stocké:", token);
      
      // Si tu veux utiliser des cookies plutôt que sessionStorage:
      // document.cookie = `authToken=${token}; path=/; secure; HttpOnly`;

    } catch (error: any) {
      setErrorMessage(error.message || "Erreur lors de la connexion");
    }
  };

  return (
    <div
      className="relative w-full h-full min-h-screen flex justify-center items-center "
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1543840952-2aa90585c0a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
      }}
    >
      <BackgroundGradient>
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Connectez-vous à Gloom 🎸
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Connectez-vous avec votre nom d'utilisateur et votre mot de passe.
          </p>

          {/* Affichage du message d'erreur */}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}

          <form className="my-8" onSubmit={handleSubmit}>
            {/* Username */}
            <LabelInputContainer className="mb-4">
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <InputAceternity
                id="username"
                placeholder="Nom d'utilisateur"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </LabelInputContainer>
            {/* Password */}
            <LabelInputContainer className="mb-8">
              <Label htmlFor="password">Mot de passe</Label>
              <InputAceternity
                id="password"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Se connecter &rarr;
              <BottomGradient />
            </button>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          </form>
        </div>
      </BackgroundGradient>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
