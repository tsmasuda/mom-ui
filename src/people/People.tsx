import {
  List,
  Datagrid,
  TextField,
  DateField,
  Create,
  Edit,
  SimpleForm,
  TextInput,
  required,
  useRedirect,
  ReferenceManyField,
  useRecordContext,
} from "react-admin";
import { useLocation } from "react-router-dom";
import { EditToolbar } from "../common/EditToolbar";

export const PersonList = () => (
  <List>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="name" />
      <TextField source="company" />
      <TextField source="department" />
    </Datagrid>
  </List>
);

export const PersonCreate = () => {
  const redirect = useRedirect();
  const location = useLocation();

  const redirectTo = (location.state as any)?.redirectTo ?? "/people";

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
      <PersonForm />
    </Create>
  );
};

export const PersonEdit = () => {
  const redirect = useRedirect();
  const location = useLocation();

  const redirectTo = (location.state as any)?.redirectTo ?? "/people";

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
      <PersonForm />
    </Edit>
  );
};

function PersonForm() {
  const prefill = usePrefillFromLocationState();
  const record = useRecordContext();

  return (
    <SimpleForm defaultValues={prefill ?? undefined} toolbar={<EditToolbar />}>
      <TextInput source="name" validate={[required()]} />
      <TextInput source="company" />
      <TextInput source="department" />

      {record?.id && (
        <>
          <ReferenceManyField reference="tasks" target="people">
            <Datagrid rowClick="edit" bulkActionButtons={false}>
              <TextField source="description" />
              <DateField source="dueDate" />
              <TextField source="taskStatus" />
              <TextField source="url" />
            </Datagrid>
          </ReferenceManyField>

          <ReferenceManyField reference="decisions" target="people">
            <Datagrid rowClick="edit" bulkActionButtons={false}>
              <TextField source="description" />
            </Datagrid>
          </ReferenceManyField>
        </>
      )}
    </SimpleForm>
  );
}

function usePrefillFromLocationState() {
  const loc = useLocation();
  const stateRecord = (loc.state as any)?.record;
  return stateRecord ? stateRecord : null;
}
