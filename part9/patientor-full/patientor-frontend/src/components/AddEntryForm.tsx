import React from 'react';
import { Entry, HealthCheckRating } from '../types'
import { Grid, Button } from "semantic-ui-react";
import { ErrorMessage, Field, Formik, FieldProps, Form} from "formik";
import { TextField, SelectField, NumberField} from './FormHelper';

type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: Entry) => void;
  onCancel: () => void;
}

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
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

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {

  

  /*const ratingOptions: RatingOption[] = [
    { value: "Healthy", label: 0 },
    { value: 1, label: "LowRisk" },
    { value: 2, label: "HighRisk" },
    { value: 3, label: "CriticalRisk" }
  ];*/

  const submit = (data: any) => {
    console.log('trying to submit new entry within AddPatientForm')
    onSubmit(data)
  }

  return (
    <Formik
      initialValues={{
        type: 'HealthCheck',
        description: '',
        date: '',
        specialist: '',
        healthCheckRating: HealthCheckRating.Healthy,
      }}
      onSubmit={() => console.log('ive finally been submitted!!')}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        /*if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }*/
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="date"
              placeholder="date"
              name="date"
              component={TextField}
            />
            <Field
              label="specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Health check rating"
              name="healthCheckRating"
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );

}

export default AddEntryForm