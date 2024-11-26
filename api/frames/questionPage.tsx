import { Button } from 'frog';
import { questions } from '../../data/questions.js'; // Import questions

let score = 0;

export const questionPage = (c: any) => {

    const currentQuestion = parseInt(c.req.param('current') || '0', 10);

    if (currentQuestion === 0) {
        score = 0
    }

    // Handle answer selection if a button value exists
    if (c.buttonValue !== undefined) {
        const selectedAnswerIndex = parseInt(c.buttonValue, 10);
        const isCorrect = selectedAnswerIndex === questions[currentQuestion].correctAnswer;

        if (isCorrect) {
            score++; // Increment score for correct answers
        }

        const nextQuestion = currentQuestion + 1;

        // Redirect to results if the quiz is over
        if (nextQuestion >= questions.length) {
            return c.res({
                action: `/result/${score}`, // Pass the final score
                image: (
                    <div style={backgroundStyle}>
                        <div style={textStyle}>Quiz finished!</div>
                    </div>
                ),
                intents: [<Button>Check your results</Button>]
            });
        }

        return c.res({
            action: `/question/${nextQuestion}`, // Advance to the next question
            image: (
                <div style={backgroundStyle}>
                    <div style={textStyle}>{isCorrect.toString()}</div>
                </div>),
            intents: [<Button>Next Question</Button>]
        });
    }

    const questionData = questions[currentQuestion];

    return c.res({
        image: (
            <div style={backgroundStyle}>
                <h2 style={textStyle}>{questionData.question}</h2>
                <ul style={answerListStyle}>
                    {questionData.answers.map((option, index) => (
                        <li key={index}>
                            {String.fromCharCode(65 + index)}: {option}
                        </li>
                    ))}
                </ul>
            </div>
        ),
        intents: questionData.answers.map((_, index) => (
            <Button key={index} value={index.toString()}>
                {String.fromCharCode(65 + index)}
            </Button>
        )),
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

const answerListStyle = {
    display: 'flex',
    flexDirection: 'column',
    listStyleType: 'none',
    padding: 0,
    marginTop: '10px',
    color: "white",
    fontSize: 40,
    fontStyle: "normal",
    whiteSpace: "pre-wrap",
};

const textStyle = {
    color: "white",
    fontSize: 40,
    fontStyle: "normal",
    whiteSpace: "pre-wrap",
    display: "flex",
}