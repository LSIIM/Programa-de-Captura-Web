import { LayoutTable } from "../layouts";
import { useCallback, useContext, useState } from "react";
import { BabysTable, ManageBabyModal } from "../components";
import { BabyContext } from "../contexts/BabyContext";

export default function Babys() {
    //CONTEXTS
    const { babys, readingBabys } = useContext(BabyContext);

    //STATES
    const [search, setSearch] = useState("");
    const [showRegisterBabyModal, setShowRegisterBabyModal] = useState(false);

    //VARIABLES
    const filterBabys =
        search === "" ? babys : babys.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()));

    //EVENTS
    const handleOnClickRegister = useCallback(() => setShowRegisterBabyModal(true), []);
    const handleOnHideModal = useCallback(() => setShowRegisterBabyModal(false), []);

    return (
        <>
            <LayoutTable.Root>
                <LayoutTable.Header>
                    <LayoutTable.Search value={search} onAccept={setSearch} />
                    <LayoutTable.Button className="rounded-pill shadow" onClick={handleOnClickRegister}>
                        Cadastrar
                    </LayoutTable.Button>
                </LayoutTable.Header>
                <LayoutTable.Body isLoading={readingBabys}>
                    <BabysTable babys={filterBabys} />
                </LayoutTable.Body>
            </LayoutTable.Root>

            <ManageBabyModal
                initialValues={{ name: "", birth_day: 20, birth_month: 2, birth_year: 2015, is_prem: false }}
                show={showRegisterBabyModal}
                onHide={handleOnHideModal}
            />
        </>
    );
}
