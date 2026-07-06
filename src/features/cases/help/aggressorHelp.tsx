export const AGRESSOR_NAME_HELPER =
  "Se completa el nombre y /o el apellido del femicida o sospechoso o su apodo. En las noticias a veces aparecen las iniciales, también lo cargamos. En caso de que no haya ninguno de los datos, el campo no se completa.";

export const AggressorAgeHelper = () => (
  <>
    <p>
      En este espacio se carga la edad del femicida o sospechoso. De acuerdo a
      la información recabada de los medios.
    </p>
    <p>Si no se tiene la edad, se deja vacío.</p>
  </>
);

export const VictimBondsAggressorHelper = () => (
  <>
    <p>
      Esta categoría de análisis nos permite ver el impacto de la violencia
      machista en la configuración de las relaciones interpersonales.
    </p>
    <p>
      Hace referencia a la relación que tiene la víctima con el agresor. En el
      caso de femicidio vinculado se carga la relación con la mujer que es la
      víctima.
    </p>
    <p>
      Si no está contemplada entre las opciones mencionadas, elegir la opción
      más cercana y se debe sugerir la nueva opción{" "}
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

export const AggressorBehaviorsPostCaseHelper = () => (
  <>
    <p>
      Con el objetivo de poder contar con todos los elementos que intervienen en
      los femicidios (o intentos) y transfemicidios (o intentos) es necesario
      conocer lo que hizo el femicida o agresor luego de cometer el hecho.
    </p>
    <p>El sistema permite cargar múltiples opciones.</p>
    <p>
      Si no está contemplada entre las opciones mencionadas, elegir la opción
      "Ninguna de las anteriores" y se debe sugerir la nueva opción{" "}
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

export const AGRESSOR_BELONGS_SECURITY_FORCE_HELPER =
  "En el mismo análisis de los casos observamos otros datos sobre los agresores que pueden ser útiles para la implementación de nuevas y mejores políticas que protejan las vidas de las mujeres y disidencias. Uno de ellos es consignar si el violento pertenece o no a alguna fuerza, para esto se tilda si se conoce o se deja vacio en caso contrario.";

export const AggressorSecurityForceHelper = () => (
  <>
    <p>En caso de indicarse, seleccionar a qué fuerza pertenece el agresor.</p>
    <p>
      Si no está contemplada entre las opciones mencionadas, elegir la opción
      "Otra Fuerza" y se debe sugerir la nueva opción{" "}
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

export const AGRESSOR_LEGAL_COMPLAINT_HISTORY_HELPER =
  "Refiere a si el agresor o femicida tiene antecedentes de denuncias por violencia de género, lo que permite contextualizar los hechos.";

export const AGRESSOR_PREVIOUS_CASES_HELPER =
  "Refiere a si el agresor o femicida tiene antecedentes de femicidios, lo que permite contextualizar los hechos.";

export const AGRESSOR_WAS_IN_PRISON_HELPER =
  "Refiere a si el agresor o femicida ha estado en prisión por delitos relacionados con violencia de género, lo que permite contextualizar los hechos.";
