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
} from "react-admin";
import { useLocation, useNavigate } from "react-router-dom";
import { EditToolbar } from "../common/EditToolbar";

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
  const navigate = useNavigate();

  return (
    <Create
      redirect="list"
      mutationOptions={{
        onSuccess: () => {
          navigate(-1);
        },
      }}
      mutationMode="pessimistic"
    >
      <DecisionForm />
    </Create>
  );
};

export const DecisionEdit = () => {
  const navigate = useNavigate();

  return (
    <Edit
      redirect="list"
      mutationOptions={{
        onSuccess: () => {
          navigate(-1);
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
    <SimpleForm defaultValues={prefill ?? undefined} toolbar={<EditToolbar />}>
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
