/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          // Appliquer ces en-têtes aux routes API
          source: "/api/(.*)",
  
          // Définir les en-têtes CORS
          headers: [
            // Autoriser l'accès à toutes les origines (ou définir une origine spécifique à la place de "*")
            {
              key: "Access-Control-Allow-Origin",
              value: "*", // Tu peux remplacer "*" par une origine spécifique si nécessaire, comme "https://example.com"
            },
  
            // Autoriser certaines méthodes HTTP
            {
              key: "Access-Control-Allow-Methods",
              value: "GET, POST, PUT, DELETE, OPTIONS",
            },
  
            // Autoriser certains en-têtes spécifiques dans les requêtes
            {
              key: "Access-Control-Allow-Headers",
              value: "Content-Type, Authorization",
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  
