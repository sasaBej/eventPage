import { City } from "./City";
import { Country } from "./Country";

export interface Address{
  readonly location: string,
  readonly cityId: City,
  readonly countryId: Country
}