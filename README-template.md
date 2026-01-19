# Frontend Mentor - Typing Speed Test solution

This is a solution to the [Typing Speed Test challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/typing-speed-test). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:
-Start a test by clicking the start button or by clicking the passage and typing
-Select a difficulty level (Easy, Medium, Hard) for passages of varying complexity
-Switch between mode: Timed (120s),Timed (60s),Timed (30s),Timed (15s) and Passage mode
-Restart at any time to get a new random passage from the selected difficulty
-See real-time WPM, accuracy, and time stats while typing
-See visual feedback showing correct characters (green), errors (red/underlined), and cursor position
-Correct mistakes with backspace (original errors still count against accuracy)
-View results showing WPM, accuracy, and characters (correct/incorrect) after completing a test
-See a "Baseline Established!" message on their first test, setting their personal best
-See a "High Score Smashed!" celebration with confetti when beating their personal best
-Have their personal best persist across sessions via localStorage

- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./public/screenshots/Screenshot%20Typing-speed-test-app.png)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Tailwindcss](https://tailwindcss.com/) - For styles
- [Recharts](https://recharts.github.io/en-US) - Chart library

### What I learned

- how to build and use a custom timer hook
- calculating Wpm
- state mangement
- how to use useEffectEvent
- Recharts

To see how you can add code snippets, see below:

```ts
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // fail silently (quota, private mode, etc.)
    }
  }, [key, value]);

  return [value, setValue] as const;
}
```

```ts
const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!started) {
    setStarted(true);
  }
  const prev = input;
  const value = e.target.value;
  // Ignore deletions
  if (value.length < prev.length) {
    setInput(value);
    return;
  }

  // New character typed
  const newChar = value[value.length - 1];
  const expectedChar = currentText[value.length - 1];

  setTotalKeystrokes((k) => k + 1);

  if (newChar !== expectedChar) {
    setErrorKeystrokes((e) => e + 1);
  }

  if (e.target.value.length < currentText.length) {
    setInput(e.target.value);
  } else {
    setStarted(false);
    setEnded(true);
  }
};
```

### Continued development

- tracking errors and displaying it on the chart
  Create shareable result cards for social media

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

**Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.**

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.

**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**
