This is a [Next.js](https://nextjs.org) project bootstrapped with
[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

This project is based of a starter template for a Next.js application with the
following features:

- NextAuth (ususally Google Provider) sign in and out (this requires
  reconfiguration in .evn.local)
- Light and dark theme with next-themes
- Custom tailwind css classes that can be adjusted in globals.css
- `/design` page to visualize basic color, font, text size, button, container
  design choices
- Basic layout, containers, buttons, providers, and some other shared React
  components
- PageContainer contains `h-[calc(100vh-56px)]` to fit the current NavBar height
- Contains disableHydrationWarning to prevent error with next-themese
  (alternative onMount solution commented out)

This should be easy to copy and update dependencies and quickly begin a new
project

### NextAuth

- Deploy the app and register on google cloud console
- get GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET on google cloud console
- Loosely follows the docs: https://next-auth.js.org/getting-started/example
- install next-auth
- set NEXTAUTH_SECRET in .env.local (generate a key)
- Set NEXTAUTH_URL (localhost for dev) in .env.local (update for deployment)
- create /lib/authOptions.ts and add GoogleProvider
- Create a file `route.ts` in the folder `/app/api/auth/[…nextauth]`
- Add <SessionProvider> to layout.tsx (in a custom client component) - provides
  client access to the session
- Create custom buttons using { signIn } from 'next-auth/react' (and signOut)
- Client-side: <UseSession> provides name, email, and image
- Server-side: <UseServerSession> provides the same, used in server actions
- MongoDB integration requires adding callbacks to `authOptions`, type extension
  of session in `next-auth.d.ts` (add
  `"typeRoots": ["./types", "./node_modules/@types"]` to `tsconfig.json`). The
  callbacks get a userId from mongo or make a new user entry with an id and
  store the id in the session for access on client-side.

- NextAuth server session is accessed in content/layout.tsx and provided down to
  the client though AccordionStack.tsx

### MongoDB / Mongoose Integration

### OpenAI GPT API

- OpenAI:
  - OPENAI_API_KEY
- App will require an advanced model for content generation
- GPT API call is handled in `/lib/actions/generateContent.ts` server action
- This function uses messages in `/lib/gpt-messages/` in a
  `processInputContent.ts` server action to create a message for each activity
  and send it to the API

### prettier and prettier plugin for tailwind

- npm install -D prettier prettier-plugin-tailwindcss

### Taiwlind custom classes:

- Tailwind custom classes for text in `/app/global.css`
- Includes text colors, container colors, text sizing, effects and borders

### Theme support:

- Add darkMode: 'class' to tailwind.config.ts
- npm i next-themes
- wrap layout in <ThemeProvider>
- Add attribute='class' defaultTheme='dark' props to ThemeProvider

### ReduxToolKit

- Redux state providers are only applied through the /content/layout.tsx and not
  through the App wide providers component
- The layout.tsx also accesses the user object and passes it to the client side
  through AccordionStack.tsx to use in context

### Content forms: react-hook-form

- Content forms are based around `/input/ContentForm.tsx` (based on
  react-hook-form and zod)
- The form takes a formType to determine if it is a manual or generated version
- It takes a zodSchema that can be applied to:
  - primaryInput
  - secondaryInput
- Both inputs are designing to simply take strings and this should be sufficient
  for the input of 90% of content generation pages
- ContentForm takes `info` content which is used to provide some titles and
  tooltip content to guide usage


