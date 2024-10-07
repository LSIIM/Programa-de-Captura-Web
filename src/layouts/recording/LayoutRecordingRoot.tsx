import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { MovimentsButtons } from "../../components";
import "./styles.css";

export interface LayoutRecordingProps {
    videos: { stream: MediaStream; label: string }[];
}

export default function LayoutRecording({ videos }: LayoutRecordingProps) {
    //STATES
    const [currentStreamId, setCurrentStreamId] = useState<null | string>(null);

    //EVENTS
    useEffect(() => {
        if (videos[0]) setCurrentStreamId(videos[0].stream.id);
    }, [videos]);

    return (
        <Stack className="my-layout-recording d-flex position-relative p-3">
            <div className="position-absolute z-2 start-0 ps-4 pt-2 ms-1 mt-1">
                <MovimentsButtons numberOfMoviments={4} />
            </div>

            {videos.map(({ stream, label }) => (
                <div
                    key={stream.id}
                    className={`my-layout-recording-video-div border ${
                        currentStreamId === stream.id ? "selected border-4 border-primary" : "border-2 border-secondary"
                    }`}
                    onClick={currentStreamId !== stream.id ? () => setCurrentStreamId(stream.id) : undefined}
                >
                    {currentStreamId !== stream.id && (
                        <i className="bi bi-box-arrow-in-up-left text-white bg-black ps-1 pe-1 rounded bg-opacity-50 position-absolute top-0 end-0 m-2" />
                    )}
                    <span className="my-layout-recording-span position-absolute bottom-0 mb-2 ms-3 text-white bg-black ps-1 pe-1 rounded bg-opacity-50">
                        {label}
                    </span>
                    <video
                        className="w-100 h-100"
                        autoPlay
                        playsInline
                        ref={(video) => {
                            if (video) {
                                video.srcObject = stream;
                            }
                        }}
                    />
                </div>
            ))}
        </Stack>
    );
}
