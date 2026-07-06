export const VICTIM_NAME_HELPER =
  "Este dato es sumamente importante para identificar a las víctimas de violencia de género. Si sólo se tiene el nombre o el apellido se agrega la información que se tiene. En las noticias a veces aparecen las iniciales, también lo cargamos. En caso de que no haya ninguno de los datos, el campo no se completa.";

export const VictimAgeHelper = () => (
  <>
    <p>
      El fenómeno de la violencia de género se presenta de diversas maneras a lo
      largo de la vida de las mujeres y disidencias. Es por eso que en nuestro
      análisis incorporamos el segmento etario de las víctimas. Si se tiene el
      dato, se completa el número.
    </p>
    <p>
      Si la víctima tiene menos de 1 año, por ejemplo 8 meses se divide, es
      decir 8 meses dividido por los 12 meses (8/12) y se completa con el
      resultado que, en este caso, es 0. 66.
    </p>
    <p>Si no se tiene la edad, se deja vacío.</p>
  </>
);

export const VICTIM_GENDER_HELPER =
  "Las opciones HOMBRE y NO BINARIO se pueden utilizar sólo en el caso de FEMICIDIOS VINCULADOS, porque nosotras registramos sólo casos de personas feminizadas. En caso de que no se tenga el dato, se deja vacío.";

export const NationalityHelper = () => (
  <>
    <p>
      Se completa la nacionalidad de la víctima. Si no se tiene el dato, se deja
      vacío.
    </p>
    <p>
      Si no está contemplada entre las opciones mencionadas, elegir la opción
      “Otra” y se debe sugerir la nueva opción{" "}
      <a
        href="https://docs.google.com/spreadsheets/d/1UruAWj0X2Fw5cBapc-7-sHuGcDyq0-pCfsVECiWCNIo/edit?gid=1735086912#gid=1735086912"
        target="_blank"
        rel="noopener"
      >
        agregando los detalles en esta planilla.
      </a>
    </p>
  </>
);
export const VICTIM_OCCUPATION_HELPER =
  "Es un dato muy invisibilizado en los medios, ya que no suele aparecer la ocupación, profesión de la persona víctima de violencia por razones de género. En caso de que se encuentre información al respecto, se completa de manera manual";

export const VICTIM_PROSTITUTION_HELPER =
  "Mujeres en contexto de violencia de género que ejercen la prostitución. Se elige la opción de acuerdo a la información brindada o inferida por los medios";

export const VICTIM_MISSING_PERSON_HELPER =
  "En este espacio se consigna si la mujer víctima de violencia de género o persona LGTBIQ+, previo al hecho violento o cuando se encontró su cuerpo, estuvo o no desaparecida.";

export const VICTIM_NATIVE_PEOPLE_HELPER =
  "Si la mujer o disidencia  provienen de un pueblo originario";

export const VICTIM_PREGNANT_HELPER =
  "Refiere al hecho de si la mujer víctima de violencia de género estaba embarazada cuando ocurrió el hecho.";

export const VICTIM_DISABILITY_HELPER =
  "La discapacidad es un elemento de mucha vulnerabilidad para las personas víctimas de violencia de género, lo que las expone mucho más a estas situaciones violentas. Personas en contexto de violencia de género que tenían algún tipo de discapacidad. Se elige la opción de acuerdo a la información brindada o inferida por los medios";

export const VICTIM_RAPE_HELPER =
  "Si bien, en nuestro registro no se monitorean los delitos sexuales específicamente, es relevante poder contar con estos elementos (si es que los hay) en los casos para generar estadísticas que permitan conocer y analizar la presencia de los mismos en los casos que cargamos.";

export const VictimJudicializedHelper = () => (
  <>
    <p>
      El registro de este dato es fundamental para poder relevar información
      sobre el accionar de la justicia en los casos de violencia de género,
      luego de que la/s persona/s que están en situación de violencia de género
      han recurrido a la misma. Asimismo, permite observar el grado de
      protección que tenía la mujer y diversidad víctima de violencia. Esta
      información, de a poco, está siendo más visibilizada por los medios.
    </p>
    <p>
      Si la nota menciona que tuvo alguna medida judicial, significa que existía
      una denuncia, así que el sistema selecciona automaticamente ¿Había
      realizado una denuncia?
    </p>
  </>
);

export const VICTIM_LEGAL_COMPLAINTS_HELPER =
  "Se refiere a si la víctima había realizado denuncias previas al momento del hecho. Se elige la opción de acuerdo a la información brindada o inferida por los medios.";

export const VictimChildrenHelper = () => (
  <>
    <p>
      Les hijes son también víctimas de los hechos de violencia de género y de
      los femicidios (a veces de manera indirecta y directamente), por lo tanto
      recabamos esta información para visibilizar el grado de impacto que estas
      situaciones extremas de violencia ocasionan en los vínculos afectivos y
      filiales de todas las víctimas.
    </p>
    <p>
      En este espacio se completa la opción recabada: “Si” (si tiene hijes),
      “No” (si no tiene) y “Sin Datos” (cuando el medio no brinda detalles de
      esa información).
    </p>
    <p>
      Posteriormente, siempre en caso de que hayamos puesto que sí tiene hijes,
      nos aparece la posibilidad de escribir la edad de les mismes, de manera
      manual, presionando Enter luego de cada edad. Al no ser un espacio para
      completar obligatoriamente podremos pasar al siguiente paso, pero sí se
      tiene el dato hay que colocarlo.
    </p>
  </>
);
