import { LayoutTable } from "../layouts";
import { useCallback, useEffect, useState } from "react";
import { BabyInfoModal, BabysTable, InfiniteScroll, ManageBabyModal } from "../components";
import usePatients, { LIMIT_PATIENT_PER_PAGE } from "../hooks/usePatients";
import { tPatient } from "../interfaces";

export default function Patients() {
    //HOOKS
    const { cancelProcess, readBabys, isReading, errorToRead } = usePatients();

    //STATES
    const [babys, setBabys] = useState<tPatient[]>([]);
    const [babySelected, setBabySelected] = useState<tPatient | null>(null);
    const [showManageBabyModal, setShowManageBabyModal] = useState(false);

    const [currentPage, setCurrentPage] = useState(0);

    const [search, setSearch] = useState<string | undefined>(undefined);

    //EVENTS
    const paginateBaby = useCallback(
        async (page?: number, name?: string): Promise<number> => {
            try {
                const incomingBabys = await readBabys({ page, limit: LIMIT_PATIENT_PER_PAGE, where: { name } });

                setBabys((current) => [...current, ...incomingBabys]);
                return incomingBabys.length;
            } catch (err) {
                return 0;
            }
        },
        [readBabys]
    );

    useEffect(() => {
        paginateBaby().then(() => setCurrentPage((current) => current + 1));

        return () => cancelProcess();
    }, [cancelProcess, paginateBaby]);

    const handleOnClickRegisterOrEdit = useCallback(() => setShowManageBabyModal(true), []);
    const handleOnHideModal = useCallback(() => setShowManageBabyModal(false), []);

    const handleOnSuccessManage = useCallback(() => {
        paginateBaby();
        setBabySelected(null);
        setShowManageBabyModal(false);
    }, [paginateBaby]);

    return (
        <>
            <InfiniteScroll
                loading={isReading && currentPage !== 0}
                onScrollEnd={(page) => paginateBaby(page, search)}
                page={currentPage}
                setPage={setCurrentPage}
            >
                <LayoutTable.Root>
                    <LayoutTable.Header>
                        <LayoutTable.Search
                            value={search}
                            onAccept={(value) => {
                                setSearch(value);
                                setCurrentPage(0);
                            }}
                        />
                        <LayoutTable.Button className="rounded-pill shadow" onClick={handleOnClickRegisterOrEdit}>
                            Cadastrar
                        </LayoutTable.Button>
                    </LayoutTable.Header>
                    <LayoutTable.Body isLoading={(isReading && currentPage === 0) || errorToRead}>
                        {babys.length < 1 && !isReading && !errorToRead && (
                            <h5 className="text-secondary w-100 text-center">--- Nenhum bebê encontrado ---</h5>
                        )}
                        {babys.length > 0 && <BabysTable babys={babys} onClickBaby={setBabySelected} />}
                    </LayoutTable.Body>
                </LayoutTable.Root>
            </InfiniteScroll>

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
