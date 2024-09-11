import { Placeholder, Stack } from "react-bootstrap";
import { ReactNode } from "react";
import "./styles.css";

export interface LayoutPlayingListProps {
    children?: ReactNode;
    isLoading?: boolean;
}

export default function LayoutPlayingList(props: LayoutPlayingListProps) {
    return (
        <Stack className="my-layout-playing-list d-flex w-100 gap-3 pb-5">
            {props.isLoading ? (
                <>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <Stack className="d-flex w-100" key={num}>
                            <Placeholder animation="glow" className="my-layout-playing-list-placeholder opacity-50">
                                <Placeholder className="w-100 h-100 rounded-4" />
                            </Placeholder>
                            <Stack className="w-100 d-flex ps-2 pe-2 mt-2">
                                <Placeholder as={"h5"} animation="glow" className="col-9 opacity-50">
                                    <Placeholder className="w-100 rounded" />
                                </Placeholder>
                                <Placeholder animation="glow" className="col-7 opacity-50">
                                    <Placeholder className="w-100 rounded" />
                                </Placeholder>
                                <Placeholder animation="glow" className="col-5 opacity-50">
                                    <Placeholder className="w-100 rounded" />
                                </Placeholder>
                            </Stack>
                        </Stack>
                    ))}
                </>
            ) : (
                props.children
            )}
        </Stack>
    );
}
