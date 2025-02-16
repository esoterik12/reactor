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

#### New Input Type Process:

1. Create a new page.tsx in a matching folder
2. Add the content top the sidebar constants `AccordionSidebarContent.tsx`
3. Create a new icon for the page and and add it to `ContentForm.tsx`
4. Add new content into into `/lib/constants/content` - add to ContentForm
5. Use existing or create new schemas in `/lib/zod` - add to ContentForm
6. Use existing or create new edit types/schema in `/lib/zod` - add to page
   content state
7. Use appropriate edit form or create a new one in `page.tsx`
8. Create new return structure in `/lib/constants/return-structure`
9. Create new message in `/lib/gpt-messages`
10. Add message and input data to relevant `/lib/actions`
11. Add case to `processInputContent.ts`

### react-pdf

useBlobDownloader.tsx @react-pdf/renderer provides StyleSheet to create
basePageStyles.ts and content-specific styling react-pdf has a few limitations
and cannot use all CSS styles server rendered PDFs are made in `/components/pdf`
folder

### Edit functionality:

Generated content is stored in state:

- It has a title and its contentType as well as different kinds of data
  representing the generated content -simple: array of objects with wordOne and
  wordTwo / or correctWord and incorrectWord or correctSentence and
  incorrectSentence => sometimes it's short as in a word, sometimes it's long as
  in a sentence -simple: array of sentences (like check up) -complex: array of
  sentence with blank, possible answers, correct answer

Possibly require separate components to edit each content type

Type A1: `correctSpelling` + `memory` + `find your partner` can all uses a 2
cols by X rows grid of short inputs

- Other content: `scrambled words`

Type A2: `grammarMistakes` requires a similar structure to A1, but with 1 col
and grouped correct and incorrect sentence

- Other content: `scrambled sentences`

Type B: `check up` requires a simple 1 col by x row but with long inputs

- Other content: `interview`

Type C: `reviewHunt` requires a complex structure but will be reused as a
multiple choice structure

- Other content

Type D: `bingo` + `scrambled words` + `wordsearch` + `spot it` generated
versions will need an edit word like 5 by X grid

The system:

- A reusable edit page that can be added to the path of each content page
  `/content/contentType/edit`
  - Similar to the content input pages, each edit page will load a zod schema
    that can be passed to the edit component
- A set of input fields (probably using `InptuField.tsx` will work, that takes
  tailwind classes depending on content)
- Create edit components that can be .mapped with generated content like:
  - `EditPairs.tsx` for Type A1 with props like 'cols' or 'rows' depending on
    how the content type A1 or A2
  - `EditSentences.tsx` for Type B - simple single wide input
  - `EditMultipleChoice.tsx` for Type C - long sentence edit, 2x2 grid of
    options, correct answer => above type will require a
- The above edit components will be used in the edit pages
