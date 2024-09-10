import { tBaby } from "../../interfaces";

export interface BabysTableProps {
    babys: tBaby[];
}

export default function BabysTable(props: BabysTableProps) {
    return (
        <table className="w-100 my-table rounded-3">
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
                        <td width={"35%"}>{baby.name}</td>
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
