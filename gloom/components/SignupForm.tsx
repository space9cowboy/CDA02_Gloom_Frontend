"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { InputAceternity } from "./ui/input-aceternity";
import { cn } from "@/lib/utils";
import { BackgroundGradient } from "./ui/background-gradient";
import { useRouter } from "next/navigation";

export function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Réinitialiser les messages
    setErrorMessage("");
    setSuccessMessage("");

    // Créer le payload pour l'inscription
    const payload = {
      username,
      email,
      password,
      type: "individual", // Si c'est un champ fixe
    };

    try {
      // Faire la requête POST vers l'API d'inscription
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erreur d'inscription");
      }

      const data = await res.json();
      setSuccessMessage("Inscription réussie !");

      router.push("/auth/login"); // Redirection

      console.log("Réponse API : ", data);
    } catch (error: any) {
      setErrorMessage(error.message || "Erreur lors de l'inscription");
    }
  };

  return (
    <div
      className="relative w-full h-full min-h-screen flex justify-center items-center"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1543840950-e6529649ce74?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
      }}
    >
      <BackgroundGradient>
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Bienvenue sur Gloom 🎸
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Si vous n'avez pas encore de compte, vous pouvez vous inscrire dans
            le formulaire ci-dessous
          </p>

          {/* Affichage des messages de succès ou d'erreur */}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-sm mt-2">{successMessage}</p>
          )}

          <form className="my-8" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="username">Nom d'utilisateur</Label>
                <InputAceternity
                  id="username"
                  placeholder="Tyler"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email</Label>
              <InputAceternity
                id="email"
                placeholder="projectmayhem@fc.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
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
              S'inscrire &rarr;
              <BottomGradient />
            </button>
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
