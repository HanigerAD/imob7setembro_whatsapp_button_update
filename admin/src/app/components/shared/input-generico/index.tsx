import React, { InputHTMLAttributes, useCallback } from "react";

import { cep, currency, cpf } from "./masks";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  mask: "cep" | "currency" | "cpf";
  prefix?: string;
}

const Input: React.FC<InputProps> = ({
  mask,
  prefix,
  id,
  label,
  className,
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
            {...props}
            onKeyUp={handleKeyUp}
          />
          <label htmlFor={id}>{label}</label>
        </div>
      </div>
    </>
  );
};

export default Input;
