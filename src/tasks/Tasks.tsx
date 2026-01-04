import {
  List,
  Datagrid,
  TextField,
  DateField,
  Create,
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  SelectInput,
  ReferenceInput,
  AutocompleteInput,
  required,
  ReferenceField,
} from "react-admin";
import { useLocation, useNavigate } from "react-router-dom";
import { transform } from "../common/transform";
import { EditToolbar } from "../common/EditToolbar";

export const TaskList = () => (
  <List>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <ReferenceField source="people" reference="people">
        <TextField source="name" noWrap />
      </ReferenceField>
      <ReferenceField source="meeting" reference="meetings">
        <DateField source="date" />
      </ReferenceField>
      <TextField source="description" />
      <DateField source="dueDate" />
      <TextField source="url" />
      <TextField source="taskStatus" />
    </Datagrid>
  </List>
);

export const TaskCreate = () => {
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
      <TaskForm />
    </Create>
  );
};

export const TaskEdit = () => {
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
      <TaskForm />
    </Edit>
  );
};

function TaskForm() {
  const prefill = usePrefillFromLocationState();

  return (
    <SimpleForm defaultValues={prefill ?? undefined} toolbar={<EditToolbar />}>
      <ReferenceInput source="people" reference="people">
        <AutocompleteInput optionText="name" validate={[required()]} />
      </ReferenceInput>
      <ReferenceInput source="meeting" reference="meetings">
        <AutocompleteInput optionText="title" />
      </ReferenceInput>
      <TextInput source="description" validate={[required()]} />
      <DateInput source="dueDate" />
      <TextInput source="url" />
      <SelectInput
        source="taskStatus"
        choices={[
          { id: "Open", name: "Open" },
          { id: "In-Progress", name: "In-Progress" },
          { id: "Completed", name: "Completed" },
        ]}
        defaultValue="Open"
        validate={[required()]}
      />
    </SimpleForm>
  );
}

function usePrefillFromLocationState() {
  const loc = useLocation();
  const stateRecord = (loc.state as any)?.record;
  return stateRecord ? stateRecord : null;
}
