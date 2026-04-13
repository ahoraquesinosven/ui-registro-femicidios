# ui-registro-femicidios

Internal website for the femicide registry system we use at the Observatorio de las Violencias de Género “Ahora Que Sí Nos Ven”

This is a [ReactJS](https://react.dev/) project built using [Vite](https://vitejs.dev/).

## Development

### Prerequisites

We use a dockerized development environment, so you will need [docker](https://www.docker.com/) on your machine. No other dependencies are required in your machine.

### Quick start

* Make sure you have a server running from https://github.com/ahoraquesinosven/api-registro-femicidios
    * Follow the steps describe in that API README to create the env.defaults
    * Update the .env with:`AUTH_PROVIDER_REDIRECT_URI=http://localhost:5173/oauth/cb` to make sure it is calling this UI
    * Run `docker compose up` to run the server


* Run `docker compose up`. This will take a bit the first time since the docker images need to be built or downloaded. Once done, the website can be accessed at http://localhost:5173.

  
### How to add new fields in the Creat Form / New Case
    
* If the new fields are linked with new ENUMS in the API, Run `docker compose run website node_modules/.bin/openapi-typescript ./src/openapi.json -o ./src/api/aqsnv/v1.ts --enum`
  * to get the json, go to `http://localhost:8081/` and download the openapi.json
  * move the file in `/repositories-aqsnv/ui-registro-femicidios/src`
* Add new ENUM also in the export in `src/api/aqsnv/cases.ts`
* Configure default values for the form in the Const `defaultValues` in `src/routes/cases/formValues.tsx`
* Convert what is in the form to the types that the API is expecting in the function `formValuesToCase` in `src/routes/cases/formValues.tsx`
* Check the url or path use in the frontend, for a new cases it is in the file  `src/routes/cases/new.tsx`. check on the return function to identify which part of the UI you want to update.
* Navegate until the component you want to update (thi is the page / the UI)
* To add a new field use form.AppField, adding in the field `name` the name of the API and in `children` the component used fo that field. There are pre-defined components in `src/hooks/form.tsx`
  * IF a new component is needed, check with Andres
* Then, it should be ok. There shouldn't be need to change the `onSubmit` that is part of the `const form` in `src/routes/cases/new.tsx`.


### How to verify if the build is OK
- run `docker compose run website npm run build`

## Ref Links
- TanStack Form - subscribers, all to have same l&f: https://tanstack.com/form/latest/docs/framework/react/guides/listeners
- MUI - UI component framework : https://mui.com/material-ui/react-checkbox/
- TanStack Query - Sync with Server: https://tanstack.com/query/latest/docs/framework/react/overview



## License
See the [LICENSE](./LICENSE) file for license rights and limitations (MIT).

