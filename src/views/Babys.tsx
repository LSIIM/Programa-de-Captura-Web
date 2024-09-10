import { Col } from "react-bootstrap";
import { LayoutTable } from "../layouts";
import { useCallback, useState } from "react";
import { BabysTable, RegisterBabyModal } from "../components";
import { useBaby } from "../hooks";

export default function Babys() {
    //HOOKS
    const { babys, isReading, handleOnReadBabys } = useBaby({ triggerUseEffect: true });

    //STATES
    const [search, setSearch] = useState("");
    const [showRegisterBabyModal, setShowRegisterBabyModal] = useState(false);

    //VARIABLES
    const filterBabys =
        search === "" ? babys : babys.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()));

    //EVENTS
    const handleOnClickRegister = useCallback(() => setShowRegisterBabyModal(true), []);
    const handleOnHideModal = useCallback(() => setShowRegisterBabyModal(false), []);
    const handleOnSuccessEdit = useCallback(() => {
        handleOnHideModal();
        handleOnReadBabys();
    }, [handleOnHideModal, handleOnReadBabys]);

    return (
        <>
            <LayoutTable.Root>
                <LayoutTable.Header>
                    <LayoutTable.Search value={search} onAccept={setSearch} />
                    <LayoutTable.Button className="rounded-pill shadow" onClick={handleOnClickRegister}>
                        Cadastrar
                    </LayoutTable.Button>
                </LayoutTable.Header>
                <LayoutTable.Body isLoading={isReading}>
                    <Col sm="12">
                        <BabysTable babys={filterBabys} />
                    </Col>
                </LayoutTable.Body>
            </LayoutTable.Root>

            <RegisterBabyModal
                show={showRegisterBabyModal}
                onHide={handleOnHideModal}
                onSuccessEdit={handleOnSuccessEdit}
            />
        </>
    );
}
