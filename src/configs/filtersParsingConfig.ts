interface FilterConfig {
  buildQuery: (value: string) => string;
}

interface FiltersParsingConfig {
  [key: string]: FilterConfig;
}

export const filtersParsingConfig: FiltersParsingConfig = {
  brand: {
    buildQuery: (value: string) => {
      const query = value
        .split(",")
        .map((val) => `brand.like.*${val}*`)
        .join(",");

      return `or=(${query})`;
    },
  },
  color: {
    buildQuery: (value: string) => {
      const query = value
        .split(",")
        .map((val) => `color.like.*${val}*`)
        .join(",");

      return `or=(${query})`;
    },
  },
  minPrice: {
    buildQuery: (value: string) => `price=gte.${value}`,
  },
  maxPrice: {
    buildQuery: (value: string) => `price=lte.${value}`,
  },
  //... more filters
};
