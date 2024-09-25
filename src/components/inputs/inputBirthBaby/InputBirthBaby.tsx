import React, { useCallback } from "react";
import { FormControl, FormControlProps } from "react-bootstrap";
import { IMaskInput } from "react-imask";

export interface InputBirthBabyProps extends FormControlProps {
    day: number;
    month: number;
    year: number;
    onAccept: (day: number, month: number, year: number) => void;
}

export default function InputBirthBaby({ day, month, year, onAccept, ...rest }: InputBirthBabyProps) {
    //VARIABLES
    const dayTwoDigits = day.toLocaleString("pt-Br", { minimumIntegerDigits: 2 });
    const monthTwoDigits = (month + 1).toLocaleString("pt-Br", { minimumIntegerDigits: 2 });
    const yearFourDigits = year.toLocaleString("pt-Br", { minimumIntegerDigits: 4 }).replace(".", "");
    const dateStr = `${yearFourDigits}-${monthTwoDigits}-${dayTwoDigits}`;

    //EVENTS
    const handleOnChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const dateStr = e.target.value;
            const [yearStr, monthStr, dayStr] = dateStr.split("-");
            console.log(dayStr, monthStr, yearStr);
            onAccept(Number(dayStr), Number(monthStr) - 1, Number(yearStr));
        },
        [onAccept]
    );

    return (
        <FormControl
            className={"rounded-pill " + rest.className}
            value={dateStr}
            onChange={handleOnChange}
            as={IMaskInput}
            type="date"
            {...rest}
        />
    );
}
