import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { removeAccents } from "../services/utils";
import { useClubs } from "../hooks/useClubs";
import API from "../api/api";
import { useState } from "react";

export const MainContent = () => {
  const [filteredClubs, setFilteredClubs] = useState("");
  const { clubs } = useClubs();

  const filtered = filteredClubs
    ? clubs?.filter(
      club =>
        club?.name?.toLowerCase().includes(filteredClubs?.toLowerCase()) ||
        club?.city?.toLowerCase().includes(filteredClubs?.toLowerCase())
    )
    : [];

  return (
    <>
      <SearchSection setFilteredClubs={setFilteredClubs} />
      {
        filteredClubs?.length > 0 ?
          <FoundClubs filtered={filtered} />
          :
          <>
            <MostWanted moreSearchesClubsByCity={clubs?.filter(club => club?.city === "Madrid").slice(0, 3)} cityName="Madrid" />
            <MostWanted moreSearchesClubsByCity={clubs?.filter(club => club?.city === "Cáceres").slice(0, 3)} cityName="Cáceres" />
          </>
      }
      <FeaturesSection />
      <ForClubsSection />
      <Testimonials />
    </>
  );
}

const MostWanted = ({ moreSearchesClubsByCity, cityName }) => {
  const city = removeAccents(moreSearchesClubsByCity?.[0]?.city?.toLocaleLowerCase());

  return (
    <div className="bg-[#F9F9F9] px-24 py-12">
      <div className="flex items-center justify-center mb-8">
        <p className="text-gray-900 font-semibold text-3xl">
          Las instalaciones deportivas más buscadas de {cityName}: ¡Reserva ya!
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {moreSearchesClubsByCity?.map((club) => (
          <div
            key={club.id}
            className="bg-white rounded-2xl shadow-md p-6 border border-[#E0E0E0]"
          >
            <h2 className="text-xl font-semibold text-[#2F80ED] mb-2">{club.name}</h2>
            {/* Faltarian las imagenes reales */}
            <img src={club.background} alt={club.name} className="w-full h-32 object-cover rounded-lg mb-4" />
            <p className="text-[#828282] mb-4">{club.address}</p>
            <Link
              to={`/club/${club.id}`}
              className="inline-block bg-[#2F80ED] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Ver detalles
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

const FeaturesSection = () => {
  const features = [
    {
      number: "1",
      title: "Encuentra",
      description:
        "Con EasyPadel puedes descubrir clubes de pádel cercanos, consultar sus instalaciones y elegir la pista que mejor se adapta a tus necesidades. Filtra por ubicación, tipo de pista o disponibilidad y encuentra fácilmente el lugar perfecto para jugar.",
    },
    {
      number: "2",
      title: "Reserva",
      description:
        "Accede rápidamente al calendario de pistas y realiza tu reserva en segundos. Con nuestro sistema intuitivo, puedes ver en tiempo real la disponibilidad y asegurar tu partido sin complicaciones, desde cualquier dispositivo.",
    },
    {
      number: "3",
      title: "Disfruta de la experiencia",
      description:
        "Juega con tus amigos o conoce nuevos compañeros de partido. EasyPadel te conecta con la comunidad de jugadores de tu zona y hace que organizar tus partidos sea tan divertido como jugarlos.",
    },
  ];

  return (
    <section className="bg-[#2F80ED] py-24 px-4 flex flex-col items-center">
      <h1 className="text-3xl text-white font-bold mb-12">EasyPadel para jugadores</h1>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {features.map((item) => (
          <div
            key={item.number}
            className="bg-white rounded-2xl shadow-lg p-6 relative"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-6 h-6 rounded-full bg-lime-400 text-black font-bold text-sm flex items-center justify-center">
                {item.number}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>
            </div>
            <hr className="border-t border-gray-300 mb-4" />
            <p className="text-gray-700 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

const ForClubsSection = () => {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            EasyPadel para clubes
          </h2>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            Gestiona tu club de pádel desde una única plataforma. Recibe reservas online, organiza tus pistas, controla la ocupación y crea actividades para fidelizar a tus clientes.
          </p>
          <Button className="bg-[#2F80ED] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Descubre EasyPadel Manager
          </Button>
        </div>

        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/for-clubs.jpg"
              alt="Gestión de club"
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};


const testimonials = [
  {
    name: 'Luis M.',
    title: '¡Perfecta para reservar!',
    stars: 5,
    text: '“Uso esta app todas las semanas para jugar con mis amigos. Reservar pista es rapidísimo y muy cómodo.”',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Ana G.',
    title: '¡Muy recomendable!',
    stars: 5,
    text: '“Antes era un lío encontrar disponibilidad. Ahora en segundos veo qué pistas hay libres cerca. ¡Una maravilla!”',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Carlos T.',
    title: 'Rápida y fácil',
    stars: 4,
    text: '“Me gusta mucho la app, aunque a veces algunas pistas se llenan demasiado rápido. Aun así, funciona genial.”',
    img: 'https://randomuser.me/api/portraits/men/76.jpg',
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 px-4 bg-[#2F80ED]">
      <h2 className="text-3xl font-bold text-center mb-12 text-white">Testimonios reales</h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 flex flex-col items-start shadow-md"
          >
            <div className="flex items-center gap-4 mb-3">
              <img
                src={t.img}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-lg">{t.title}</h3>
                <p className="text-sm opacity-50">{t.name}</p>
              </div>
            </div>
            <div className="flex mb-4">
              {Array.from({ length: t.stars }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">★</span>
              ))}
            </div>
            <p className="italic leading-relaxed">{t.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export const SearchSection = ({ setFilteredClubs, search = true }) => {
  return (
    <div className="bg-white py-12 px-6">
      {search &&
        <>
          <h1 className="text-5xl font-bold text-center mb-6">¡Encuentra tu club de pádel!</h1>
          <p className="text-gray-600 text-center mb-8">
            Busca por nombre, ciudad y reserva tu partido en segundos.
          </p>
        </>
      }
      <div className="max-w-md mx-auto flex items-center space-x-4">
        <input
          type="text"
          placeholder="Buscar por nombre o ciudad"
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFilteredClubs(e.target.value)}
        />
      </div>
    </div>
  );
};

const FoundClubs = ({ filtered }) => (
  <div>
    <p className="text-center text-gray-500">{filtered?.length} {filtered?.length > 1 ? "clubs encontrados" : "club encontrado"} </p>
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {filtered?.map((club) => (
        <div
          key={club.id}
          className="bg-white rounded-2xl shadow-md p-6 border border-[#E0E0E0]"
        >
          <h2 className="text-xl font-semibold text-[#2F80ED] mb-2">{club.name}</h2>
          {/* Faltarian las imagenes reales */}
          <img src={club.background} alt={club.name} className="w-full h-32 object-cover rounded-lg mb-4" />
          <p className="text-[#828282] mb-4">{club.address}</p>
          <Link
            to={`/club/${club.id}`}
            className="inline-block bg-[#2F80ED] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Ver detalles
          </Link>
        </div>
      ))}
    </div>
  </div>
)