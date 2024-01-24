# SneakerCity - eCommerce

THE PROJECT IS STILL **IN DEVELOPMENT**. Also there are certain decisions made mainly for learning purposes.

Live Demo: https://frabjous-sunburst-423f5d.netlify.app/

## App roles:

- user - someone who visits the site
- admin - someone that has been granted admin privileges ( you won't be able to access resources as an admin in the Live Demo because you don't have admin login credentials ).

## User Level Features ( What can you do in the app ):

- browse products
- filter products ( text, brand, color, price, sort )
- add products to cart
- edit the products in your cart ( remove or add more )
- go to a checkout page where you can buy the products ( the actual buying process not yet implemented )
- Create an account, log in to your account
- Admin users can also add new products, edit existing ones or remove existing ones

## Technical details:

- FrontEnd - React + Typescript
- Styling - TailwindCSS
- Global State management - Redux Toolkit
- Forms - React hook form + yup
- Routing - React Router

- BackEnd - Supabase + Postgres DB

Components are made in a variant style fashion and at the same time they provide the flexibility to apply and override existing styles with custom ones.

Browsing and filtering of products is debounced ( useDebounce.ts ) and at the same time irrelevant request are aborted ( AbortController ) to prevent race conditions.
Filtering of products works with storing the state in the URL, therefore the URL can be copied and sent and the other client will load up the state from the URL.
Filters parsing is done via a custom config ( filtersParsingConfig.ts ) which parses the filters to postgREST arguments ( postgREST is a solution that supabase uses to be provide endpoints straight from the DB ).

Compound Component Pattern ( AccordionDropdown.tsx )
Render Props pattern ( Form.tsx )

Protected routes are based upon the role of the user ( Which it gets from the JWT ).

CRUD is made on the products. An Admin in his admin dashboard can create a new product or delete / edit an existing one.

Global Remote State is handled via Async Thunks in Redux toolkit. ( userSlice.ts )
Global UI state is handled via reducers in Redux Toolkit. ( cartSlice.ts )

The Project is using Supabase but i did not use the JS client library they provide ( mainly for learning purposes, but since i didnt include the library itself the budle size got smaller ). I query straight the underlying technology solutions that supabase is built upon. Therefore I increased the workload on my side because I had to manually do queries ( unlike the query builder in supabase client library) and authentication ( interacting with the GoTrue auth server and managing JWTs on my own ). For the protected resources I added a custom claim to the JWT sent by the auth server ( via Postgres functions ) and implemented protected resources with the custom claim ( using postgres ROW LEVEL SECURITY ).
