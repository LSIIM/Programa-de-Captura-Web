import { LayoutTable } from "../layouts";
import { useCallback, useEffect, useState } from "react";
import { BabyInfoModal, BabysTable, ManageBabyModal } from "../components";
import useBaby from "../hooks/useBaby";
import { tBaby } from "../interfaces";

export default function Babys() {
    //HOOKS
    const { cancelProcess, readBabys, isReading } = useBaby();

    //STATES
    const [babys, setBabys] = useState<tBaby[]>([]);
    const [babySelected, setBabySelected] = useState<tBaby | null>(null);
    const [showManageBabyModal, setShowManageBabyModal] = useState(false);

    const [search, setSearch] = useState("");

    //VARIABLES
    const filterBabys =
        search === "" ? babys : babys.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()));

    //EVENTS
    useEffect(() => {
        //TODO: Melhorar feedback
        readBabys()
            .then((babys) => setBabys(babys))
            .catch((errMsg) => alert(errMsg));

        return () => cancelProcess();
    }, [readBabys, cancelProcess]);

    const handleOnClickRegisterOrEdit = useCallback(() => setShowManageBabyModal(true), []);
    const handleOnHideModal = useCallback(() => setShowManageBabyModal(false), []);

    const handleOnSuccessManage = useCallback(() => {
        readBabys()
            .then((babys) => setBabys(babys))
            .catch((errMsg) => alert(errMsg));
        setBabySelected(null);
        setShowManageBabyModal(false);
    }, [readBabys]);

    return (
        <>
            <LayoutTable.Root>
                <LayoutTable.Header>
                    <LayoutTable.Search value={search} onAccept={setSearch} />
                    <LayoutTable.Button className="rounded-pill shadow" onClick={handleOnClickRegisterOrEdit}>
                        Cadastrar
                    </LayoutTable.Button>
                </LayoutTable.Header>
                <LayoutTable.Body isLoading={isReading}>
                    <BabysTable babys={filterBabys} onClickBaby={setBabySelected} />
                </LayoutTable.Body>
            </LayoutTable.Root>

            <ManageBabyModal
                initialValues={
                    babySelected ?? { name: "", birth_day: 20, birth_month: 2, birth_year: 2015, is_prem: false }
                }
                babyId={babySelected?.id_baby}
                show={showManageBabyModal}
                onHide={handleOnHideModal}
                onSuccess={handleOnSuccessManage}
            />

            <BabyInfoModal
                show={babySelected !== null && !showManageBabyModal}
                baby={babySelected}
                onHide={() => setBabySelected(null)}
                onClickEdit={handleOnClickRegisterOrEdit}
            />
        </>
    );
}
