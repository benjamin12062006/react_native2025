import React from 'react';
import { inputStyles, labelStyles } from './styles';

interface InputFieldProps {
    id: string;
    name: string;
    type: string;
    placeholder: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    /*
            React.ChangeEvent<HTMLInputElement> indica que este evento es específicamente un evento de cambio de React que ocurre en un elemento <input> de HTML
        => void significa que la función no devuelve ningún valor (void)
    */

    label: string;
    onblur: (e: React.FocusEvent<HTMLInputElement>) => void;
    /*
            React.FocusEvent<HTMLInputElement> indica que este evento es específicamente un evento de enfoque de React que ocurre en un elemento <input> de HTML
        => void significa que la función no devuelve ningún valor (void)
    */
}

const InputField: React.FC<InputFieldProps> = ({ id, name, type, placeholder, value, onChange, label, onblur }) => {
    return (
        <div className="mb-4">
            <label htmlFor={id} className={labelStyles}>{label}</label>
            <input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={inputStyles}
                onBlur={onblur}
            />
        </div>
    );
};

export default InputField;
