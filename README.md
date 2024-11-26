# Farcaster Frames Quiz Template

Welcome to the **Farcaster Frames Quiz Template**! This template is for developers who want to explore Farcaster Frames and quickly integrate decentralised rewards into their web apps.

This is a simple and slimmed-down example of how to use **Frog** to quickly create a a frame with on-chain rewards. It’s designed to get you up and running fast, allowing you to experiment with Farcaster’s functionality and integrate **OpenFormat**'s reward system.

By using this template, you'll learn the basics on how Frames work, how to use Frog to create frames, and how you can reward your users using **OpenFormat**'s reward system.

---

## Project Structure

```bash
QuizApp/
├── frames/
│   ├── startPage.tsx         # Landing page frame
│   ├── questionPage.tsx      # Quiz question frame
│   ├── resultPage.tsx        # Result display frame
├── rewardUser.tsx            # Handles XP rewards distribution
├── index.tsx                 # Main application entry point
├── data/   
│   ├── questions.ts.         # Quiz question storage                 
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite build configuration

```

## Getting Started

### Prerequisites

Before you begin, make sure you have the following set up:

1. A code editor like VSCode
2. A basic understanding of TypeScript and React
3. Set up an Open format account found [here](https://docs.openformat.tech/sdks/typescript/quickstart)
    - Create a new dApp to get your `OPENFORMAT_DAPP_ID`
    - note down PRIVATE_KEY and SMART_CONTRACT_ADDRESS

### Install Dependencies

First, install the dependencies using **npm**. From the project directory, run:

```bash
npm install
```

This will install **Frog**, **Neynar**, and other required dependencies.

---

## Environment Variables Setup

For this project to function properly, you need to set up some environment variables. To set these variables locally, create a `.env` file in the root directory and add the following:

### OpenFormat Variables

You'll need your OpenFormat credentials to interact with the rewards system and blockchain:

```bash
PRIVATE_KEY=your_private_key_here
DAPP_ID=your_dapp_id_here
SMART_CONTRACT_ADDRESS=your_smart_contract_address_here
```

These variables connect your app to OpenFormat' reward system, allowing you to issue rewards (like badges) for user interactions.

### Neynar API Key

Neynar is used to handle user interactions and data (e.g., display name, wallet address). For development, you can use the following developer API key:

```bash
NEYNAR_API_KEY=NEYNAR_FROG_FM
```

Note: This key has heavy rate limits, so it’s only suitable for development. To use Neynar’s capabilities in production (for fetching real user data), you’ll need to upgrade to a paid plan for an API key.

## Running this project

**Test It Locally**

Once everything is set up, you can fire up the frog development server:

```bash
npm run dev
```

Now, you can head to the address given in your console and you should see your Frame in action. You’ll be able to interact with them, see how user data is pulled from Neynar, and check out the rewards system powered by OpenFormat.

---

## How This Works

### Understanding **Frog**

**Frog** is a framework designed to help developers quickly build applications with **Frames**. It simplifies routing and page management, making it easier to create interactive and user-driven DApps.

In this template, **Frog** is used to define the routes (or "frames") that make up your app. Each frame corresponds to a different page or view in the app.

Here's the initialisation code for **Frog** in the project:

```tsx
export const app = new Frog({
    assetsPath: '/',
    basePath: '/api',
    title: 'Quiz',
    hub: pinata(),  
}).use(
    neynar({
        apiKey: 'NEYNAR_FROG_FM',  // Developer API key for Neynar
        features: ['interactor', 'cast'],  // Enables user interaction and data features
    }));
```

- **assetsPath**: The directory where your assets (e.g., images, styles) are stored.
- **basePath**: The base path for your app's API routes.
- **title**: The app's title that appears in the browser.

Then, we define the frames or pages of our app:

```tsx
app.frame('/', startPage);  // Home page
app.frame('/question/:current', questionPage);  // Quiz question page
app.frame('/result/:score', resultPage);  // Final result page
```

### Adding New Routes (Frames)

Each frame corresponds to a route, like a page or component in your app. For example:

- **`/`** is the homepage, showing the intro or starting screen.
- **`/question/:current`** displays a quiz question, where `:current` is a dynamic parameter for the current question.
- **`/result/:score`** shows the user’s score after completing the quiz.

If you want to add more pages, you simply add new routes:

```tsx
app.frame('/leaderboard', leaderboardPage);  // New leaderboard page
```

Each route connects to a function or component that defines the content and interaction for that page.

## Frames in Frog

There are three things returned to Farcaster in order to render your Frame

- **Action**: This is what will happen when an intent(Button) is pressed. It triggers a transition or state change in the app.
- **Image**: Refers to the content rendered in the frame, like dynamic questions or data. It’s the visual representation of what the user sees.
- **Intent**: These are the buttons within your frame, they can hold values and data to send to other parts of your code

    ```tsx
    
    return c.res({
      action: `/`, // Redirect to the start of the frame
      image: (
              <div style={textStyle}>Welcome to the Quiz!</div>
    	),
      intents: [<Button>Start Quiz</Button>]
    });
    ```


### Adding Your Own Quiz Questions

You can easily modify the **questionPage** route to display custom quiz questions. Here’s an example of how you could define a list of questions:

```tsx
const questions = [
  {
    question: "What's the capital of France?",
    answers: ['Paris', 'London', 'Berlin', 'Madrid'],
    correctAnswer: 0
  },
  {
    question: "Who wrote '1984'?",
    answers: ['George Orwell', 'J.K. Rowling', 'Ernest Hemingway', 'Mark Twain'],
    correctAnswer: 0
  },
  // Add more questions as needed
];
```

Now, when users visit `/question/0`, they’ll see the first question. Clicking "Next" will load the next question based on the index.

---

## Integrating OpenFormat Rewards

**OpenFormat** allows you to integrate blockchain rewards into your app. In this project, we use it to reward users for completing the quiz. By setting up your **DApp ID** and **PRIVATE_KEY**, you can issue rewards (like tokens or badges) to users.

For example, after completing the quiz, you could award the user tokens according to their score:

```tsx
rewardUser(walletAddress, amountOfXP);
```

With the function created in rewardUser all you need to do to award tokens is give the address and the amount, providing you have set up the DApp on their website.

They also offer other features such as :

- [Leaderboards](https://docs.openformat.tech/api-reference/endpoint/leaderboard/get-leaderboard)
- [Badges](https://docs.openformat.tech/sdks/typescript/create-badge) (NFTs)

## Next Steps

Now that you’ve explored the **Template**. Feel free to customise the quiz, add new routes, and explore the integration of rewards with **OpenFormat**.

If you’re ready to go further, check out the [OpenFormat Documentation](https://docs.openformat.tech/) for more details on rewards, the [Frog Documentation](https://frog.fm) or [Farcaster Frames](https://docs.farcaster.xyz/) to learn more about how to build with Frames.