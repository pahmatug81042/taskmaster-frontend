import React from "react";

/**
 * Reusable Button component
 * - Accepts type, onClick, children, className, disabled
 * - Provides consistent styling across the app
 */
const Button = ({
    type = "button",
    onClick,
    children,
    className = "",
    disabled = false,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`common-button ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;