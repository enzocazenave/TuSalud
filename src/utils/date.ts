/* date.ts
 * Utilidades universales para manejar fechas y horas
 * en múltiples zonas horarias (frontend global, backend en UTC)
 */

/**
 * Detecta la zona horaria actual del usuario.
 * Ej: 'America/Argentina/Buenos_Aires'
 */
export const getUserTimeZone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

/**
 * Convierte una fecha tipo 'YYYY-MM-DD' (sin hora)
 * en un Date en UTC desde la zona horaria del usuario.
 *
 * Ej: '2025-06-07' (en Argentina) → '2025-06-07T03:00:00.000Z'
 */
export const parseLocalDateToUtc = (dateStr: string, timeZone: string = getUserTimeZone()): string => {
  const [year, month, day] = dateStr.split('-').map(Number);
  const localDate = new Date(year, month - 1, day);
  const utcDate = new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000);
  return utcDate.toISOString();
};

/**
 * Convierte un Date o string UTC en fecha local formateada para mostrar.
 * Ej: '2025-06-07T14:00:00Z' → '7 de junio de 2025 11:00'
 */
export const formatUtcToLocalDateTime = (
  utcDate: string | Date,
  timeZone: string = getUserTimeZone(),
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
): string => {
  const date = new Date(utcDate);
  return new Intl.DateTimeFormat('es-AR', {
    ...options,
    timeZone
  }).format(date);
};

/**
 * Convierte un Date o string UTC a solo fecha (YYYY-MM-DD) en zona local.
 */
export const formatUtcToLocalDate = (utcDate: string | Date, timeZone: string = getUserTimeZone()): string => {
  const date = new Date(utcDate);
  const formatter = new Intl.DateTimeFormat('sv-SE', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  return formatter.format(date); // Devuelve en formato 'YYYY-MM-DD'
};

/**
 * Convierte una hora (sin fecha) tipo '14:30' en una fecha completa UTC,
 * asumiendo que esa hora es de hoy en la zona horaria del usuario.
 */
export const parseLocalTimeToUtc = (timeStr: string, timeZone: string = getUserTimeZone()): string => {
  const now = new Date();
  const [hour, minute] = timeStr.split(':').map(Number);
  const localDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);
  const utcDate = new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000);
  return utcDate.toISOString();
};

/**
 * Devuelve el nombre del mes formateado correctamente según la zona.
 * Evita el bug de "un día antes" al usar fechas en string ISO.
 */
export const getMonthNameFromDateString = (dateStr: string, timeZone: string = getUserTimeZone()): string => {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat('es-AR', {
    timeZone,
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

/**
 * Verifica si una fecha en UTC cae en el día actual del usuario.
 */
export const isTodayInLocalZone = (utcDate: string | Date, timeZone: string = getUserTimeZone()): boolean => {
  const today = new Date();
  const localToday = new Intl.DateTimeFormat('sv-SE', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(today);
  const localInput = formatUtcToLocalDate(utcDate, timeZone);
  return localToday === localInput;
};

/**
 * Parsea correctamente un string tipo 'YYYY-MM-DD' evitando el bug del día anterior.
 * Retorna un objeto Date en la zona local del usuario (no UTC).
 */
export const parseSafeLocalDate = (dateStr: string): Date => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
};
