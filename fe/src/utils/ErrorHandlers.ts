import axios, { AxiosError } from 'axios';
import { getReasonPhrase } from 'http-status-codes';

/**
 * Handle `any` type of error that may be an `AxiosError` or any other generic HTTP error.
 *
 * @param err The error to handle
 * @returns The error message
 */
export function handleHttpError(err: unknown): string {
  // Handle if it's an AxiosError
  if (axios.isAxiosError(err)) {
    const axiosError = err as AxiosError;

    const errorMessage = getErrorMessage((axiosError.response?.data as Record<string, never>), axiosError.status);
    // return `An error occurred (${errorMessage}). Please try again later.`;
    return errorMessage;
  }

  // Handle other HTTP-like errors
  if (typeof err === 'object' && err !== null) {
    const httpError = err as Record<string, never>;

    // Scrape for the error message
    const errorMessage = getErrorMessage(httpError.response || httpError, httpError.status);
    // return `An error occurred (${errorMessage}). Please try again later.`;
    return errorMessage;
  }

  // Fallback to generic error handling
  return handleGenericError(err);
}

/**
 * Helper function to scrape the error object for the error message.
 * If no error message is found, return a generic error message according to status code.
 *
 * @param obj The error object to scrape
 * @param statusCode Optional status code
 * @returns The error message
 */
function getErrorMessage(obj: Record<string, never>, statusCode?: number): string {
  if (!obj) return 'Unknown Error';

  // Check if the error object contains a message directly
  if (typeof obj.message === 'string') {
    return obj.message;
  }

  // Check if the error object contains nested messages (recursive check)
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      const result = getErrorMessage(obj[key]);
      if (result) {
        return result;
      }
    }
  }

  // If no message was found, try to return a generic message based on status code
  if (statusCode) {
    return getReasonPhrase(statusCode);
  }

  // Last resort: return an unknown error message
  return 'Unknown Error';
}

/**
 * Handle generic `Error`
 * @param err The error to handle
 * @returns The error message
 */
export function handleGenericError(err: unknown): string {
  return (err as Error).message || 'An unexpected error occurred. Please try again later.';
}
