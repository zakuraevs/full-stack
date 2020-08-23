import React from 'react';
import { useStateValue } from "../state";
import { Entry, Diagnosis } from '../types'
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, FieldProps, Form } from "formik";
import { TextField, SelectField, RatingOption, DiagnosisSelection } from './FormHelper';


interface Props {
  onSubmit: (values: Entry) => void;
  onCancel: () => void;
  diagnoses: Diagnosis[]
}

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

type SelectFieldProps = {
  name: string;
  label: string;
  options: RatingOption[];
};

const AddHospitalEntryForm: React.FC<Props> = ({ onSubmit, onCancel, diagnoses }) => {


  /*const submit = (data: any) => {
    console.log('trying to submit new entry within AddPatientForm')
    onSubmit(data)
  }*/

  return (
    <Formik
      initialValues={{
        diagnosisCodes: [],
        type: 'Hospital',
        description: '',
        date: '',
        specialist: '',
        id: '',
        discharge: {
          date: '',
          criteria: ''
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
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
              label="discharge date"
              placeholder="discharge date"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="discharge criteria"
              placeholder="discharge criteria"
              name="discharge.criteria"
              component={TextField}
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

export default AddHospitalEntryForm