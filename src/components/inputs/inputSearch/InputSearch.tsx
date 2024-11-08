import { useCallback } from "react";
import { Form, FormControl, FormControlProps, InputGroup } from "react-bootstrap";
import { IMaskInput } from "react-imask";

export interface InputSearchProps extends FormControlProps {
    value?: string;
    onAccept: (search?: string) => void;
    error?: string;
}

export default function InputSearch({ value, onAccept, error, ...rest }: InputSearchProps) {
    //EVENTS
    const handleOnChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            onAccept(value === "" ? undefined : value);
        },
        [onAccept]
    );

    return (
        <InputGroup>
            <FormControl
                value={value ?? ""}
                className="rounded-start-pill"
                type={"text"}
                onChange={handleOnChange}
                as={IMaskInput}
                {...rest}
            />
            <InputGroup.Text className={rest.className + " rounded-end-pill"}>
                <i className={"bi bi-search"} />
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </InputGroup>
    );
}
