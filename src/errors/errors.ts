// This file is for modelling specific errors that may be thrown by the Supabase API.
// Supabase provides such class definitons in the supabase client library
// but because the supabase client library is not tree shakeable, it needs to be modelled to not increase budle size.

export class AuthApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthApiError";
  }
}
