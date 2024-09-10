import { Stack } from "react-bootstrap";
import { tRecordings } from "../../../interfaces";
import "./styles.css";

export interface CardRecordProps {
    record?: tRecordings;
}

export default function CardRecord(props: CardRecordProps) {
    return (
        <Stack className="my-card-record rounded-4 d-flex gap-2" role="button">
            <img
                className="my-card-record-thumbnail rounded-4"
                alt="thumbnail"
                src="https://img.freepik.com/fotos-gratis/uma-pintura-digital-de-uma-montanha-com-uma-arvore-colorida-em-primeiro-plano_1340-25699.jpg"
            />
            <Stack className="d-flex ps-2 pe-2 w-100">
                <span className="fw-bold">Nome do bebê</span>
                <small>Nome do projeto</small>
                <small>Movimento X</small>
            </Stack>
        </Stack>
    );
}
