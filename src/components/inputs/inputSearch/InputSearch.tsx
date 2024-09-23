import { useCallback } from "react";
import { Form, FormControl, FormControlProps, InputGroup } from "react-bootstrap";
import { IMaskInput } from "react-imask";

export interface InputSearchProps extends FormControlProps {
    value: string;
    onAccept: (search: string) => void;
    error?: string;
}

export default function InputSearch({ value, onAccept, error, ...rest }: InputSearchProps) {
    //EVENTS
    const handleOnChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            onAccept(value);
        },
        [onAccept]
    );

    return (
        <InputGroup>
            <FormControl
                className="rounded-start-4"
                type={"text"}
                onChange={handleOnChange}
                as={IMaskInput}
                {...rest}
            />
            <InputGroup.Text className={rest.className + " rounded-end-4"}>
                <i className={"bi bi-search"} />
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </InputGroup>
    );
}
