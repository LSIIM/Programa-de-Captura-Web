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

    console.log(babys);

    return (
        <table className="w-100 my-table rounded-4">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Data de nascimento</th>
                    <th>Idade gestacional</th>
                </tr>
            </thead>
            <tbody>
                {babys.map((baby) => (
                    <tr key={baby.id}>
                        <td width={"35%"}>
                            <span
                                onClick={() => handleOnClickBaby(baby)}
                                className="text-decoration-underline text-info"
                            >
                                {baby.name}
                            </span>
                        </td>
                        <td>
                            {baby.birthDate.toLocaleDateString("pt-Br", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                        </td>
                        <td width={"18%"}>{baby.gestationalAge} meses</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
