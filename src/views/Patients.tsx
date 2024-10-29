import { LayoutTable } from "../layouts";
import { useCallback, useEffect, useState } from "react";
import { BabyInfoModal, BabysTable, ManageBabyModal } from "../components";
import useBaby from "../hooks/useBaby";
import { tPatient } from "../interfaces";

export default function Patients() {
    //HOOKS
    const { cancelProcess, readBabys, isReading, errorToRead } = useBaby();

    //STATES
    const [babys, setBabys] = useState<tPatient[]>([]);
    const [babySelected, setBabySelected] = useState<tPatient | null>(null);
    const [showManageBabyModal, setShowManageBabyModal] = useState(false);

    const [search, setSearch] = useState("");

    //VARIABLES
    const filteredBabys =
        search === "" ? babys : babys.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()));

    //EVENTS
    const paginateBaby = useCallback(
        async (page?: number, name?: string) => {
            try {
                const incomingBabys = await readBabys({ page, where: { name } });

                if (page === undefined) setBabys(incomingBabys);
                else setBabys((current) => ({ ...current, ...incomingBabys }));

                return incomingBabys.length;
            } catch (_) {
                return;
            }
        },
        [readBabys]
    );

    useEffect(() => {
        paginateBaby();
        return () => cancelProcess();
    }, [paginateBaby, cancelProcess]);

    const handleOnClickRegisterOrEdit = useCallback(() => setShowManageBabyModal(true), []);
    const handleOnHideModal = useCallback(() => setShowManageBabyModal(false), []);

    const handleOnSuccessManage = useCallback(() => {
        paginateBaby();
        setBabySelected(null);
        setShowManageBabyModal(false);
    }, [paginateBaby]);

    return (
        <>
            <LayoutTable.Root>
                <LayoutTable.Header>
                    <LayoutTable.Search value={search} onAccept={setSearch} />
                    <LayoutTable.Button className="rounded-pill shadow" onClick={handleOnClickRegisterOrEdit}>
                        Cadastrar
                    </LayoutTable.Button>
                </LayoutTable.Header>
                <LayoutTable.Body isLoading={isReading || errorToRead}>
                    {babys.length < 1 && !isReading && !errorToRead  && <h5 className="text-secondary w-100 text-center">--- Nenhum bebê encontrado ---</h5>}
                    {babys.length > 0 && <BabysTable babys={filteredBabys} onClickBaby={setBabySelected} />}
                </LayoutTable.Body>
            </LayoutTable.Root>

            <ManageBabyModal
                initialValues={
                    babySelected ?? {
                        name: "",
                        birthDate: new Date(),
                        isPremature: false,
                        atipicidades: "",
                        gestationalAge: 0,
                    }
                }
                babyId={babySelected?.id}
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
