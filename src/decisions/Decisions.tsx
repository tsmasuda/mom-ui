import {
  List,
  Datagrid,
  TextField,
  DateField,
  Create,
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  required,
  ReferenceField,
  useRedirect,
} from "react-admin";
import { useLocation } from "react-router-dom";

export const DecisionList = () => (
  <List>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <ReferenceField source="people" reference="people">
        <TextField source="name" noWrap />
      </ReferenceField>
      <ReferenceField source="meeting" reference="meetings">
        <DateField source="date" />
      </ReferenceField>
      <TextField source="description" />
    </Datagrid>
  </List>
);

export const DecisionCreate = () => {
  const redirect = useRedirect();
  const location = useLocation();

  const redirectTo = (location.state as any)?.redirectTo ?? "/decisions";

  return (
    <Create
      redirect="list"
      mutationOptions={{
        onSuccess: () => {
          redirect(redirectTo);
        },
      }}
      mutationMode="pessimistic"
    >
      <DecisionForm />
    </Create>
  );
};

export const DecisionEdit = () => {
  const redirect = useRedirect();
  const location = useLocation();

  const redirectTo = (location.state as any)?.redirectTo ?? "/decisions";

  return (
    <Edit
      redirect="list"
      mutationOptions={{
        onSuccess: () => {
          redirect(redirectTo);
        },
      }}
      mutationMode="pessimistic"
    >
      <DecisionForm />
    </Edit>
  );
};

function DecisionForm() {
  const prefill = usePrefillFromLocationState();

  return (
    <SimpleForm defaultValues={prefill ?? undefined}>
      <ReferenceInput source="people" reference="people">
        <AutocompleteInput optionText="name" validate={[required()]} />
      </ReferenceInput>
      <ReferenceInput source="meeting" reference="meetings">
        <AutocompleteInput optionText="title" validate={[required()]} />
      </ReferenceInput>
      <TextInput source="description" validate={[required()]} />
    </SimpleForm>
  );
}

function usePrefillFromLocationState() {
  const loc = useLocation();
  const stateRecord = (loc.state as any)?.record;
  return stateRecord ? stateRecord : null;
}
