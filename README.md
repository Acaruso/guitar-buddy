# guitar-buddy

- to install dependencies:
  - `npm install`
- to build:
  - `npm run build`
- to run:
  - open `dist/index.html` in web browser

# how ui works

- `index.ts` creates `App`
- `App` creates `Ui`
- `App` sets a timer
  - every x milliseconds, `ui.tick()` is called
- `Ui` creates a `BaseElt` called `rootElt`
  - each Elt can have various children, then those can have children, etc.
    - thus, there is a tree of UI elements
  - `rootElt` is the base of this tree
- key down and left mouse button down events are bubbled down to the appropriate elements
  - how does this work exactly?
  - left mb down events are only bubbled down to elements that the click was inside of







