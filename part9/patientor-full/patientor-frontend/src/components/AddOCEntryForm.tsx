import React from 'react';
import { Entry, Diagnosis } from '../types'
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField, DiagnosisSelection } from './FormHelper';


interface Props {
  onSubmit: (values: Entry) => void;
  onCancel: () => void;
  diagnoses: Diagnosis[]
}

const AddOCEntryForm: React.FC<Props> = ({ onSubmit, onCancel, diagnoses }) => {

  return (
    <Formik
      initialValues={{
        diagnosisCodes: [],
        type: 'OccupationalHealthcare',
        description: '',
        date: '',
        specialist: '',
        id: '',
        sickLeave: {
          startDate: '',
          endDate: '',
        },
        employerName: ''
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
              label="employer name"
              placeholder="employer name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="sick leave start date"
              placeholder="sick leave start"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="sick leave end date"
              placeholder="sick leave end"
              name="sickLeave.endDate"
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

export default AddOCEntryForm