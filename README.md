- [Creating A Custom Range Input That Looks Consistent Across All Browsers](https://www.smashingmagazine.com/2021/12/create-custom-range-input-consistent-browsers/)
- [Data Fetching in NextJS](https://dev.to/minhnc/data-fetching-in-nextjs-4ee6)
- [Using Next.js Route Handlers](https://blog.logrocket.com/using-next-js-route-handlers/)
```tsx

// // Create a Blob with text content
// const text = "Hello, world!";
// const blob = new Blob([text], { type: "text/plain;charset=utf-8" });

// // Now you can use this Blob to create an object URL
// const objectURL = URL.createObjectURL(blob);

// // Use the object URL as the src attribute for an image element
// const imgElement = document.createElement("img");
// imgElement.src = objectURL;

// // Append the image element to the DOM
// document.body.appendChild(imgElement);

```
# Test
- [The Importance of Request Timeouts](https://dev.to/bearer/the-importance-of-request-timeouts-l3n)
- [About timeouts](https://webhelp.esri.com/arcims/9.3/General/topics/stability_timeouts.htm#:~:text=Timeouts%20are%20an%20important%20aspect,if%20inappropriate%20requests%20are%20made.)
- 
```tsx
// const day = new Date().toISOString();
// console.log(Object.prototype.toString.call(input) === "[object Date]");

// const slugify = require('slugify');

// const result = slugify('bạn là ai', {
//     replacement: '-',  // replace spaces with replacement character, defaults to `-`
//     remove: undefined, // remove characters that match regex, defaults to `undefined`
//     lower: false,      // convert to lower case, defaults to `false`
//     strict: false,     // strip special characters except replacement, defaults to `false`
//     locale: 'en',      // language code of the locale to use
//     trim: true         // trim leading and trailing replacement chars, defaults to `true`
// })
// console.log(result);

```

- Editor
npm i slate slate-react

- [Rich Text Editor in Next.js app with Slate.js](https://www.youtube.com/watch?v=yXd0z1shhoU&ab_channel=KenGreeff)

- [Slate.js Rich Text as JSONB in Postgresql with Prisma](https://www.youtube.com/watch?v=kMpLh2XCWqM&ab_channel=KenGreeff)

- [How to Check Whether an Object is a Date](https://www.w3docs.com/snippets/javascript/how-to-check-whether-an-object-is-a-date.html)


```bash

npm install @tiptap/react @tiptap/pm @tiptap/starter-kit
npm install lucide-react
# npm install --save-dev jest
npm i --save-dev @types/jest
npm install -D ts-node

npm i -S react-rnd

npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom

$ npm i prisma-slug

# Set up a new Prisma project
$ prisma init

# Generate artifacts (e.g. Prisma Client)
$ prisma generate

# Browse your data
$ prisma studio

# Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client)
$ prisma migrate dev

# Pull the schema from an existing database, updating the Prisma schema
$ prisma db pull

# Push the Prisma schema state to the database
$ prisma db push

# Validate your Prisma schema
$ prisma validate

# Format your Prisma schema
$ prisma format

# Display Prisma version info
$ prisma version

# Display Prisma debug info
$ prisma debug


$ prisma migrate dev --create-only
```
# Test

```tsx
import Link from 'next/link'
 
export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  )
}

/**
 * File: __tests__/page.test.jsx
*/
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'
 
describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />)
 
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
  })
})


/**
 * file: __tests__/snapshot.js
*/

import { render } from '@testing-library/react'
import Page from '../app/page'
 
it('renders homepage unchanged', () => {
  const { container } = render(<Page />)
  expect(container).toMatchSnapshot()
})
```

<!-- Alpine -->

```tsx
   // export function ViewRangeFilter() {
//     // const [viewRange, setViewRange] = useState(5);
//     const [min, setViewMin] = useState(5);
//     const [max, setViewMax] = useState(5);
//     // const [position, setPosition] = useState(5);
//     const handleChangeViewMax = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const newView = Number(e.target.value);
//         // const width = Number(e.target.offsetWidth);
//         // console.log('width::', width);
//         // console.log('position::', width - newView);
//         // setViewRange(newView);
//         setViewMax(newView);
//         // setPosition(width - newView);
//     }
//     const handleChangeViewMin = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const newView = Number(e.target.value);
//         // const width = Number(e.target.offsetWidth);
//         // console.log('width::', width);
//         // console.log('position::', width - newView);
//         // setViewRange(newView);
//         setViewMin(newView);
//         // setPosition(width - newView);
//     }
//     return (
        
//     )
// }
// import ViewRangeFilter from './multi-view-range';
```

# Filter categories for posts
- [Select data from date range between two dates](https://stackoverflow.com/questions/14208958/select-data-from-date-range-between-two-dates)