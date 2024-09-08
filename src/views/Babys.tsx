import { Col } from "react-bootstrap";
import { LayoutTable } from "../layouts";
import { useState } from "react";
import { BabysTable } from "../components";
import { Baby } from "../interfaces";

export default function Babys() {
    //STATES
    const [search, setSearch] = useState("");

    return (
        <LayoutTable.Root>
            <LayoutTable.Header>
                <LayoutTable.Search value={search} onAccept={setSearch} />
                <LayoutTable.Button className="rounded-pill shadow">Cadastrar</LayoutTable.Button>
            </LayoutTable.Header>
            <LayoutTable.Body>
                <Col sm="12">
                    <BabysTable babys={babys} />
                </Col>
            </LayoutTable.Body>
        </LayoutTable.Root>
    );
}

const babys: Baby[] = [
    { id_baby: 0, name: "Baby A", birth_day: 1, birth_month: 0, birth_year: 2000, is_prem: false },
    { id_baby: 1, name: "Baby B", birth_day: 1, birth_month: 0, birth_year: 2000, is_prem: false },
    { id_baby: 2, name: "Baby C", birth_day: 1, birth_month: 0, birth_year: 2000, is_prem: false },
    { id_baby: 3, name: "Baby D", birth_day: 1, birth_month: 0, birth_year: 2000, is_prem: false },
    { id_baby: 4, name: "Baby E", birth_day: 1, birth_month: 0, birth_year: 2000, is_prem: false },
    { id_baby: 5, name: "Baby F", birth_day: 1, birth_month: 0, birth_year: 2000, is_prem: false },
    { id_baby: 6, name: "Baby G", birth_day: 1, birth_month: 0, birth_year: 2000, is_prem: false },
    { id_baby: 7, name: "Baby H", birth_day: 1, birth_month: 0, birth_year: 2000, is_prem: false },
    { id_baby: 8, name: "Baby I", birth_day: 1, birth_month: 0, birth_year: 2000, is_prem: false },
    { id_baby: 9, name: "Baby J", birth_day: 1, birth_month: 0, birth_year: 2000, is_prem: false },
];
