import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  LoginWithEmail
} from "react-admin";
import { Layout } from "./Layout";

import {
  strapiDataProvider,
  strapiAuthProvider,
  strapiHttpClient,
} from "ra-strapi";

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
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
    <Resource
      name="tasks"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
    <Resource
      name="decisions"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
    <Resource
      name="people"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
  </Admin>
);
