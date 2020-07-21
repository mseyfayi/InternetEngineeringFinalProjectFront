import React from 'react';
import {IInputProps} from './types';
import {TextField} from '@material-ui/core';

interface InputTextProps extends IInputProps {
    isNumber?: boolean;
    value: string | number;

    onChange(value: string | number | null): void;
}

const InputText = ({
    name,
    required,
    title,
    isNumber,
    value,
    onBlur,
    onChange,
    disabled,
}: InputTextProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value);
    return (
        <TextField
            id={name}
            disabled={disabled}
            required={required}
            label={title}
            value={value ? value : ''}
            inputProps={{
                dir: isNumber ? 'ltr' : '',
            }}
            type={isNumber ? 'number' : undefined}
            onBlur={onBlur}
            onChange={handleChange}
        />
    );
};
export default InputText;