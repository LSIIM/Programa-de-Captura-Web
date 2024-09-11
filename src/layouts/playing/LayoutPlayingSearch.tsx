import { Stack } from "react-bootstrap";
import InputSearch, { InputSearchProps } from "../../components/inputs/inputSearch/InputSearch";
import "./styles.css";

export interface LayoutPlayingSearchProps extends InputSearchProps {}

export default function LayoutPlayingSearch(props: LayoutPlayingSearchProps) {
    return (
        <Stack className="my-layout-playing-search d-flex w-100">
            <InputSearch {...props} />
        </Stack>
    );
}
