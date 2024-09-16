import { useCallback, useState } from "react";
import { tBaby } from "../../interfaces";
import BabyInfoModal from "../modals/BabyInfoModal/BabyInfoModal";

export interface BabysTableProps {
    babys: tBaby[];
}

export default function BabysTable(props: BabysTableProps) {
    //STATES
    const [selectedBaby, setSelectedBaby] = useState<tBaby | null>(null);

    //EVENTS
    const handleOnCickBaby = useCallback((baby: tBaby) => setSelectedBaby(baby), []);
    const handleOnHideModal = useCallback(() => setSelectedBaby(null), []);

    return (
        <>
            <table className="w-100 my-table rounded-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Data de nascimento</th>
                        <th>Prematuro</th>
                    </tr>
                </thead>
                <tbody>
                    {props.babys.map((baby) => (
                        <tr key={baby.id_baby}>
                            <td width={"35%"}>
                                <span
                                    onClick={() => handleOnCickBaby(baby)}
                                    className="text-decoration-underline text-info"
                                >
                                    {baby.name}
                                </span>
                            </td>
                            <td>
                                {new Date(baby.birth_year, baby.birth_month, baby.birth_day).toLocaleDateString(
                                    "pt-Br",
                                    {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    }
                                )}
                            </td>
                            <td width={"18%"}>{baby.is_prem ? "Sim" : "Não"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <BabyInfoModal baby={selectedBaby} show={selectedBaby !== null} onHide={handleOnHideModal} />
        </>
    );
}
