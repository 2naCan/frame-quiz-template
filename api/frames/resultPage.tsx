import { Button } from 'frog';
import {rewardUser} from "../rewardUser.js";

export const resultPage = (c: any) => {
    const score = c.req.param('score') || '0';
    const {displayName, custodyAddress} = c.var.interactor || {} // User information obtained from Neynar

    if ( score > 0 ){
        rewardUser(custodyAddress, score.toString());
    }

    return c.res({
        image: (
            <div style={backgroundStyle}>
                <h1 style={textStyle}>Congratulations, {displayName}!</h1>
                <p style={textStyle}>Your Score: {score}</p>
                <p style={textStyle}>You have been awarded {score} xp to your Farcaster wallet</p>
            </div>
        ),
        intents: [
            <Button value="restart">Restart Quiz</Button>, // Button to restart
        ],
        action: '/', // Redirect to start page on restart
    });
};

const backgroundStyle = {
    alignItems: "center",
    background: "black",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    height: "100%",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
}

const textStyle = {
    color: "white",
    fontSize: 60,
    fontStyle: "normal",
    whiteSpace: "pre-wrap",
    display: "flex",
}
