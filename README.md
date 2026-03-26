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
    
* If the new fields are linked with new ENUMS in the API, Run `docker compose up dev npx openapi-typescript ./path/to/my/schema.yaml -o ./src/api/aqsnv/v1.ts`
  * to get the yaml, go to `http://localhost:8081/` and download the openapi.json
  * rename extension to get `openapi.yaml` and move the file in `/repositories-aqsnv/ui-registro-femicidios/`
  * Another alternative is to run it locally `npx openapi-typescript ./openapi.yaml o ./src/api/aqsnv/v1.ts`
* Add new ENUM also in the export in `src/api/aqsnv/cases.ts`
* Configure default values for the form in the Const `defaultValues` in `src/routes/cases/formValues.tsx`
* Convert what is in the form to the types that the API is expecting in the function `formValuesToCase` in `src/routes/cases/formValues.tsx`
* Check the url or path, for a new cases it is in  `src/routes/cases/new.tsx`. check on the return function
* Navegate until the component you want to update (thi is the page / the UI)
* To add a new field use form.AppField, adding in the field `name` the name of the API and in `children` the component used fo that field. There are pre-defined components in `src/hooks/form.tsx`
  * IF a new component is needed, check with Andres
* Then, it should be ok. There shouldn't be need to change the `onSubmit` that is part of the `const form` in `src/routes/cases/new.tsx`.

Reminders:
* Grid includes 12 columns
* xs means extra small and sm means small/medium and there are other options 

## License
See the [LICENSE](./LICENSE) file for license rights and limitations (MIT).

