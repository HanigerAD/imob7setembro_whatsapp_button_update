import React, { InputHTMLAttributes, useCallback } from "react";

import { cep, currency, cpf, phone } from "./masks";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  mask: "cep" | "currency" | "cpf" | "phone";
  prefix?: string;
}

const Input: React.FC<InputProps> = ({
  mask,
  prefix,
  id,
  label,
  className,
  value: defaultValue,
  onChange,
  ...props
}) => {
  const handleKeyUp = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (mask === "cep") {
        cep(e);
      }
      if (mask === "currency") {
        currency(e);
      }
      if (mask === "cpf") {
        cpf(e);
      }

      if (mask === "phone") {
        phone(e);
      }

      if (onChange) {
        onChange(e as React.ChangeEvent<HTMLInputElement>);
      }
    },
    [mask]
  );

  return (
    <>
      <div className="input-group mb-3">
        {prefix && <span className="input-group-text">{prefix}</span>}
        <div className="form-floating">
          <input
            className={`form-control ${className}`}
            defaultValue={defaultValue}
            onKeyUp={handleKeyUp}
            {...props}
          />
          <label htmlFor={id}>{label}</label>
        </div>
      </div>
    </>
  );
};

export default Input;
