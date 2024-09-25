import { useCallback, useState } from "react";
import { Form, FormControl, FormControlProps, InputGroup } from "react-bootstrap";
import { IMaskInput } from "react-imask";

export interface InputPasswordProps extends FormControlProps {
    value: string;
    onAccept: (value: string) => void;
    error?: string;
}

export default function InputPassword({ onAccept, value, error, ...rest }: InputPasswordProps) {
    //STATES
    const [showPassword, setShowPassword] = useState(false);

    //EVENTS
    const handleOnChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            onAccept(value);
        },
        [onAccept]
    );

    const handleOnToggleShow = useCallback(() => {
        setShowPassword((current) => !current);
    }, []);

    return (
        <InputGroup className="mb-3">
            <FormControl
                className={"rounded-start-pill " + rest.className}
                type={showPassword ? "text" : "password"}
                onChange={handleOnChange}
                as={IMaskInput}
                {...rest}
            />
            <InputGroup.Text className={rest.className + " rounded-end-pill"} role="button" onClick={handleOnToggleShow}>
                <i className={showPassword ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"} />
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </InputGroup>
    );
}
