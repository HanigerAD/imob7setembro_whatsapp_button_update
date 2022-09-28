import React, { InputHTMLAttributes, useCallback } from "react";

import { cep, currency, cpf, phone } from "./masks";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  mask?: "cep" | "currency" | "cpf" | "phone";
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
  type,
  ...props
}) => {
  const handleKeyUp = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      switch (mask) {
        case "cep": {
          cep(e);
          break;
        }
        case "currency": {
          currency(e);
          break;
        }
        case "cpf": {
          cpf(e);
          break;
        }

        case "phone": {
          phone(e);
          break;
        }

        default: {
          break;
        }
      }

      if (onChange) {
        onChange(e as React.ChangeEvent<HTMLInputElement>);
      }
    },
    [mask, onChange]
  );

  return (
    <>
      <div className="input-group mb-3">
        {prefix && <span className="input-group-text">{prefix}</span>}
        <div className="form-floating">
          {type === 'date' ?
            <input
              className={`form-control ${className}`}
              defaultValue={defaultValue}
              onChange={onChange}
              type={type}
              {...props} />
            : null}
          {type !== 'date' ?
            <input
              className={`form-control ${className}`}
              defaultValue={defaultValue}
              onKeyUp={handleKeyUp}
              {...props} />
            : null}
          <label htmlFor={id}>{label}</label>
        </div>
      </div>
    </>
  );
};

export default Input;
