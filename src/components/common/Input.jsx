import React from "react";
/**
 * Reusable Input component
 * - Supports text, email, password, textarea, etc.
 * - Accepts name, value, onChange, placeholder, type, className
 * - Provides consistent styling across the app
 */
const Input = ({
    type = "text",
    name,
    value,
    onChange,
    placeholder = "",
    className = "",
    ...rest
}) => {
    if (type === "textarea") {
        return (
            <textarea 
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`common-input ${className}`}
                {...rest}
            />
        );
    }

    return (
        <input 
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`common-input ${className}`}
        />
    );
};

export default Input;