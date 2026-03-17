/**
 * Colores y valores compartidos del tema (Saint George questionnaire).
 */
export const colors = {
  background: "rgb(40, 80, 125)",
  header: "rgb(50, 110, 210)",
  white: "rgb(255, 255, 255)",
  black: "rgb(0, 0, 0)",
  green: "rgb(0, 150, 0)",
  pink: "rgb(200, 0, 150)",
  red: "rgb(255, 0, 0)",
  gray: "rgb(200, 200, 200)",
  grayMedium: "rgb(100, 100, 100)",
  progressBar: "rgb(55, 155, 200)",
} as const;

/** Totales para cálculo de porcentajes SGRQ */
export const SCORE_TOTALS = {
  sintomas: 662.5,
  actividades: 1209.1,
  impacto: 2117.8,
  total: 3989.4,
} as const;

/** Valor por defecto cuando no hay respuesta seleccionada */
export const UNANSWERED_VALUE = 404;
