import { Button } from 'frog';

export const startPage = (c: any) => {

    return c.res({
        action: '/question/0',
        image: (
            <div style={backgroundStyle}>
                <div style={textStyle}>
                    {"Welcome to the Quiz!"}
                </div>
                <div style={textStyle}>
                    {"Click the button below to begin"}
                </div>
            </div>
        ),
        intents: [
            <Button>
                Start Quiz
            </Button>,
        ],
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
