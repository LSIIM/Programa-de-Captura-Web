import React, { useCallback } from "react";
import { FormControl, FormControlProps } from "react-bootstrap";
import { IMaskInput } from "react-imask";

export interface InputBirthBabyProps extends FormControlProps {
    dateValue: Date;
    useEndTime?: boolean;
    onAccept: (date: Date) => void;
}

export default function InputBirthBaby({ dateValue, onAccept, useEndTime, ...rest }: InputBirthBabyProps) {
    //VARIABLES
    const dateValueStr = dateValue.toISOString().split("T")[0];

    //EVENTS
    const handleOnChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const dateStr = e.target.value;

            //Evita datas inválidas
            if (isNaN(Date.parse(dateStr))) return;

            const [yearStr, monthStr, dayStr] = dateStr.split("-");
            const date = new Date(Number(yearStr), Number(monthStr) - 1, Number(dayStr));

            //Corrige conversão que o construtor de new Date faz nos anos
            date.setFullYear(Number(yearStr));

            date.setHours(useEndTime ? 23 : 0);
            date.setMinutes(useEndTime ? 59 : 0);
            date.setSeconds(useEndTime ? 59 : 0);
            date.setMilliseconds(useEndTime ? 999 : 0);

            onAccept(date);
        },
        [onAccept, useEndTime]
    );

    return (
        <FormControl
            className={"rounded-pill " + rest.className}
            value={dateValueStr}
            onChange={handleOnChange}
            as={IMaskInput}
            type="date"
            {...rest}
        />
    );
}
