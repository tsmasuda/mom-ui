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
  useRedirect,
  ReferenceField,
} from "react-admin";
import { useLocation } from "react-router-dom";
import { transform } from "../common/transform";

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
  const redirect = useRedirect();
  const location = useLocation();

  const redirectTo = (location.state as any)?.redirectTo ?? "/tasks";

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
      <TaskForm />
    </Create>
  );
};

export const TaskEdit = () => {
  const redirect = useRedirect();
  const location = useLocation();

  const redirectTo = (location.state as any)?.redirectTo ?? "/tasks";

  return (
    <Edit
      redirect="list"
      mutationOptions={{
        onSuccess: () => {
          redirect(redirectTo);
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
    <SimpleForm defaultValues={prefill ?? undefined}>
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
