import { InputSearch } from "../../components";
import { InputSearchProps } from "../../components/inputs/inputSearch/InputSearch";

export interface LayoutTableSearchProps extends InputSearchProps {}

export default function LayoutTableSearch(props: LayoutTableSearchProps) {
    return (
        <div className="my-layout-table-search">
            <InputSearch {...props} />
        </div>
    );
}
