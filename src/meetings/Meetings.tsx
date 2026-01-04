import {
  List,
  Datagrid,
  TextField,
  DateField,
  Create,
  Edit,
  SimpleForm,
  TextInput,
  DateTimeInput,
  ReferenceManyField,
  TopToolbar,
  CreateButton,
  useRecordContext,
  required,
  ReferenceField,
} from "react-admin";
import { transform } from "../common/transform";
import { EditToolbar } from "../common/EditToolbar";

export const MeetingList = () => (
  <List>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <DateField source="date" showTime />
      <TextField source="title" />
    </Datagrid>
  </List>
);

export const MeetingCreate = () => (
  <Create redirect="edit" mutationMode="pessimistic">
    <SimpleForm toolbar={<EditToolbar />}>
      <TextInput source="title" validate={[required()]} />
      <DateTimeInput source="date" defaultValue={new Date()} />
      <TextInput source="description" multiline minRows={3} maxRows={10} />
    </SimpleForm>
  </Create>
);

export const MeetingEdit = () => {
  return (
    <Edit transform={transform} mutationMode="pessimistic">
      <SimpleForm toolbar={<EditToolbar />}>
        <TextInput source="title" validate={[required()]} />
        <DateTimeInput source="date" />
        <TextInput source="description" multiline minRows={3} maxRows={10} />
        <h3>Tasks</h3>
        <MeetingTasks />
        <h3>Decisions</h3>
        <MeetingDecisions />
      </SimpleForm>
    </Edit>
  );
};

function MeetingTasks() {
  const record = useRecordContext();
  if (!record?.id) return null;

  return (
    <>
      <ReferenceManyField reference="tasks" target="meeting">
        <Datagrid rowClick="edit" bulkActionButtons={true}>
          <ReferenceField source="people" reference="people" />
          <TextField source="description" />
          <DateField source="dueDate" />
          <TextField source="taskStatus" />
          <TextField source="url" />
        </Datagrid>
      </ReferenceManyField>

      <TopToolbar>
        <CreateButton
          resource="tasks"
          label="Add Task"
          state={{
            record: { meeting: record.id },
            redirectTo: `/meetings/${record.id}`,
          }}
        />
      </TopToolbar>
    </>
  );
}

function MeetingDecisions() {
  const record = useRecordContext();
  if (!record?.id) return null;

  return (
    <>
      <ReferenceManyField reference="decisions" target="meeting">
        <Datagrid rowClick="edit" bulkActionButtons={false}>
          <ReferenceField source="people" reference="people" />
          <TextField source="description" />
        </Datagrid>
      </ReferenceManyField>

      <TopToolbar>
        <CreateButton
          resource="decisions"
          label="Add Decision"
          state={{
            record: { meeting: record.id },
            redirectTo: `/meetings/${record.id}`,
          }}
        />
      </TopToolbar>
    </>
  );
}
