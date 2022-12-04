const _getRandomMessage = (messages) => messages[Math.floor(Math.random() * messages.length)];

const getMessage = (messages) => {
    return _getRandomMessage(messages);
};

const moreThanOneMinuteRule = (duration) => {
    const messages = [
        "You've been sh**** for a minute!",
        "Makin dolla dolla bill yooo!",
        "Employee of the year award goes to ...",
    ];

    if (duration.minutes >= 1) {
        return getMessage(messages);
    }

    return null;
};

const moreThanFiveDollarsRule = ({ hours, minutes }, moneyEarned) => {
    const messages = [
        "Bruh .. you're rich!",
        "5 bucks already? Damn son!",
    ];

    if (hours === 0) {
        messages.push(`You've been sh**** for ${minutes} minutes and made ${moneyEarned}! That\'s money in your pocket baby!`);
    }

    if (parseInt(moneyEarned) >= 5) {
        return getMessage(messages);
    }

    return null;
};

const moreThanTwoMinutesHavePassed = ({ hours, minutes, seconds }) => {
    const messages = [
        "You've been sh**** for more than 2 minutes!",
        "Time flies when you are sh****!",
        "You're a sh**** machine!",
    ];
    
    if (hours === 0 && (minutes > 2 || (minutes === 2 && seconds > 0))) {
        return getMessage(messages);
    }

    return null;
};

const moreThanOneDollarRule = (_, moneyEarned) => {
    const messages = [
        "You've made more than a dollar!",
    ];

    if (moneyEarned > 1) {
        return getMessage(messages);
    }

    return null;
};

const rules = [
    // Time rules
    moreThanOneMinuteRule,
    moreThanTwoMinutesHavePassed,
    // Money rules
    moreThanFiveDollarsRule,
    moreThanOneDollarRule,
];

let rulesToUse = [...rules];

export const combinator = ({ duration, moneyEarned }) => {
    const rulesToRemoveForNextIteration = [];

    const resultMessages = rulesToUse
        .map((rule, index) => {
            const messages = rule(duration, moneyEarned)
            
            if (messages && messages.length > 0) {
                rulesToRemoveForNextIteration.push(index);
            }

            return messages;
        })
        .filter(Boolean);
        
    rulesToUse = rulesToUse.filter((_, index) => !rulesToRemoveForNextIteration.includes(index));

    return resultMessages;
};