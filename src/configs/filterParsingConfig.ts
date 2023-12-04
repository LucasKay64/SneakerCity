interface FilterConfig {
  operation: string;
  format: (value: string) => string;
}

interface FiltersParsingConfig {
  [key: string]: FilterConfig;
}

export const filtersParsingConfig: FiltersParsingConfig = {
  brand: {
    operation: "like",
    format: (value: string) => `brand.like.*${value}*`,
  },
  color: {
    operation: "like",
    format: (value: string) => `color.like.*${value}*`,
  },
  //... more filters
};
