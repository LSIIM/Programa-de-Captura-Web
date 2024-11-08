import { ReactNode, useCallback, useRef, useState } from "react";
import { Spinner, Stack } from "react-bootstrap";
import "./styles.css";

export interface InfiniteScrollProps {
    children: ReactNode;
    onScrollEnd: (page: number) => number | Promise<number>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    loading: boolean;
}

export default function InfiniteScroll({ onScrollEnd, page, setPage, loading, ...props }: InfiniteScrollProps) {
    //STATES
    const [lastPageDone, setLastPageDone] = useState(false);
    const [showExtraSpace, setShowExtraSpace] = useState(true);

    //REF
    const scrollRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    //VARIABLES
    const thereNotScroll = useCallback((): boolean => {
        const bodyElement = bodyRef.current;
        const scrollElement = scrollRef.current;
        if (!scrollElement || !bodyElement) return false;

        if (bodyElement.clientHeight < scrollElement.clientHeight) return true;
        return false;
    }, []);

    const scrollOnEnd = useCallback((): boolean => {
        const scrollElement = scrollRef.current;
        if (!scrollElement || loading || lastPageDone) return false;

        if (scrollElement.scrollHeight - scrollElement.clientHeight - scrollElement.scrollTop < 20) return true;
        return false;
    }, [loading, lastPageDone]);

    //EVENTS
    const handleOnScroll = useCallback(async () => {
        if (!scrollOnEnd()) return;

        try {
            const lenthElements = await onScrollEnd(page);
            if (lenthElements > 0) {
                setPage((current) => current + 1);
            } else setLastPageDone(true);
        } catch (err) {
            console.error(err);
        }
    }, [onScrollEnd, scrollOnEnd, page, setPage]);

    return (
        <div ref={scrollRef} className="my-infinite-scroll-root position-relative" onScroll={handleOnScroll}>
            <div ref={bodyRef} className=" w-100">
                {props.children}
            </div>
            <Stack className="w-100 d-flex align-items-center mb-4 mt-2">
                {loading && (
                    <>
                        <Spinner size="sm" />
                        <span>Buscando...</span>
                    </>
                )}
            </Stack>
            {/*<div className={`my-infinite-scroll-extra-space ${showExtraSpace ? "" : "close"}`} />*/}
        </div>
    );
}
