import Link from "next/link";

export const InstrumentCard = ({ instrument }: { instrument: any }) => (
    <div className="bg-white text-black rounded-lg shadow-lg overflow-hidden max-h-[420px]">
      <img
        src={instrument.image}
        alt={instrument.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <p className="text-sm text-gray-500">{instrument.brand}</p>
        <h3 className="text-lg font-semibold text-gray-800">{instrument.title}</h3>
        <p className="text-sm text-gray-600 mt-2 mb-4 truncate">{instrument.description}</p>
        <p className="text-xl font-bold text-green-600">{instrument.price}€</p>
        <div className="flex justify-between items-center mt-4">
          <Link href={`/instrument/${instrument.id}`} className="bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700 transition">
              Voir le produit
       
          </Link>
          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );