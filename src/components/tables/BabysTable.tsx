import { useCallback } from "react";
import { tBaby } from "../../interfaces";

export interface BabysTableProps {
    babys: tBaby[];
    onClickBaby?: (baby: tBaby) => void;
}

export default function BabysTable({ babys, onClickBaby }: BabysTableProps) {
    //EVENTS
    const handleOnClickBaby = useCallback(
        (baby: tBaby) => {
            if (onClickBaby) onClickBaby(baby);
        },
        [onClickBaby]
    );

    return (
        <table className="w-100 my-table rounded-4">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Data de nascimento</th>
                    <th>Prematuro</th>
                </tr>
            </thead>
            <tbody>
                {babys.map((baby) => (
                    <tr key={baby.id_baby}>
                        <td width={"35%"}>
                            <span
                                onClick={() => handleOnClickBaby(baby)}
                                className="text-decoration-underline text-info"
                            >
                                {baby.name}
                            </span>
                        </td>
                        <td>
                            {new Date(baby.birth_year, baby.birth_month, baby.birth_day).toLocaleDateString("pt-Br", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                        </td>
                        <td width={"18%"}>{baby.is_prem ? "Sim" : "Não"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
