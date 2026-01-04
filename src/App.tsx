import { Admin, Resource, LoginWithEmail } from "react-admin";
import { Layout } from "./Layout";

import {
  strapiDataProvider,
  strapiAuthProvider,
  strapiHttpClient,
} from "ra-strapi";
import { MeetingCreate, MeetingEdit, MeetingList } from "./meetings/Meetings";
import { TaskCreate, TaskEdit, TaskList } from "./tasks/Tasks";
import {
  DecisionCreate,
  DecisionEdit,
  DecisionList,
} from "./decisions/Decisions";
import { PersonCreate, PersonEdit, PersonList } from "./people/People";

const STRAPI_URL = import.meta.env.VITE_STRAPI_REST_URL;
const authProvider = strapiAuthProvider({ baseURL: STRAPI_URL });
const httpClient = strapiHttpClient();
const dataProvider = strapiDataProvider({ baseURL: STRAPI_URL, httpClient });

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={LoginWithEmail}
  >
    <Resource
      name="meetings"
      list={MeetingList}
      create={MeetingCreate}
      edit={MeetingEdit}
    />

    <Resource
      name="tasks"
      list={TaskList}
      create={TaskCreate}
      edit={TaskEdit}
    />
    <Resource
      name="decisions"
      list={DecisionList}
      create={DecisionCreate}
      edit={DecisionEdit}
    />
    <Resource
      name="people"
      list={PersonList}
      create={PersonCreate}
      edit={PersonEdit}
    />
  </Admin>
);
