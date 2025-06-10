import { useState } from "react";
import { useClubs, useCreateClub, useDeleteClub } from "../hooks/useClubs";
import { useUser } from "../hooks/useUser";
import { SearchSection } from "./Home";
import { useModal } from "../hooks/useModal";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export const ClubsManagement = () => {
    const { user } = useUser();
    const { clubs } = useClubs();
    const { open } = useModal();
    const { deleteClub } = useDeleteClub();
    const [filteredClubs, setFilteredClubs] = useState("");

    if (!user || !user.admin) {
        window.location.href = '/';
        return null;
    }
    const handleDelete = async (clubId) => {
        try {
            await deleteClub(clubId);
            window.location.reload();
        } catch (error) {
            alert("Error al borrar el club");
        }
    };

    const filtered = filteredClubs
        ? clubs?.filter(
            club =>
                club?.name?.toLowerCase().includes(filteredClubs?.toLowerCase()) ||
                club?.city?.toLowerCase().includes(filteredClubs?.toLowerCase())
        )
        : clubs;

    const navigateTo = (e) => {
        const clubId = e.currentTarget.id;
        window.location.href = `/club/${clubId}`;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
            <h1 className="text-3xl font-bold mb-6">Gestión de Clubs</h1>
            <div className="w-full max-w-4xl rounded-lg shadow-md p-6 bg-white">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Lista de Clubs</h2>
                    <Button
                        onClick={() => open(<AddClubForm />)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl shadow"
                    >
                        Añadir Club
                    </Button>
                </div>
                <SearchSection setFilteredClubs={setFilteredClubs} search={false} />
                {filtered?.length > 0 ? (
                    <ul className="space-y-4">
                        {filtered.map((club) => (
                            <li key={club.id} className="p-4 border rounded-lg flex justify-between gap-12 items-center">
                                <div>
                                    <h3 className="text-lg font-semibold hover:text-[#2F80ED] cursor-pointer"  onClick={navigateTo} id={club.id}>{club.name}</h3>
                                    <p>{club.description}</p>
                                </div>
                                <Button
                                    onClick={() => handleDelete(club.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-xl"
                                >
                                    Eliminar
                                </Button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay clubs disponibles.</p>
                )}
            </div>
        </div>
    );
}

const AddClubForm = () => {
    const [clubData, setClubData] = useState({
        name: "",
        description: "",
        city: "",
        address: "",
        background: "",
        open_time: "",
        close_time: ""
    });

    const { createClub } = useCreateClub();

    return (
        <div className="p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Añadir Club</h2>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                        await createClub(clubData);
                        window.location.reload();
                    } catch (error) {
                        alert("Error al crear el club");
                    }
                }}
                className="space-y-4 flex flex-col"
            >
                <Input
                    type="text"
                    placeholder="Nombre del Club"
                    value={clubData.name}
                    onChange={(e) => setClubData({ ...clubData, name: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
                <textarea
                    placeholder="Descripción"
                    value={clubData.description}
                    onChange={(e) => setClubData({ ...clubData, description: e.target.value })}
                    className="w-full mb-4 p-3 border border-[#BDBDBD] rounded-lg focus:outline-none focus:border-[#2F80ED]"
                    required
                />
                <Input
                    type="text"
                    placeholder="Ciudad"
                    value={clubData.city}
                    onChange={(e) => setClubData({ ...clubData, city: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
                <Input
                    type="text"
                    placeholder="Dirección"
                    value={clubData.address}
                    onChange={(e) => setClubData({ ...clubData, address: e.target.value })}
                    className="w-full p-2 border rounded"
                />
                <Input
                    type="text"
                    placeholder="Fondo (URL)"
                    value={clubData.background}
                    onChange={(e) => setClubData({ ...clubData, background: e.target.value })}
                    className="w-full p-2 border rounded"
                />
                <div className="flex gap-4">
                    <Input
                        type="time"
                        placeholder="Hora de Apertura"
                        value={clubData.open_time}
                        onChange={(e) => setClubData({ ...clubData, open_time: e.target.value })}
                        className="w-full p-2 border rounded"
                    />
                    <Input
                        type="time"
                        placeholder="Hora de Cierre"
                        value={clubData.close_time}
                        onChange={(e) => setClubData({ ...clubData, close_time: e.target.value })}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <Button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl shadow"
                >
                    Crear Club
                </Button>
            </form>
        </div>
    )
}