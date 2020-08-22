import React from 'react';
import { Entry, HealthCheckRating } from '../types'
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import { Grid, Button, Form } from "semantic-ui-react";


type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: Entry) => void;
  onCancel: () => void;
}

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

type RatingOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  name: string;
  label: string;
  options: RatingOption[];
};

export const TextField: React.FC<TextProps> = ({
  field,
  label,
  placeholder
}) => (
    <Form.Field>
      <label>{label}</label>
      <Field placeholder={placeholder} {...field} />
      <div style={{ color: 'red' }}>
        <ErrorMessage name={field.name} />
      </div>
    </Form.Field>
  );



export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options
}: SelectFieldProps) => (
    <Form.Field>
      <label>{label}</label>
      <Field as="select" name={name} className="ui dropdown">
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </Field>
    </Form.Field>
);

export const NumberField: React.FC<NumberProps> = ({ field, label, min, max }) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type='number' min={min} max={max} />

    <div style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);
