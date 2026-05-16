import {withForm} from "@/hooks/form";
import Grid from "@mui/material/Grid";
import {controlledFields as aggressorControlledFields} from "./AggressorFields";
import {controlledFields as victimControlledFields} from "./VictimFields";
import {
  defaultFormValues,
  allMomentsOfDay,
  allProvinces,
  allCaseGeographicLocations,
  allCasePlaces,
  allCaseMurderWeapons,
  allCaseCategories,
} from "../formValues";

function difference<T>(a: Set<T>, b: Set<T>): Set<T> {
  return new Set([...a].filter(x => !b.has(x)));
}

// This list exposes which fields that actually belong to the case are being
// displayed here, in order to be able to track errors for the component
// eslint-disable-next-line react-refresh/only-export-components
export const controlledFields = difference(
  new Set(Object.getOwnPropertyNames(defaultFormValues)),
  new Set(["victim", "aggressor", ...aggressorControlledFields, ...victimControlledFields]),
);

//----HELP TEXTS----
const FECHA_DEL_CASO = "No es el día de la noticia, es el día del femicidio/travesticidio. Si hay desaparición previa: Refiere al día en que inició la búsqueda de una persona que luego apareció asesinada, no el día en el que apareció el cuerpo. Si permanece hospitalizada antes de morir: Va la fecha de muerte, no del ataque.";
const CaseCategoryHelper = () => (
  <>
    Para ver el detalle de cada categoría, ir al <a href="https://drive.google.com/file/d/1KlaP7l358FR1xUlTCrSeyyrwD7MTrnnO/view?usp=sharing\" target="_blank">manual de trabajo acá</a>
  </>
);
const CaseWasItAnAttemptHelper = () => (
  <>
    <p>
      Los casos en que el agresor no logró cometer el hecho, pero constituyeron un riesgo de vida para la/s persona/s víctima/s, se consideran Intentos.
      Para ver el detalle de cómo interpretar Intentos, ir al <a href="https://drive.google.com/file/d/1KlaP7l358FR1xUlTCrSeyyrwD7MTrnnO/view?usp=sharing\" target="_blank">manual de trabajo acá</a>
    </p>
    <p>
      No es posible cargar un intento y a su vez que el caso esté bajo investigación ya que generalmente no existe más información. Entonces si se carga un intento debe hacerse con la información encontrada.
    </p>
  </>
);
const CaseSeInvestigaHelper = () => (
  <>
    No hay elementos suficientes para interpretar que se trata de un caso de femicidio o femicidio vinculado o un caso de la categoría específica, pero existen ciertos datos que indican que podría ser un case en esa categoría, pero es necesaria más información para terminar de confirmar.
    Para ver el detalle de cómo interpretar "Aún se investiga", ir al <a href="https://drive.google.com/file/d/1KlaP7l358FR1xUlTCrSeyyrwD7MTrnnO/view?usp=sharing\" target="_blank">manual de trabajo acá</a>
  </>
);
const MOMENTOS_DEL_DIA_HELPER = "Si el hecho ocurrió en horario diurno (de mañana o tarde) o nocturno (de noche). En caso de que no haya datos, no se completa.";
const PROVINCIAS_HELPER = "Se selecciona la provincia en la que ocurrió el hecho. Los casos que ocurren en Ciudad Autónoma de Buenos Aires (CABA) se completan como otra opción distinta de la Provincia de Buenos Aires (PBA), seleccionando sólo CABA. Tanto CABA como PBA  están como opciones separadas.";
const LOCATION_HELPER = "Se agrega la localidad, barrio, la dirección, calle en donde ocurrió el hecho violento. Completar la mayor cantidad de datos encontrados.";
const UBICACION_GEOGRAFICA_HELPER = "Si el caso ocurrió en la zona urbana, rural y si no hay información no se completa.";
const CasePlaceHelper = () => (
  <>
    Con el objetivo de contextualizar y comprender el impacto y los riesgos de la violencia de género, analizamos el lugar donde sucedió el hecho.
    <p>
      Si no está contemplada entre las opciones mencionadas, elegir la opción “Otro”. O si no se tiene información suficiente para elegir entre las otras opciones.
    </p>
    <p>
      En caso de que se elija “Otro”, se debe sugerir la nueva opción <a href="https://docs.google.com/spreadsheets/d/1UruAWj0X2Fw5cBapc-7-sHuGcDyq0-pCfsVECiWCNIo/edit?gid=1735086912#gid=1735086912" target="_blank">agregando los detalles en esta planilla.</a>
    </p>
    <p>
      A su vez, en ese caso de que no hay información al respecto o no está claro, dejar en el campo "Notas del caso" (de manera manual) esta información.
    </p>
  </>
);
const MurderWeaponHelper = () => (
  <>
    Este aspecto del análisis pone de manifiesto el peligro que corremos las mujeres y disidencias en cuanto a las formas de agresión que recurren los victimarios y servirá para el diseño de mejores medidas de protección.

    Si no está contemplada entre las opciones mencionadas, elegir la opción “Otra Forma”. O si no se tiene información suficiente para elegir entre las otras opciones.
    <p>
      En caso de que se elija “Otra Forma”, se debe sugerir la nueva opción <a href="https://docs.google.com/spreadsheets/d/1UruAWj0X2Fw5cBapc-7-sHuGcDyq0-pCfsVECiWCNIo/edit?gid=1735086912#gid=1735086912" target="_blank">agregando los detalles en esta planilla.</a>
    </p>
    <p>
      A su vez, en ese caso de que no hay información al respecto o no está claro, dejar en el campo "Notas del caso" (de manera manual) esta información.
    </p>
  </>
);
const RelatedToOrganizedCrimeHelper = () => (
  <>
    <p>
      Lo característico de los femicidios en contextos de criminalidad organizada es que ocurren en el marco de organizaciones criminales o de bandas de menor envergadura dedicadas a acciones ilícitas como narcocriminalidad/ narcomenudeo y/o trata de personas.
      Ver <a href="https://drive.google.com/file/d/1gqKhj7P9CdkJH6piB4ObG0NbJ3CYflh5/view?usp=sharing" target="_blank">más detalles en este documento.</a>
    </p>
    <p>
      Cuando se selecciona este campo, aparece y se debe completar un nuevo campo "Observaciones de Crimen Organizado" con toda la información que se encuentre sobre el caso que permita entender por qué se lo considera en este contexto.
    </p>
    <p>
      Se enumeran todos los elementos que creamos relevantes de los hechos, que nos sirven para entenderlos y que no están contemplados en las demás categorías. Por ejemplo, mecánica de los asesinatos, si hubo otros asesinatos similares en el lapso de poco tiempo, en el barrio, si la persona víctima asesinada había estado amenazada o ya había sido agredida.
      En general, la información de los medios sobre estos casos es escueta o poco clara, lo que dificulta su monitoreo. Asimismo, rara vez hay denuncias previas.

    </p>
  </>
);

const NEWS_LINKS_HELPER = "Se deben cargar los links de las notas periodísticas que se hayan encontrado sobre el caso. En caso de haber más de una nota, se presiona ENTER después de cada link para cargar varios links. Es importante cargar todas las notas que se encuentren para tener un panorama más completo del caso, ya que a menudo los medios van actualizando la información a medida que avanza la investigación judicial y/o policial.";

const CaseMediaCoverageHelper = () => (
  <>
    <p>
      AUN LO ESTAMOS DISCUTIENDO INTERNAMENTE, PERO LA IDEA ES QUE ESTE CAMPO SIRVA PARA REGISTRAR SI LOS MEDIOS QUE CUBRIERON EL CASO LO HICIERON INCORPORANDO UN ENFOQUE DE PERSPECTIVA DE GÉNEROS Y DIVERSIDAD.
    </p>
    <p>
      Para interpretar este campo, se pueden tener en cuenta algunos criterios como los desarrollados en <a href="http://www.obserdiscriminacion.gob.ar/wp-content/uploads/2020/05/Guia-de-Buenas-Pr%C3%A1cticas-sobre-femicidios.pdf" target="_blank">"Guía de Buenas Prácticas del Observatorio de la Discriminación de Radio y TV"</a>, entre otros, como por ejemplo:
      <ul>
        <li>Sensacionalismo, la espectacularización y el morbo: Se debe verificar si el medio omitió dar detalles innecesarios u pormenorizados sobre la escena del crimen o los métodos empleados, evitando alimentar la curiosidad morbosa del público.</li>
        <li>Uso correcto del lenguaje y encuadre conceptual (eliminar el "crimen pasional"): Se debe analizar si la cobertura utilizó un lenguaje estrictamente informativo, oportuno y libre de expresiones o adjetivos tendenciosos. Un indicador fundamental de la perspectiva de género es que se haya desterrado por completo la antigua e incorrecta figura de "crimen pasional".</li>
      </ul>
    </p>
    <p>
      En caso de que se seleccione "Sí" o "No", se habilita un nuevo campo "Notas de cobertura con perspectiva de género" para agregar por qué se selecciono SI o NO o para sumar cualquier información relevante sobre la cobertura mediática del caso.
    </p>
  </>
);



const CaseFields = withForm({
  defaultValues: defaultFormValues,
  render: function Render({form}) {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <form.AppField
              name="occurredAt"
              children={(field) => <field.DatePicker label="Fecha del caso" helpText={FECHA_DEL_CASO} />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.AppField
              name="caseCategory"
              children={(field) => <field.Combo label="Categoría" required={true} options={allCaseCategories} helpText={<CaseCategoryHelper />} />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <form.AppField
              name="wasItAnAttempt"
              children={(field) => <field.Checkbox label="¿Fue un intento?" helpText={<CaseWasItAnAttemptHelper />} />}
              listeners={{
                onChange: ({value}) => {
                  if (value)
                    form.setFieldValue('isInsufficientDataOrUnderInvestigation', false)
                },
              }}
            />
          </Grid>

          <form.Subscribe
            selector={(state) => state.values.wasItAnAttempt}
            children={(wasItAnAttempt) => (
              <Grid item xs={12} sm={6}>
                <form.AppField
                  name="isInsufficientDataOrUnderInvestigation"
                  children={(field) => <field.Checkbox label="¿Aún se investiga?" disabled={wasItAnAttempt} helpText={<CaseSeInvestigaHelper />} />}
                />
              </Grid>
            )}

          />

          <Grid item xs={12} sm={6}>
            <form.AppField
              name="momentOfDay"
              children={(field) => <field.Combo label="Momento del día" options={allMomentsOfDay} helpText={MOMENTOS_DEL_DIA_HELPER} />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.AppField
              name="province"
              children={(field) => <field.Combo label="Provincia" required={true} options={allProvinces} helpText={PROVINCIAS_HELPER} />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.AppField
              name="location"
              children={(field) => <field.Text label="Localidad" helpText={LOCATION_HELPER} />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.AppField
              name="geographicLocation"
              children={(field) => <field.Combo label="Ubicación geográfica" options={allCaseGeographicLocations} helpText={UBICACION_GEOGRAFICA_HELPER} />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.AppField
              name="place"
              children={(field) => <field.Combo label="Lugar del hecho" required={true} options={allCasePlaces} helpText={<CasePlaceHelper />} />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.AppField
              name="murderWeapon"
              children={(field) => <field.Combo label="Forma" options={allCaseMurderWeapons} helpText={<MurderWeaponHelper />} />}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <form.AppField
              name="isRelatedToOrganizedCrime"
              children={(field) => <field.Checkbox label="¿Fue en contexto de criminalidad organizada?" helpText={<RelatedToOrganizedCrimeHelper />} />}
            />
          </Grid>

          <form.Subscribe
            selector={(state) => state.values.isRelatedToOrganizedCrime}
            children={(isRelatedToOrganizedCrime) => isRelatedToOrganizedCrime && (
              <Grid item xs={12}>
                <form.AppField
                  name="organizedCrimeNotes"
                  children={(field) => <field.Text label="Observaciones de Crimen Organizado" multiline />}
                />
              </Grid>
            )}
          />

          <Grid item xs={12}>
            <form.AppField
              name="generalNotes"
              children={(field) => <field.Text label="Notas del Caso" multiline />}
            />
          </Grid>

          <Grid item xs={12}>
            <form.AppField
              name="newsLinks"
              children={(field) => <field.Text label="Link de la nota" required={true} multiline maxRows={5} helpText={NEWS_LINKS_HELPER}/>}
            />
          </Grid>


          <Grid item xs={12}>
            <form.AppField
              name="hasMediaGenderPerspective"
              children={(field) => <field.YesNoUnknown label="¿Los medios que cubrieron el caso lo hicieron incorporando un enfoque de perspectiva de géneros y diversidad?" helpText={<CaseMediaCoverageHelper />} />}
            />
          </Grid>

          <form.Subscribe
            selector={(state) => state.values.hasMediaGenderPerspective === "yes" || state.values.hasMediaGenderPerspective === "no"}
            children={(hasMediaGenderPerspective) => hasMediaGenderPerspective && (
              <>
                <Grid item xs={12}>
                  <form.AppField
                    name="coverageMediaPerspectiveNotes"
                    children={(field) => <field.Text label="Notas de cobertura con perspectiva de género" multiline />}
                  />
                </Grid>
              </>
            )}
          />

        </Grid>
      </>
    );
  }
});

export default CaseFields;
