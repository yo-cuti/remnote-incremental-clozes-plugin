import {
  declareIndexPlugin,
  ReactRNPlugin,
  WidgetLocation,
  Rem, // <--- CAMBIO: De RemInterface a Rem
  RichTextInterface,
  RichTextElementInterface,
  RegisterPowerupOptions,
  // RichTextElementTextInterface, // No es estrictamente necesario importarlo si usamos el type guard
} from '@remnote/plugin-sdk';
import '../style.css';
import '../App.css';

async function onActivate(plugin: ReactRNPlugin) {
  // Register settings
  await plugin.settings.registerStringSetting({
    id: 'name',
    title: 'What is your Name?',
    defaultValue: 'Bob',
  });

  plugin.app.registerCommand({
    id: 'incrementalClozes',
    name: 'Incremental Clozes',
    action: async () => {
      const rem = await plugin.focus.getFocusedRem();
      await rem?.addPowerup("incrementalClozes");
    },
  });
  
  const powerupOptions: RegisterPowerupOptions = {
    slots: [
      {
        // property code used to uniquely identify the powerup property
        code: 'incrementalClozes',
        // human readable property code name
        name: 'Incremental Clozes',
        // (optional: false by default)
        // only allow the property to be modified programatically
        onlyProgrammaticModifying: true,
        // (optional: false by default)
        // hide the property - don't show it in the editor
        hidden: true,
      }
    ],
  }

  plugin.app.registerPowerup(
    'Incremental Clozes', // human-readable name
    'incrementalClozes', // powerup code used to uniquely identify the powerup
    'Un "powerup" para separar en "incremental clozes"', // description
    powerupOptions
  );

  // A command that inserts text into the editor if focused.
  await plugin.app.registerCommand({
    id: 'editor-command',
    name: 'Editor Command',
    action: async () => {
      const rem = await plugin.focus.getFocusedRem();
      if (!rem) {
        plugin.app.toast("No Rem focused.");
        return;
      }

      const originalContent: RichTextInterface | undefined = await rem.text;

      if (!originalContent || originalContent.length === 0) {
        plugin.app.toast("Focused Rem has no content to process.");
        return;
      }

      // Función para crear variantes del texto con clozes
      const createClozeByColor = (
        content: RichTextInterface,
        targetColor: string,
        clozeNum: number
      ): RichTextInterface => { // RichTextInterface es RichTextElementInterface[]
        return content.map((element: RichTextElementInterface) => {
          // Usar el type guard del SDK para asegurar que es un elemento de texto
          // y que tiene el color de resaltado deseado.
          // plugin.RichText.isText(element) asegura que element.i es string y element.h puede existir.
          if (
            // Condición 1: El elemento NO tiene una propiedad 'type'.
            // Los elementos de texto simples generalmente no la tienen.
            // Elementos como RemLink, Image, Video SÍ la tienen.
            ('type' in element) &&

            // Condición 2: La propiedad 'i' ES un string (contenido).
            typeof element.i === "string" &&

            // Condición 3: La propiedad 'i' NO es uno de los discriminadores de tipo conocidos.
            // Esta lista puede necesitar ajustes según los tipos de elementos del SDK.
            !['m', 'q', 'h1', 'h2', 'h3', 'code', 'table', 'list_item', 'card_item_delimiter'].includes(element.i) &&

            // Condición 4: El elemento tiene el color de resaltado deseado.
            element.i === targetColor
          ) {
            return {
              // Si todas las condiciones se cumplen, es probable que sea un RichTextElementTextInterface
              // cuyo contenido 'i' puede ser modificado de forma segura.
              ...element, // Copia otras propiedades (negrita, cursiva, etc.)
              i: `{{c${clozeNum}::${element.i}}}`, // Envuelve el texto en un cloze
              h: undefined, // Quita el color de resaltado
            };
          }
          // Si no, devuelve el elemento sin cambios.
          return element;
        }) as RichTextInterface; // Aserción de tipo para el array resultante
      };

      const cloze1Content: RichTextInterface = createClozeByColor(originalContent, "yellow", 1);
      const cloze2Content: RichTextInterface = createClozeByColor(originalContent, "blue", 2);

      // Crear primer hijo y establecer su RichText
      // CAMBIO: Usar rem.createChild()
      const childRem1 = await plugin.rem.createRem();
      if (childRem1) {
        childRem1.setParent(rem);
        await childRem1.setText(cloze1Content);
        // await childRem1.setRichText(cloze1Content);
      } else {
        plugin.app.toast("Failed to create first child Rem.");
      }

      // Crear segundo hijo y establecer su RichText
      // CAMBIO: Usar rem.createChild()
      const childRem2 = await plugin.rem.createRem();
      if (childRem2) {
        childRem2.setParent(rem);
        await childRem2.setText(cloze2Content);
      } else {
        plugin.app.toast("Failed to create second child Rem.");
      }
    },
  });

  await plugin.app.toast("Cloze by Color plugin activated!");

  await plugin.app.registerWidget('sample_widget', WidgetLocation.RightSidebar, {
    dimensions: { height: 'auto', width: '100%' },
    // component: YourReactComponentForWidget // No olvides añadir tu componente React aquí
  });
}

async function onDeactivate(_: ReactRNPlugin) {
  console.log("Cloze by Color plugin deactivated.");
}

declareIndexPlugin(onActivate, onDeactivate);