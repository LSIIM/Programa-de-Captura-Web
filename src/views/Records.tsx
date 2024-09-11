import { CardRecord } from "../components";
import { useRecording } from "../hooks";
import LayoutGridList from "../layouts/gridList";

export default function Records() {
    //HOOKS
    const { recordings, isReading } = useRecording({ enableRead: true });

    return (
        <LayoutGridList.Root>
            <LayoutGridList.Header>
                <LayoutGridList.Filters></LayoutGridList.Filters>
                <LayoutGridList.Button className="rounded-pill">Gravar</LayoutGridList.Button>
            </LayoutGridList.Header>
            <LayoutGridList.Body isLoading={isReading}>
                {recordings.map((record) => (
                    <CardRecord record={record} key={record.id_recording}></CardRecord>
                ))}
            </LayoutGridList.Body>
        </LayoutGridList.Root>
    );
}
