const messages = [
    {
        text: `What inspired the idea for creating this piece?`,
        isRight: true
    },
    {
        text: `This piece came about really abruptly. I was struggling to keep up with school work and I just needed a project to put my full focus in. So, I just kinda started it, staying up till 4am for many nights just figuring things out. It was based off a prompt given by my creative writing professor about making a family tree; I remember thinking "that's a terrible quote what is this like 3rd grade?" I didn't want to make a family tree, I wanted to make something else. Something weird. `,
        isRight: false
    },
    {
        text: `What is the reasoning behind having the user input their phone number and email address?`,
        isRight: true
    },
    {
        text: `The idea of the piece sending the user texts and emails is fundamental to the entire project. I really wanted the user to have some strong connection to it, physically becoming a part of my life. I had seen pieces where there's like a digital inbox for users to look at "messages," but having poems and things come up right on your smartphone is such a cool thing, it's like I'm directly talking to you about my story. I use my phone every few minutes, and I wanted that direct social aspect. The layout of the homepage is a bit scary, it's a lot to ask for someone's personal details like that right off the bat. But that's how it is meeting a stranger; new people are scary. But without revealing something of yourself, can you ever actually know a person? Basically, you give me your number, and I'll tell you my story in the most personal, fucked up way.`,
        isRight: false
    },
    {
        text: `Why did you set up the layout of the piece as you did? `,
        isRight: true
    },
    {
        text: `I was thinking about this story about David Bowie; apparently when he wrote songs, he'd place papers and notes all around him on the floor, a total scattered mess. Then he'd sit right in the middle of it all and piece things together. I really like that mess, it's really representative of how people think, or at least I think. Thoughts are just everywhere, and they loom and stay and can be visited or ignored. Originally I wanted it all on one screen, but I organized it a little so it'd be easier to digest. It also goes to the scary nature of people again; there are mega personal imagery of love and laughter with this dense black background of nothingness, juxtaposing those two ideas, love and fear, I liked that. It felt right. While the font and colors are almost hauntingly empty, the actual text and imagery is flooded with love for everybody and everything.`,
        isRight: false
    },
    {
        text: `What insights do you hope viewers will gain from interacting with your piece?`,
        isRight: true
    },
    {
        text: `I'm not sure! Honestly, I wrote this piece for me. A cathartic organization of everything around me. I wanted to make something that absolutely gave no fucks about a potential audience, and this was the result. It's like publishing a diary. If viewers get something out of it, maybe a laugh or find a little moment of wonder, that's cool. If it inspires them to make weird shit, that's also cool! I guess the main thing is I hope others can find inspiration to be bolder with their stories. Some of my favorite art is excruciatingly personal, Mount Eerie's A Crow Looked at Me, Sun Kil Moon's Benji, it's ok to discuss specifics about mental illness and fear and everything. It's ok to make things for you.`,
        isRight: false
    },
    {
        text: `Who is your ideal audience for this piece?`,
        isRight: true
    },
    {
        text: `Me :)`,
        isRight: false
    },
    {
        text: `Who do you want to see this piece the most? Is there anyone you wouldn't want to see this?`,
        isRight: true
    },
    {
        text: `I was really excited for my brother to see it, but I don't think he likes it :( I think I'm cool with anybody seeing it, but time will tell. Whenever you release personal things like this it's usually up in the air. My TEDx talk was also super personal, and while some loved it, others couldn't believe I spoke about certain topics the way I did. My parents were kinda pissed, we still don't really talk about it. Tbh I'd be ok if they didn't see this piece, I don't think they'd like it or get it. It's hard! People are weird!`,
        isRight: false
    },
    {
        text: `What do you think the people featured in this piece think about how you've represented them?`,
        isRight: true
    },
    {
        text: `Most of them were through the moon about being involved. I remember Tom clicked through his little page, he didn't say much, just stared and read and sniffled a bit. I was lucky in that way, they all understand what I'm saying and that I mean it all with maximum love. It's probably pretty weird to see it from their perspective, I'm sure some of these people have forgotten about me already. That's another reason why the piece is focused on memory and people; I don't want to forget it all.`,
        isRight: false
    },
    {
        text: `In creating this piece, have your views on any of your relationships with these people changed?`,
        isRight: true
    },
    {
        text: `Hmmmm that's a hard question. I think when creating the piece I knew that all of these are just memories; whether I like them or not can't change that. But after getting it all out, especially the tiny details like how Sam's part is an email subscriber thing and like Tom's page is inspired from those weird image messages from Super Mario Odyssey, I like it all a bit more. On the bright side I talk to them all a little more, I know they all like me (at least a bit haha)`,
        isRight: false
    },
    {
        text: `If you had the time, is there anything else you would add to this piece that you didn't get a chance to?`,
        isRight: true
    },
    {
        text: `There's actually a ton of stuff I never got around to adding; more people and memories and a better UI. A lot of it's still in the html code, just commented out. I don't think I'll finish it though, I like that it's just how it is now, makes it feel more scattered. Developing the piece has itself become a memory for me, why I stopped, those sleepless nights of hot pockets and monster, I like that.`,
        isRight: false
    },
    {
        text: `What have you learned from the process of creating this piece?`,
        isRight: true
    },
    {
        text: `That programming in general is just a whole world of complications, like removing a commit from github is unnecessarily painful. Mostly I learned that if I want to make things I like, I have to do it on my own. There's no assignment prompt or scoresheet for this kind of stuff, classes don't teach you how to make cool things, just how to make things others have already done. This is true in all my fields, in my music the Music Theory classes I took were beneficial, but I can't make something I love just based on that knowledge. I have to do my own thing, otherwise I won't make anything cool.`,
        isRight: false
    },
    {
        text: `What technical difficulties did you encounter in coding this? Were there any issues with sending text messages in particular?`,
        isRight: true
    },
    {
        text: `The code's a total mess because I'm a terrible coder :) The GitHub's also filled with my rants in the commit messages about how it's all shitty. The texts and emails were pretty tough to get right, and it's still not perfect, but it works. The mentality of just trying things out and scouring through stack overflow became a part of the process. But that feeling of "holy shit it works," that's an amazing moment. My main issues were debugging everything; especially for the php stuff I had to move it to the slow rit server and wait for it all to update just to see if it sent anything. Like I said, programming is a world of complications. I'm not that great at it, I don't think I'll ever get better either, but I like this piece and I'm happy it exists`,
        isRight: false
    }
];

const emojis = [
    `😀`,
    `😁`,
    `😂`,
    `🤣`,
    `😃`,
    `😄`,
    `😅`,
    `😆`,
    `😉`,
    `😊`,
    `😋`,
    `😎`,
    `😍`,
    `😘`,
    `😗`,
    `😙`,
    `😚`,
    `🙂`,
    `🤗`,
    `🤩`,
    `🤔`,
    `🤨`,
    `😐`,
    `😑`,
    `😶`,
    `🙄`,
    `😏`,
    `😣`,
    `😥`,
    `😮`,
    `🤐`,
    `😯`,
    `😪`,
    `😫`,
    `😴`,
    `😌`,
    `😛`,
    `😜`,
    `😝`,
    `🤤`,
    `😒`,
    `😓`,
    `😔`,
    `😕`,
    `🙃`,
    `🤑`,
    `😲`,
    `☹️`,
    `🙁`,
    `😖`,
    `😞`,
    `😟`,
    `😤`,
    `😢`,
    `😭`,
    `😦`,
    `😧`,
    `😨`,
    `😩`,
    `🤯`,
    `😬`,
    `😰`,
    `😱`,
    `😳`,
    `🤪`,
    `😵`,
    `😡`,
    `😠`,
    `🤬`,
    `😷`,
    `🤒`,
    `🤕`,
    `🤢`,
    `🤮`,
    `🤧`,
    `😇`,
    `🤠`,
    `🤡`,
    `🤥`,
    `🤫`,
    `🤭`,
    `🧐`,
    `🤓`,
    `😈`,
    `👿`,
    `👹`,
    `👺`,
    `💀`,
    `👻`,
    `👽`,
    `🤖`,
]