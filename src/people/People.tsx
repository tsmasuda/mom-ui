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
  ReferenceManyField,
  useRecordContext,
} from "react-admin";
import { useLocation, useNavigate } from "react-router-dom";
import { EditToolbar } from "../common/EditToolbar";
import { transform } from "../common/transform";

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
      <PersonForm />
    </Create>
  );
};

export const PersonEdit = () => {
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
      transform={transform}
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
          <h3>Tasks</h3>
          <ReferenceManyField reference="tasks" target="people">
            <Datagrid rowClick="edit" bulkActionButtons={false}>
              <TextField source="description" />
              <DateField source="dueDate" />
              <TextField source="taskStatus" />
              <TextField source="url" />
            </Datagrid>
          </ReferenceManyField>

          <h3>Decisions</h3>
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
