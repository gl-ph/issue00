"use strict";

// (prior to 5/21) Why am I bothering with this. There's more code in here than I've written in years, why? This is a school assignment, I could've passed in some shitty, boring bot, gotten an A, and moved on. According to report cards and GPAs, those people will be better than me, more creative. Fuck that. There's so much potential with this piece. And all it amounts to is a 60. This deserves so much more, even at this primitive stage. There's more creativity in the first function than there is in most of everybody else's projects. What's the point, for me? For art? For sanity? I just want my parents to be proud of me, for me to make something special, for something happy to happen. This piece is bullshit, because none of that is possible. The kid next to me who made a shitty "poetry" bot will have an A and a pat on the back. I get a 60 and screams from my mom. This is why people drop out. This is why I should drop out. Create some shit cell phone app, make a fortnite YouTube channel, perform at random coffee shops for 50 an hour, DJ again. There's no point. I'm learning, but what the fuck does it amount to? A 2.6 gpa? Whatever man, whatever.

let version = document.querySelector("#beta");
version.innerHTML = "";

//Navigation
let upBut = document.querySelector("#up");
let downBut = document.querySelector("#down");
let leftBut = document.querySelector("#left");
let rightBut = document.querySelector("#right");
let buttonArray = [upBut, downBut, leftBut, rightBut];
let posEnum =
{
  0:"people",
  1:"memories",
  2:"home",
  3:"influence",
  4:"drugs"
}
Object.freeze(posEnum);
let current = 3;

let pages = document.querySelectorAll(".page");
let members = document.querySelectorAll(".members");
let popup = document.querySelector("#mePop");
let popupContent = document.querySelector("#popup-content");
let closeButt = document.querySelector(".close");
let media = document.querySelector("#music");
let mediaButton = document.querySelector("#play");
mediaButton.isPlaying = false;
let samBinary = 0;
let egg = 0;

//PHP Info, also delete personal info once the window is closed
let phoneNumber = localStorage.getItem("bvd5889-number");
let email = localStorage.getItem("bvd5889-email");
let phoneCarrier = localStorage.getItem("bvd5889-carrier");
window.onbeforeunload = (e) =>
{
  // localStorage.removeItem("bvd5889-number");
  // localStorage.removeItem("bvd5889-email");
  // localStorage.removeItem("bvd5889-carrier");
}

let drugsCount = 0;
let allCount = 0;

let isPopped = false;

//This variable is so fucking extra it pisses me off. She gets a whole variable. A whole boolean. She doesn't deserve that. God she's excessive. Blown up. Larger than life. Extravagant. I miss her. I hope I get to make more variables for people closer to me than her.
let isSam = false;

let carrierAddrs =
{
  "att":"@txt.att.net",
  "nextel":"@messaging.nextel.com",
  "sprint":"@messaging.sprintpcs.com",
  "tmobile":"@tmomail.net",
  "verizon":"@vtext.com",
  "virgin":"@vmobl.com"
}

//Lexia
let allLexia =
{
  "me":"<button class='lexButt emailSend' id='meButton'>tell me</button>",

  "me2":"",

  "me3":"",

  "me4":"",

  "tom":"i made you a web page because i don't call you enough.<br><br><br><button class='lexButt' id='tomButton'>i like web pages</button>",

  "sammy":"<p>Follow Sam on Instagram!   <a href='https://instagram.com/sammyvlol' target='_blank'><img src='emails/sam/images/instagram.png'></a></p><p>Add Sam on Snapchat!   <a href='https://www.snapchat.com/add/sammyviamonte'  target='_blank'><img src='emails/sam/images/snapchat.png'></a></p><p>Watch Sam on YouTube!   <a href='https://www.youtube.com/channel/UCopwzVPHG0nGX6lt17HKabA'  target='_blank'><img src='emails/sam/images/youtube.png'></a></p><p>follow sam on twitter   <a href='https://twitter.com/LoveStoriesEtc'  target='_blank'><img src='emails/sam/images/twitter.png'></a></p><br><p>Subscribe to Sam's Mailing List!   <button class='lexButt emailSend' id='sammyButt'>Click Me!</button></p>",

  "kuhu":"<p id='kuhuPoem'>so won't you forgive me<br><br>won't you let us be<br><br>we could<br><br>fly kites catch butterflies<br><br>hop on playgrounds and watch the clouds oh<br><br>it just gets hard<br><br>and i freak out<br><br>because if i lose you<br><br>i know ill pout<br><br></p><button class='lexButt emailSend' id='kuhuButt'>lol maybe</button>",

  "sam":"<p id='binaryLex'>!!!...!!!</p><br><br><img src='media/other/down.png' class='binary' id='binaryButt1'><img src='media/other/down.png' class='binary' id='binaryButt2'><img src='media/other/down.png' class='binary' id='binaryButt3'><img src='media/other/down.png' class='binary' id='binaryButt4'><audio src='media/audio/coffeeRhythm.wav' class='binaryAudio' id='rhythm' autoplay loop></audio><audio src='media/audio/coffeeGuitars.wav' class='binaryAudio' id='guitars' autoplay loop></audio><audio src='media/audio/coffeeVox.wav' class='binaryAudio' id='vox' autoplay loop></audio><audio src='media/audio/coffeeExtra.wav' class='binaryAudio' id='extra' autoplay loop></audio><audio src='media/audio/snap.wav' id='easter'></audio>",

  "porn":"<p id='porn1'>Pornography (often abbreviated porn) is the portrayal of sexual subject matter for the exclusive purpose of sexual arousal. Pornography may be presented in a variety of media, including books, magazines, postcards, photographs, sculpture, drawing, painting, animation, sound recording, phone calls, writing, film, video, and video games. The term applies to the depiction of the act rather than the act itself, and so does not include live exhibitions like sex shows and striptease. The primary subjects of present-day pornographic depictions are pornographic models, who pose for still photographs, and pornographic actors or porn stars, who perform in pornographic films. If dramatic skills are not involved, a performer in a porn film may also be called a model.</p><br><button class='lexButt pornButtons' id='showPorn1'>show more</button><br><p id='porn2'>Various groups within society have considered depictions of a sexual nature immoral, addictive, and noxious, labeling them pornographic, and attempting to have them suppressed under obscenity and other laws, with varying degrees of success. Such works have also often been subject to censorship and other legal restraints to publication, display, or possession, leading in many cases to their loss. Such grounds, and even the definition of pornography, have differed in various historical, cultural, and national contexts.</p><br><button class='lexButt pornButtons' id='showPorn2'>show more</button><br><p id='porn3'>Irrespective of the legal or social view of pornography, it has been used in a number of contexts. It is used, for example, at fertility clinics to stimulate sperm donors. Some couples use pornography at times for variety and to create a sexual interest or as part of foreplay. There is also some evidence that pornography can be used to treat voyeurism.</p><br><button class='lexButt pornButtons' id='showPorn3'>show more</button>",

  "lsd":"<p>It was my idea, the second time anyways. The paranoia was immense, so was the ADHD. We flew. I communicated in tongue clicks and adjectives and Drake imitations. The Seer by Swans terrified me when I was 14, I blasted it into my neighbors' bathroom. I smoked a pack a day. Eating tobacco, coughing out pneumonia and sea salt. We recorded an album in 12 years. Moving vibraphones and capos. Sometimes I ate Doritos or pizza. One time, I watched a Stanley Kubrick movie and cried at the credits, that will never happen again.</p><button class='lexButt' id='lsdMusic'>listen to me</button>",

  "weed":"<p>its a comedown day</p><iframe src='media/other/weed.pdf#toolbar=0&navpanes=0&scrollbar=0'width='90%' height='90%' style='margin-left:50px'/>",

  "swings":"<p>We used to have tire swing rotation nicknames.</p><ol><li><p>The donut - One person, butt in the middle. The largest man (never girl, ew) pushes the tire forward, as far as possible. Knockback; on impact, quick circular motion. Fingers on, freefall. Around and around the bends again. I didn't need a cigarette to feel free, high, winded. Keep spinning, let the clouds roam. Don't kick the spinner, I did it once, he left the park early crying.</p></li><li><p>The washingmachine - Spin the chain, let it tangle, sprawled inside. Once at maximum mess,</p><ul><li><p>The donut - One person, butt in the middle. The largest man (never girl, ew) pushes the tire forward, as far as possible. Knockback; on impact, quick circular motion. Fingers on, freefall. Around and around weiss tear again. I didn't need a weed to feel free, high, gross. Keep spinning, let the kids roam. Don't kick the spinner, I did it once, he left the park early smiling.</p></li></ul></li><li><p>The swirly - Three or four, max weight. Pile on, legs outside backs sweaty against each shoulderblade. Once weighted,</p><ul><li><p>The washingmachine - Spin the chain, let it collide, fucked outside. Once at maximum peace,</p><ol><li><p>The donut - The largest girl (never guy, never) pushes the tire forward, as far as possible. Knockback; on impact, quick square motion. Nails on, freefall. Around and around deja vu again. I didn't need porn to feel good, low, great. Keep grinning, let the drugs roam. Don't kick the spinner, I did it once, he never left the park again.</p></li></ol></li></ul></li></ol><br><button class='lexButt emailSend' id='swingsButton'>can i try?</button>",

  "destroyer":"<iframe width='100%' height='90%' src='https://www.youtube.com/embed/5ctWlxPGTJ0?autoplay=1'></iframe>",

  "kanye":"<iframe width='100%' height='90%' src='https://www.youtube.com/embed/j-6bqG6S3xA?autoplay=1'></iframe>",

  "frank":"<iframe width='100%' height='90%' src='https://www.youtube.com/embed/vI8cDhfSiNE?autoplay=1'></iframe>",

  "radiohead":"<iframe width='100%' height='90%' src='https://www.youtube.com/embed/Xq_a8f24UJI?autoplay=1'></iframe>"
}

let samBinaryLex =
[
  "But why? he declared.",
  "with a scream and a cry",
  "as he called to the heavens",
  "oh why and oh why",
  "do i try, he declared",
  "when this life isn't fair",
  "and there's no one to trust",
  "and there's no one to care",
  "and he punched on the wheel!",
  "and he screeched in his seat!",
  "and he hammered his arms!",
  "and he pounded his feet!",
  "and he pummelled his head!",
  "and he projected his heart!",
  "and he wept with dismay!",
  "and i knew it was love."
]

let emailSenders =
{
  "me":"you@me.com <you@me.com>",
  "swings":"babysitting@kids.com <babysitting@kids.com>",
  "kanye":"kanyewest@pablo.com <kanyewest@pablo.com>",
  "destroyer":"merge@mergerecords.com <merge@mergerecords.com>",
  "showPorn3":"support@pornhub.com <support@pornhub.com>",
  "sammy":"doyou@remember.me <doyou@remember.me>",
  "kuhu":"stranger@withmysecrets.gov <stranger@withmysecrets.gov>"
}

let emailSubjects =
{
  "me":"a poem to get started",
  "swings":"that picture was my brother",
  "kanye":"sup man",
  "destroyer":"they led us on they said it would be yours tear down the borders, stop patrolling the shores, let us in",
  "showPorn3":"your pornhub premium membership has expired!!!??!!",
  "sammy":"Thank You For Subscribing! :*",
  "kuhu":"(no subject)"
}

let emailMessages =
{
  "me":"i can hear you\r\nwarmth\r\na campfire a coffee thermos\r\nthat bourbon on your grandpa\’s beard;\r\ni can hear you\r\n\r\nyour voice\r\n\t(i\’m not cold anymore)\r\nthat\’s irony, she said yesterday\r\ni hope i didn\’t scare you away\r\ni made you those corn muffins you like\r\n\r\nso it goes without saying:\r\nso i know that you\’re saying:\r\nso what?\r\ndid i stutter or did i leave?\r\n\r\nex-girlfriends experience new ecstasies\r\n\twithout me\r\nand i think that they\’re afraid of me\r\nthey have to be; they just have to be\r\n\r\nfly a paper kite into the fisherman\’s eye\r\nhigh and high the clouds beg so you rise\r\nand know that you are good enough\r\n\t(at least for a little while)",

  "swings":"i don't think i have any pictures from those days. if i did, i'd send them your way. it's weird how simple swings like that can have such an impact. maybe if i didn't get a washingmachine, i wouldn't smoke a pack a day. maybe if i didn't kick that guy, my ex would still be with me. i wouldn't be a pacifist. there was one time i got in a fight. i remember i beat up four middle schoolers, as a fifth grader that was huge. no one found out. maybe i'll tell you more later. they took down that tire swing, i checked on google maps. how can we get it back?",

  "kanye":"bro. bro! listen to the kids. first of all, thank you, taylor, for being so gracious and giving me this award this evening.	and i often think back to the first day i met you also. you know i think about when i'm in the grocery store with my daughter and i have a really great conversation about fresh juice... and at the end they say, 'oh, you're not that bad after all!' and like i think about it sometimes... it crosses my mind a little bit like when i go to a baseball game and 60,000 people boo me. crosses my mind a little bit.	and i think if i had to do it all over again what would i have done? would i have worn a leather shirt? would i have drank half a bottle of hennessy and gave the rest of it to the audience? ya'll know ya'll drank that bottle too! if i had a daughter at that time would i have went on stage and grabbed the mic from someone else's? you know, this arena tomorrow it's gonna be a completely different setup. some concert, something like that. the stage will be gone. after that night, the stage was gone, but the effect that it had on people remained. the... the problem was the contradiction. the contradiction is i do fight for artists, but in that fight i somehow was disrespectful to artists. i didn't know how to say the right thing, the perfect thing. i just ... i sat at the grammys and saw justin timberlake and cee-lo lose. gnarls barkley and the futurelove ... sexyback album ... and justin, i ain't trying to put you on blast, but i saw that man in tears, bro. you know, and i was thinking, like, 'he deserved to win album of the year!and this small box that we are as the entertainers of the evening ... how could you explain that? sometimes i feel like all this s--t they run about beef and all that? sometimes i feel like i died for the artist's opinion. for artists to be able to have an opinion after they were successful. i'm not no politician, bro!look at that. you know how many times mtv ran that footage again? 'cause it got them more ratings? you know how many times they announced taylor was going to give me the award 'cause it got them more ratings? listen to the kids, bro! i still don't understand awards shows. i don't understand how they get five people who worked their entire life ... sold records, sold concert tickets to come stand on the carpet and for the first time in they life be judged on the chopping block and have the opportunity to be considered a loser! i don't understand it, bruh!i don't understand when the biggest album, or the biggest video ... i've been conflicted, bro. i just wanted people to like me more. but f--k that, bro! 2015! i will die for the art! for what i believe in. and the art ain't always gonna be polite! ya'll might be thinking right now, 'did he smoke something before he came out here?' the answer is yes, i rolled up a little something. i knocked the edge off!i don't know what's gonna happen tonight, i don't know what's gonna happen tomorrow, bro. but all i can say to my artists, to my fellow artists: just worry how you feel at the time, man. just worry about how you feel and don't never ... you know what i'm saying? i'm confident. i believe in myself. we the millennials, bro. this is a new mentality. we're not gonna control our kids with brands. we not gonna teach low self-esteem and hate to our kids. we gonna teach our kids that they can be something. we gonna teach our kids that they can stand up for theyself! we gonna teach our kids to believe in themselves! if my grandfather was here right now he would not let me back down! i don't know i'm fittin' to lose after this. it don't matter though, cuz it ain't about me. it's about ideas, bro. new ideas. people with ideas. people who believe in truth. and yes, as you probably could have guessed by this moment, i have decided in 2020 to run for president.",

  "destroyer":"dear you,\r\n\r\nhe makes it seem easy doesn\’t it? like look at this\r\n\r\nhttps://brightestyoungthings.com/articles/destroyer-pornographer-bejar\r\n\r\nincredible. how do i get there, where i can light a cigarette or crack open a gennessee on stage in front of thousands, screaming about notorious lightning or whatever\’s gotten into sunny?\r\n\r\nlove, me",

  "showPorn3":"Alt porn features performers with tattoos, piercings, unusually coloured hair, unique haircuts or who have a goth, punk rock, hippie, raver, rockabilly/greaser, crusty, emo, scene, skater or stonerappearance. Many involved are members of the punk, goth, rave and even Kustom Kulture. Good examples of this are films directed by Bruce LaBruce, who is a punk himself and his work could also be seen as avant-garde cinema. Amateur pornography originally referred only to pornography produced by amateurs but now also includes professionally made pornography designed to appear as if it were amateur. Pro-am pornography is subgenre of amateur pornography that refers to professionally made porn that features amateur actors/actresses, often appearing for the first time in a pornographic film. Anal pornography features anal penetration with a penis, dildo, other objects, or some combination of them. Animal roleplay Arcane or occult pornography involves sexualized situations with an occult or magical tone or performers who costume themselves in keeping with the theme (for example, a male performer dressed as a wizard), it could feature sex magick rituals. There maybe an overlap with erotic horror or exploitation films. Armpits pornography is a partialism in which an individual is sexually attracted to women's underarms. It involves licking, kissing, tasting, tickling and smelling female armpits by male or female partner during foreplay or sex. Asian pornography features performers who are (or appear to be) Asian/Oriental or from the Far East such as Japan, China and Thailand. Much in domestic and exported to foreign markets. Ass to mouth (a.k.a. ATM or A2M) pornography shows the transfer of a performer's penis (or other object) from a second performer's anus to that same second performer's (or another performer's) mouth in a single shot. A variant of A2M is ATOM (ass to other mouth) where a performer inserts his penis directly from one recipient's anus into a second recipient's mouth. BDSM pornography depicts bondage and discipline, domination and submission, sadism and masochism. Babysitter pornography features usually teenage girls being exploited and having taboo sex with older, male employers. Bara male homosexual hentai designed to appeal to men. Bareback pornography features performers who are not wearing condoms. Bear features a combination of middle-aged, hairy or overweight males. Bestiality pornography involves the sexual attraction of humans to animals. Bestiality is illegal in many countries. The possession of this type of porn is illegal in many countries. Bi-racial pornography features a model who is biracial and not specifically racially defined. Big Beautiful Women (BBW), or chubby, plumper, fat pornography features thick overweight or obese women. Big breast pornography, also called ginormous tits, big-boob or big-bust pornography, features women with large breasts. Some viewers prefer performers with breast implants, others prefer women who have naturally large breasts. Big butt or Big ass pornography features women with large buttocks. This genre eroticizes the buttocks and anus, and it often overlaps with anal pornography. Big dick/cock pornography features men with macropenises. Bisexual pornography features women and men who all perform sex acts on each other. The pornography is geared towards men; hence the word bisexual refers to the men rather than the woman. Bondage pornography features performers tied up or constrained in various ways. Boot pornography includes women and sometimes men wearing boots for their sexual appeal. It is sometimes combined with BDSM features. Bukkake pornography involves a performer, usually female, onto whom several men or women (see Squirting) ejaculate, usually on the face. Bukkake pornography usually depicts numerous men having sex with one woman, with multiple, usually 10 or more, men ejaculating on the female or male's face. Especially popular in post-World War 2 Japanese culture. Cameltoe pornography involves women with a large or prominent labia or clitoris. Cartoon pornography depicts illustrated or animated fictional characters in erotic and sexual situations. Celebrity sex tapes are amateur or professionally made recordings of sex acts, as performed by a celebrity and their partner(s). These typically are leaked to the public via the Internet, with or without the celebrity's consent. A celebrity may allow such a recording to surface willingly, as part of a publicity stunt. Cheerleader pornography involves pictures of cheerleaders, both staged and real. Child pornography is commonly considered pornography involving children or teenagers who are under the age of consent for sexual relations (although in some countries such as the United Kingdom and United States the definition of child pornography includes subjects at or over the age of consent pretending to be younger). The United States considers any erotic entertainment with people under the age of 18 to be child pornography, even in states where the age of consent is considerably lower than 18 years old. Production, possession, and distribution of child pornography are illegal in many countries. In the countries where child pornography is illegal, simulated photographs (pseudo-photographs) or lifelike edited images representing child sex are often illegal as well. Classics (sometimes referred to as the Golden Age of Porn) are pornographic films from the 1970s and sometimes 1980s. Clothed female, naked male (abbreviated CFNM) pornography features naked men and clothed women; typically, the women humiliate and abuse the men or perform fellatio or handjobs on the men. The reverse of this, in which nude women interact with clothed men, is called Clothed male, naked female (abbreviated CMNF). Cock and ball torture (CBT) Compilations are a collection of pornographic scenes, usually themed to a particular fetish, taken from otherwise unrelated films. (For copyright reasons, compilations are often limited to clips from films published by a single company.) Creampie (also called internal ejaculation or internal cumshot) pornography features ejaculation inside the vagina (vaginal creampie), mouth (oral creampie) or rectum (anal creampie) instead of the common cum shot, followed by the visible seeping or dripping of semen from the vagina, mouth or anus. Crush pornography features objects being crushed by an actress or actor, who generally plays an overtly dominant role. Crying pornography that features participating actors crying. Cuckold fetish pornography that involves a cuckolded husband. Cum swapping (formally known as Snowballing) pornography involves performers trading semen between their mouths. Cum-shot pornography features a collection of male ejaculation scenes. Deep-throating features the recipient taking the penis through the mouth into the throat, either as fellatio or irrumatio. Diaper pornography involves performers wearing diapers, sometimes with an adult performer acting in the role of a caretaker. Double penetration (a.k.a. DP) pornography depicts simultaneous anal and vaginal penetration of one woman. Double Stuffed (a.k.a. DS), Double Vaginal (a.k.a. DV), or Double Anal (a.k.a. DAP) pornography involves the penetration of one orifice by two penises or other objects. Dwarfs or midget pornography features performers who are dwarfs/midgets. Ebony or black pornography features performers who are (or appear to be) black. They can be sub-divided into African pornography, African-American pornography or Caribbean pornography. Emetophilia pornography involving vomiting and gagging. Enema pornography involves adults given enemas to others, often fake. Real enema shots or videos of true medical situations may violate privacy laws in some countries. Erotic Preteen Video is non-pornographic (or simulated pornographic), live action, films consisting of models that are under the age of consent for actual pornography. Like adolescent and pre-teen pornography, it is not considered child pornography in countries where such films are legal to make or possess, and all parties involved gave consent. Erotic sexual denial European pornography involving performers who are (or appear to be) European with features from Western Europe or more commonly Eastern Europe. Exhibitionist pornography features performers, usually female exposing themselves in public and spans simple flashing to public sex. The Girls Gone Wild series is one example. Extreme pornography is a classification of adult pornography that was introduced in UK legislation in 2009. It covers a number of subgenres including necrophilia, bestiality, and some forms of violent pornography. It is illegal to possess extreme pornography in the UK. Facesitting when one partner sits on the other's face, usually for oral sex. Facial pornography involving male ejaculation onto a performer’s face. Felching involves drinking (via suction / soda straw) recently ejaculated semen from the vagina or anus. Femdom features BDSM scenes in which the dominant partner is female. Filage pornography involves filature, smoothing or any satisfaction with man/women's vulva. Fisting involves the insertion of one partner's entire hand (or, less often, both hands or even a foot) into a vagina or the anal cavity. Fisting pornography features the insertion of an entire hand into a performer's vagina or anus. A sub-set of vaginal fisting attempts to photograph the female cervix immediately after the fist (or large dildo or speculum) is removed from the now-gaping vagina. Foliage involves partner's masturbation (or further any manipulation) with semi-long or long female hair. Foot fetish pornography features heavy emphasis on the feet of the participants, either in combination with kissing and genital sex or in the context of acts such as trampling or crush fetishism. Full-feature pornographic films are typically longer in running time and usually have a plot. Futanari, Hentai females with a penis. Gang bang pornography usually depicts numerous men having sex with one woman, or one man. A scene where many women have sex with one man is referred to as a reverse gang-bang. Gaping in pornography refers to scenes of anal sex with a focus on the recipient's anus remaining open for a period of time after the erect penis or dildo is removed. A sub-set of gaping is the 'tunnel cumshot, wherein the male ejaculates directly into the gaping anus. Gay pornography is usually male homosexual pornography, acts depicted typically include anal or oral sex. Men who perform in mainstream gay pornography often do not consider themselves gay or bisexual. See Gay-for-pay. Gloryhole pornography features women performing fellatio or other sexual acts on unidentified men through a small hole made in a bathroom divider. This genre also features male-on-male fellatio through a small hole made in a bathroom divider. Gokkun Gonzo pornography involves a first-person cameraman/performer perspective. Also see POV. Group sex pornography (including sex parties such as an Orgy or a swinger party) features at least two men and two women (foursome or 4some), usually more, who all perform sex acts on each other. Guro or Gore is a genre of Japanese pornography involving blood, gore, disfiguration, violence, mutilation, urine, enemas, or feces. Hair cutting Hair jobs Hentai is the various forms of Japanese pornography, including H-manga, H-anime, and H-computer games. The term hentai is never used in this context in Japanese. The meaning of hentaiis perversion, abnormality, or metamorphosis. Yaoi is anime or manga that features gay males (although not necessarily pornographic). Yuri is the lesbian equivalent. Hermaphrodite, also known as herm, refers to pornography, typically hentai, that features persons with the genitalia of both sexes. The most common depiction of a hermaphrodite is a person with a female face, breasts, and build, and a penis (see also futanari), although there are other combinations. This type of pornography is almost exclusively hentai, as true hermaphroditic humans are not fertile and are not usually found in nature. Is also common of the furry genre. Heterosexual or traditional porn accounts for the majority of produced film and video content in the industry. Hidden Camera pornography involves shots that appear to spy or peep on a woman who is unaware she is being viewed or filmed while dressing, going to the bathroom, or showering; either at home or in a commercial place, such as a locker room, public restroom, spa (including spa treatments such as spraying, scrubbing, bikini waxes or Brazilian bikini waxes, and endermologie (also known as lipomassage or cellulite treatment)), or dressing room. Actual spying may violate privacy or trespassing laws in many countries. Voyeur or peeping Tom pornography is usually more staged with the subjects aware of the cameras, sometimes openly including this exhibitionist awareness. Voyeur pornography may also include shots of topless women on topless beaches who are unaware of the cameras but may legally be photographed due to the public setting. High heel pornography involves women or men dressed in high heeled shoes. Incest pornography features sex between actors who portray a familial relationship. Incest itself is largely taboo, and is a crime in many countries. The viewing of this porn is illegal in many countries. Independent pornography is pornography produced by filmmakers unconnected to the major porn studios in a given country. It is often mislabelled amateur pornography, though the producers and actors are often professional pornographic filmmakers and actors. (It is not always easy to distinguish between genuine amateurs and unknown professionals: often, the distinction is a matter of timing.) Insertion in pornography features performers inserting various odd objects into their anus or vaginas. Interactive pornography, available in CD-ROM and DVD format, allows the viewer to select the particular acts performed at any one time, sometimes with the camera providing a first person view. Interracial pornography features sex between people of different racial backgrounds. Jail/Prison/Police pornography involves people in police custody or inmates in jails or prisons in various sexual situations, such as strip searches or body cavity searches. These are often fake. Real jail or prison or police station shots or videos may violate laws in some countries. Japanese adult video or JAV is pornography produced in Japan for domestic consumption, though it has a large international audience as well. JAV has a number of features that place it in a unique genre when compared to pornography produced in other countries. Notably, because of Japanese obscenity laws, most Japanese pornography videos and photographs include a mosaic that blocks the view of the performers' genitalia. Uncensored JAV is also produced, though illegally. JAV has a diverse array of subgenres, many of which are the same as the subgenres in general pornography; however, there are also fetish and costume genres that are largely unique to the JAV milieu. Japanese rope bondage is distinguished by its use of specific katas (forms) and aesthetic rules. Sometimes, asymmetric and often intentionally uncomfortable positions are employed to heighten the psychological impact of the bondage. Jerk off instruction (also known as Jerk off Encouragement (JOI / JOE)) features a performer encouraging or instructing the viewer to masturbate, often culminating in a countdown at the end of which the viewer is invited to induce orgasm. Latina/Latin pornography features performers who are (or appear to be) from Latin America or Latin Europe which includes South America, notably Mexico, Cuba. Most are of Spanish, Portuguese, Italian, Native American or Mestiza descent. Leg and feet pornography has an extreme emphasis on legs and feet. See: Other fetish section below Lesbian or girl-girl pornography features women engaged in sex together, but is typically aimed at a male audience. Women who perform in lesbian pornography often do not consider themselves lesbian or bisexual. See also Gay-for-pay. Lesbian pornography made for women is usually made by women, and usually features women who identify as lesbian or bisexual. Lesbian pornography typically features a wider range of appearances and body types than is typical of mainstream pornography. Particularly, some pornography in this genre features butch women, who are almost never seen in mainstream pornography. Lingo (lat.) pornography involving licking ears, lips, girl's vulva, or any other use of tongue. Lolicon pornography is hentai illustrations or animation featuring young, female, childlike characters. Shotacon is the male equivalent of Lolicon, featuring young, male, childlike characters. Lolita pornography (also known as lollipop) features women who are 18 years old or slightly older, who pretend to be underage teen girls. The fetish centers around this fantasy portrayal. Lolita pornography that features actual teenage girls under the age of 18 is illegal in most countries and treated as child or youth pornography. Lolita pornography caters to ephebophiles. The name was coined from the title of the controversial book. The viewing of this porn is illegal in many countries whether or not the actors involved are 18 years or older; if they are pretending to be under 18 years old it is illegal to view this porn. Long head hair MILF (Moms I'd Like to Fuck) features women, generally of age 25 to late thirties, in fantasy scenarios with younger men. Few are literally mothers. Mature pornography features performers aged 40 and over, with visible signs of aging such as skin damage. Once a performer is moved to this category, she becomes considerably less saleable. Medical pornography (often called Doctor or Nurse and Patient pornography) involves sexualized medical, often fake, including gynecological pelvic examinations, rectal examinations, and pelvic or gynecological ultrasounds. Real medical shots or videos may violate privacy laws in some countries. Menstrual or red rhapsody pornography features sexual activities involving women who are menstruating, with a focus on the menstrual blood. Middle Eastern pornography features performers who are (or appear to be) from the Middle East. There is certainly an overlap with Arab pornography involving performers who are (or appear to be) Arabsfrom the Middle East or North Africa, and with Indian pornography. Milking pornography features lactating women being milked or milking themselves (not to be confused with milk enemas). Oral sex pornography frequently features a person performing fellatio, or in wider sense lingo (using tongue for any part of body) and less frequently cunnilingus. POV (Point-of-View) pornography involves camera angles designed to provide the viewer a view similar to that seen by one of the participants, whose face is never shown. Pantyhose/Tights/Stockings pornography involves women or men dressed in pantyhose, tights, or stockings. Papilophilia (Nipples/areola fetish). Papilophilia is trilled with nipples' areola fetish. Parody Porn is a subgenre that parodies mainstream film or television show using sexual puns. Pegging is a recently invented word which features a woman penetrating a man with a strap-on dildo. Pornography features an increasing variety of combinations of actors by their sexual orientation such as lesbian, gay and bisexuals in addition to traditional heterosexual roles. Preggo pornography features pregnant performers and may include erotic lactation as a fetish. Pubic hair Rape pornography features performers simulating rape. Rape itself is a crime in many countries. Reality pornography refers to real or faked 'amateur' encounters. This category also includes pornographic home movies. Related genres include: Revenge porn and hacked or leaked porn features sexually explicit images or video that is distributed without the consent of the subject. If the subject willingly gave the person distributing the material permission to possess, but not distribute the material, it is referred to as revenge porn. Hacked or leaked porn refers to material that the subject knows exists (i.e. for private use or for a significant other), but was obtained through hacking into a person's cloud storage or other such account and distributed without their permission. Rimjob pornography centering around analingus. Rough sex pornography is similar to pornography featuring sadomasochism, and typically features a Top who humiliates or degrades a Bottom while being physically violent towards them. Typically featured are hitting, choking, name-calling and hair-pulling. Many of these activities might be based on rape. Rubber pornography involves rubber, latex, and similar materials. Saliva pornography involves salivation and saliva. Scat or brown pornography features defecation, manipulation of feces, or consumption of feces, in reality or fantasy; a well-known example is the 2 Girls 1 Cup video. Small breast pornography, also called tiny tits, small tits, or titless pornography, features women with small breasts. Smoking fetish involves performers smoking cigarettes, cigars, joints, or blunts. Snuff pornography involves the actual death of any of the participants, consenting or otherwise, simulated death is not considered snuff. The existence of such content in commercially available pornography is widely considered an urban legend. In some areas, there are laws stating it is not legally possible to consent to be killed, and elsewhere it may still be legally dubious (see Armin Meiwes). The 1979 U.S. drama Hardcore showed this kind of film on its film. The viewing of this porn is illegal in many countries. Solo pornography features performers masturbating. Can also include auto-fellatio, or performing oral sex on oneself. Sonophilia pornography involving excitement with sexual sounds, hum, clamour, scream, orgasmic singing. Spanking or whipping pornography involves spanking or whipping, generally of the buttocks, with the hand or with other objects such as belts, switches, paddles, brushes, or whips. Squirt pornography involves women ejaculating. Stocks features performers restrained in stocks. It is commonly used in foot fetish pornography, where a performer has their feet cast in stocks as their feet are being licked or tickled by another performer. Teacher and Student or Boss and Secretary pornography involves sexualized situations which take place between an authority figure, such as a teacher or boss, and an underling, such as a student or secretary, often fake. Real school shots or videos which are sexualized may violate privacy laws in some countries. Teen pornography, sometimes referred to as Barely Legal, features young actors depicted as being aged 18 or 19. Eighteen years old is the youngest age to lawfully perform in sexually explicit films in many countries, but actresses might be in the twenties. Tentacle erotica features tentacled creatures (usually fictional monsters) raping or otherwise penetrating women or men. Threesome or 3some pornography features one man and two women (MFF). It is geared towards heterosexual men, who most typically define a threesome as such. A threesome is also depicted with one woman and two men (MFM) who all perform sex acts on each other (but not male on male). (MMF) is depicted with two men and one woman who all perform sex acts on each other (including male on male) considered a bisexual threesome (see Bisexual). Tickling involves performers tied up or constrained and being tickled. Toucher/Touche pornography involves touching partner's skin with progressive excitement. Transsexual pornography features transwomen performers, who were born male and who medically transitioned to female. They are most often featured with male partners, but are also featured with other transsexuals/transgender or cisgender women. Common phrases used to refer to these individuals are derogatory terms such as chicks with dicks, shemale or tranny, although these are considered pejorative among transwomen. Transsexual porn star Wendy Williams has stated that transsexual Porn is classified as Straight Specialty. can also feature *Transmanpornography which features performers who were assigned female at birth and who medically transitioned to male. Buck Angel is the best-known actor in this genre. Transvestite pornography features performers who cross-dress for sexual gratification, either for themselves or for their partners. Many men who like trans partners of any variety, known as tranny chasers, don't necessarily identify as gay themselves. This is why video stores might consider stocking transvestite subject matter in the straight section, as some straight men will have passive or active sex with another man as long as their partner appears to look like a woman to them, to some minor or major degree. Twink pornography features younger performers, and usually features young men under 30 who identify as gay or bisexual. Performers are usually clean-shaven, thinner and more effeminate than ones in mainstream gay pornography. Upskirt and Downblouse pornography features staged filming up women's skirts or down their blouses while in public. Actual upskirt or downblouse shots may violate privacy laws in some countries. Vintage erotica is generally pre-1970s pornography, especially early-20th-century black-and-white photographs and stag films. Virtual Reality Pornography provides an interactive digitally-generated immersive erotic experience, often side-by-side stereoscopic content shown from a participants point-of-view (POV). Watersports pornography features sexual activities involving urine, such as golden showers. Wetlook pornography involves clothed wet persons. Women's Pornography sometimes referred to as Pro-Sex, Sex Positive Pornography, or Feminist Pornography - refers to a category of porn that is expressly produced for female customers, taking into account that male and female receptive and aesthetic needs may differ widely. Sometimes that involves that the director or producer are women. Frequently, there is a focus on certain dos and don'ts for the production process (behind the scenes and on-screen) and the actions portrayed. Yaoi male homosexual hentai designed to appeal to women and men. Yiff or Yiffy pornography features Furry or anthropomorphic animals in an erotic or sexual context. Yuri female homosexual hentai.",

  "sammy":"sammy",

  "kuhu":"Hey Cocoa Puffs,\r\n\r\nMrs. M told me to write an email, so I\’m giving it a shot. Honestly, I\’m not ok right now, but Mrs. M also told me to breathe, and I think it\’s working. I hope you\'re ok, but I know you\’re not. Over the past few weeks, I haven\’t been feeling good. You\’ve been avoiding me and trying to let me go. But even though I finally said those words, I didn\’t mean them. It was my only way of getting your attention away from R. You told me that I do this to you all the time, but I don\’t feel like I have. I\’ve never responded to or delivered messages from another girl whom I\’ve never met. I\’ve never received bikini pics from any girl, even accidentally. I\’ve never spent more than 5 hours in total with any other girl. I\’ve never posted on social media showcasing any other girl. I\’ve never ditched you for any other girl, and I\’ve always called and told you about whatever event before. I\’ve never hung out with a girl at night. I\’ve never gone to a party with a girl. I’ve never made you feel inferior or in competition with anyone, and I\’ve told you countless times that I value you over anyone. I ensured you felt wanted, and I always put you first. But lately I\’ve been feeling horrible. I understand that I\’m not there at UMass with you. But you’re not at RIT with me either, and I make sure you don’t feel bad about that.\r\n\r\nWhen you told me I couldn\’t come on Friday, I panicked. I flashed forward and realized that I can never visit you on campus, or go to parties with you or anything. You\’ve said so many hurtful things to me, like how you only wear your ring because it looks nice. Even on my birthday you didn’t want to talk. Today you told me I won another of those little bets you always do by picking up, but by telling me not to come Friday, you lost one of mine. Today I told you outright, straightforwardly that Rish makes me really uncomfortable, and the amount of time you spend with him makes me feel insecure and unwanted. But you got offended, and acted as if my feelings are irrelevant. Then you avoided me, when all I wanted to do was talk about literally anything. I can\’t control my feelings, and the entire root cause is that I just don\’t want to lose you.\r\n\r\nI don\’t know if you’re still reading this. Probably not. I\’m to blame for this too. I was too needy and clingy. Now you\’re not talking to me, and that record streak we have on Snapchat will have to fade I guess. We both knew this long distance relationship was going to be difficult; I guess we just miscalculated how much. I tried to fight to keep you, but it wasn\’t my fight.\r\n\r\nI still love you. I still remember everything we\’ve been through and everything we\’ve done. I still remember you bursting into tears after finding dory, and using Sidd and TDevs to prompose to me in front of dozens, and doing the cupcakes puzzle with you, and watching friends, and holding hands through Boston with you, and going to Barnes and the mall and Roby Park and the cops and late night phone calls and oth and my sunglasses on you and meeting your little sister and being your everything. I don’t want to lose you, I\’m just afraid I already did weeks ago. This can be the last message you ever see from me if you want. I didn\’t mean to break up with you, but if you prefer, we can stay apart. I want to fix things, and keep trying. But if you don\’t, just know that I\’m happy. It\’s a choice, remember?\r\n\r\nDon\’t let the bed bugs bite.\r\nBran Flakes"
}

let textSenders =
{
  "showPorn3":"support@pornhub.com",
  "tom":"tom@magdi.net",
  "kuhu":"istillknow@yournumber.byheart"
}

let textMessages =
{
  "showPorn3":"stop it, youre better than this. you have a girlfriend, masturbate to her. you havent been to church in a long time. remember when in middle school, you confessed you masturbate to that priest. he had a gold necklace on, white socks and loafers. clean shaven, bald. he mentioned corinthians 6:18, you never looked it up.",

  "tom":"hey i thought id reach out since its been so long. what have you been up to? man wpi's great, living at this house with all these people, feels like more of a family than my own. i heard you started a record label? and gave a tedx talk? damn man, why don't you keep in touch with me more? why didn't you hang out with me more, in high school? why did you start rumors about my ex? why haven't you paid me back for that weed? why am i on your speed dial? who the fuck uses speed dial? text me bruh",

  "kuhu":"https://vsco.co/ifyouseethiscallme"
}

/*
         _   _
     \|/(_)_(_)\|/
      @~ (o.o) ~@
     /___( * )___\   NA NA
        / `U' \      NANA
       (   .   )      NA !!!
        `>---<'
        _\   /_

*/

for(var x = 0; x < members.length; x++)
{
  members[x].addEventListener("click", showPop);
  members[x].isVisited = false;
  members[x].borderColor = "white";
}

popup.addEventListener("click", showPop);
closeButt.addEventListener("click", showPop);

mediaButton.addEventListener("click", soundToggle);

for(let i = 0; i < buttonArray.length; i++)
{
  buttonArray[i].addEventListener("click", move);
  buttonArray[i].addEventListener("click", updateArea);
}

function showPop()
{
  if(!isPopped)
  {
    if(event.target != closeButt || event.target == popup)
    {
      popup.style.display = "block";
      isPopped = true;
    }

    if(this.className == "members")
    {
      popupContent.innerHTML = allLexia[this.id];
      if(this.isVisited == false)
      {
        this.style.border = "5px solid gold";
        this.isVisited = true;
        allCount++;
      }

      if(this.id == "sammy")
      {
        popupContent.style.textAlign = "center";
        popupContent.style.backgroundColor = "pink";
        popupContent.style.color = "black";
        popupContent.style.fontSize = "30px";
        popupContent.style.fontFamily = "Arial"
        popupContent.style.border = "10px ridge gold";
        isSam = true;
      }

      setButtons(this.id);
    }
  }
  else
  {
    if(event.target == popup || event.target == closeButt)
    {
      if(isSam == true)
      {
        popupContent.style.textAlign = "left";
        popupContent.style.backgroundColor = "#373737";
        popupContent.style.color = "white";
        popupContent.style.fontSize = "16px";
        popupContent.style.fontFamily = "'Inconsolata', courier, monospace";
        popupContent.style.border = "5px solid rgb(113, 113, 113)";
      }

      popup.style.display = "none";
      isPopped = false;
      popupContent.innerHTML = "";
      return;
    }
  }
}

function clearScreen()
{
  for(let i = 0; i < pages.length; i++)
  {
    pages[i].style.display = "none";
  }

  tooManyDrugs();
  findYourself();
}

function updateArea()
{
  clearScreen();

  if(current == 1)
  {
    upBut.style.display = "none";
    downBut.style.display = "flex";
    leftBut.style.display = "none";
    rightBut.style.display = "none";
  }

  if(current == 5)
  {
    upBut.style.display = "flex";
    downBut.style.display = "none";
    leftBut.style.display = "none";
    rightBut.style.display = "none";
  }

  if(current == 3)
  {
    upBut.style.display = "flex";
    downBut.style.display = "flex";
    leftBut.style.display = "flex";
    rightBut.style.display = "flex";
  }

  if(current == 4)
  {
    upBut.style.display = "none";
    downBut.style.display = "none";
    leftBut.style.display = "flex";
    rightBut.style.display = "none";
  }

  if(current == 2)
  {
    upBut.style.display = "none";
    downBut.style.display = "none";
    leftBut.style.display = "none";
    rightBut.style.display = "flex";
  }

  pages[current - 1].style.display = "flex";
}

function move()
{
  if(this.id == "up")
  {
    current -= 2;
  }

  if(this.id == "down")
  {
    current += 2;
  }

  if(this.id == "left")
  {
    current--;
  }

  if(this.id == "right")
  {
    current++;
  }
}

function setButtons(id)
{
  if(id == "tom")
  {
    let tomButton = document.querySelector("#tomButton");
    tomButton.onclick = (e) =>
    {
      media.src = "media/audio/knows.mp3";
      soundToggle();
      window.open("toms page");
    }

    sendText(phoneNumber, phoneCarrier, textSenders[id], textMessages[id]);
  }

  if(id == "sammy")
  {
    //lol sam's butt. She bragged about that a lot. I did too. I was really attracted to it, still am. I masturbate to it sometimes, and I feel really ashamed afterwards. She doesn't want anything to do with me anymore. She'll be a few variables in here though, I don't know if she'll like the way she's portrayed in this anyways. Advertising. Social media. Modeling. But that's what she is that's what she represents. Making art is difficult, but if I don't talk about this life, I've got nothing worth talking about.

    //It's almost two months since I implemented the sam popup thing and I realized that this shitty boolean and popupContent style thing can all be done in the css file. This is incredibly unnecessary. Why the fuck did I do this? I don't even want to change it, fuck you Sam. You're so extra. Maybe part of me wanted to work super hard to get your thing working, maybe I was just being really stupid in the moment rushing through because I hate seeing your face and your media accounts. Fuck. I'll keep it. I even call her sammy to distance myself... I never called her sammy.

    let samButt = document.querySelector("#sammyButt");
    sammyButt.onclick = (e) =>
    {
      sendEmail(email, emailSenders[id], emailSubjects[id], emailMessages[id]);
      window.open("media/videos/sam.mp4", '_blank');

      popupContent.style.backgroundColor = "rgb(49, 163, 195)";
      popupContent.innerHTML = "Thank you so much! 💖💖💖"
    }
  }

  if(id == "kuhu")
  {
    let kuhuButt = document.querySelector("#kuhuButt");
    let poem = document.querySelector("#kuhuPoem");
    kuhuButt.onclick = (e) =>
    {
      sendEmail(email, emailSenders[id], emailSubjects[id], emailMessages[id]);
      sendText(phoneNumber, phoneCarrier, textSenders[id], textMessages[id]);
      kuhuButt.style.display = "none";
      poem.innerHTML = "& it's crazy because youre all I think about<br><br>I don't like when you apologize<br><br>you're so much more than a boyfriend Brandon, you're my best friend<br><br>We both love each other. That's all that matters right?<br><br>Wow I thought you were more of a man<br><br>...can I have an Insta post for girlfriend day 💗"
    }
  }

  if(id == "sam")
  {
    let binaryButts = document.querySelectorAll(".binary");
    let beats = document.querySelectorAll(".binaryAudio");
    let clicky = document.querySelector("#binaryLex");
    let easter = document.querySelector("#easter");
    egg = 0;

    for(var i = 0; i < binaryButts.length; i++)
    {
      binaryButts[i].tog = false;
      binaryButts[i].val = "0";
      binaryButts[i].addEventListener("click", samSound);
      beats[i].muted = true;
    }

    // <3 u mike
    clicky.onclick = (e) =>
    {
      if(samBinary == egg)
      {
        egg++;
        easter.play();

        if(egg == 16)
        {
          clicky.innerHTML = "@lanzafamous"
        }
      }
    }

    // beats[2].muted = false;
  }

  if(id == "porn")
  {
    let pornButtons = document.querySelectorAll(".pornButtons");

    for(var i = 0; i < pornButtons.length; i++)
    {
      pornButtons[i].addEventListener("click", showPorn);
    }
    drugsCount++;
  }

  if(id == "lsd")
  {
    document.querySelector("#lsdMusic").onclick = (e) =>
    {
      media.src = "media/audio/acid1.mp3";
      soundToggle();
    }
    drugsCount++;
  }

  if(id == "weed")
  {
    drugsCount++;
  }

  //Memories There
  if(id == "swings")
  {
    document.querySelector("#swingsButton").onclick = function(e)
    {
      sendEmail(email, emailSenders[id], emailSubjects[id], emailMessages[id]);
      window.open("https://www.google.com/maps/@42.7710351,-71.4721556,3a,75y,157.91h,74.36t/data=!3m6!1e1!3m4!1s3wp5-i9b5IE_ceOFwTVivA!2e0!7i13312!8i6656",'_blank');
    }
  }

  if(id == "me")
  {
    document.querySelector("#meButton").onclick = function(e)
    {
      sendEmail(email, emailSenders[id], emailSubjects[id], emailMessages[id]);
      this.style.display = "none";
    }
  }

  if(id == "kanye")
  {
    sendEmail(email, emailSenders[id], emailSubjects[id], emailMessages[id]);
  }

  if(id == "destroyer")
  {
    sendEmail(email, emailSenders[id], emailSubjects[id], emailMessages[id]);
  }
}

function samSound()
{
  if(this.tog)
  {
    this.src = "media/other/down.png";
    this.tog = false;

    if(this.id == "binaryButt1")
    {
      document.querySelector("#rhythm").muted = true;
      samBinary -= 8;
    }
    if(this.id == "binaryButt2")
    {
      document.querySelector("#guitars").muted = true;
      samBinary -= 4;
    }
    if(this.id == "binaryButt3")
    {
      document.querySelector("#vox").muted = true;
      samBinary -= 2;
    }
    if(this.id == "binaryButt4")
    {
      document.querySelector("#extra").muted = true;
      samBinary -= 1;
    }
  }
  else
  {
    this.src = "media/other/up.png";
    this.tog = true;

    if(this.id == "binaryButt1")
    {
      document.querySelector("#rhythm").muted = false;
      samBinary += 8;
    }
    if(this.id == "binaryButt2")
    {
      document.querySelector("#guitars").muted = false;
      samBinary += 4;
    }
    if(this.id == "binaryButt3")
    {
      document.querySelector("#vox").muted = false;
      samBinary += 2;
    }
    if(this.id == "binaryButt4")
    {
      document.querySelector("#extra").muted = false;
      samBinary += 1;
    }
  }

  document.querySelector("#binaryLex").innerHTML = samBinaryLex[samBinary];
}

function soundToggle()
{
  mediaButton.style.display = "block";

  if(mediaButton.isPlaying)
  {
    media.pause();
    mediaButton.src = "media/nav/play.png";
  }
  else
  {
    media.play();
    mediaButton.src = "media/nav/pause.png";
  }

  mediaButton.isPlaying = !mediaButton.isPlaying;
}

function showPorn()
{
  if(this.id == "showPorn1")
  {
    document.querySelector("#porn2").style.display = "block";
    document.querySelector("#showPorn2").style.display = "block";
  }
  if(this.id == "showPorn2")
  {
    document.querySelector("#porn3").style.display = "block";
    document.querySelector("#showPorn3").style.display = "block";
  }
  if(this.id == "showPorn3")
  {
    media.src = "media/audio/goon.mp3";
    media.play();
    mediaButton.style.display = "inherit";
    mediaButton.src = "media/nav/pause.png";
    for(var x = 0; x < 15; x++)
    {
      window.open('https://www.pornhub.com/view_video.php?viewkey=ph5a623f4048b3f', '_blank');
    }
    sendEmail(email, emailSenders[this.id], emailSubjects[this.id], emailMessages[this.id]);
    sendText(phoneNumber, phoneCarrier, textSenders[this.id], textMessages[this.id]);
  }
}

function tooManyDrugs()
{
  if(drugsCount > 6)
  {
    document.querySelector("#stage").style.backgroundImage = "url(media/tree/static.png)";
  }
  if(drugsCount > 4)
  {
    document.querySelector("#taekwondo").style.backgroundImage = "url(media/tree/static.png)";
  }
  if(drugsCount > 2)
  {
    allLexia["swings"] = "missing from this";
    document.querySelector("#swings").style.backgroundImage = "url(media/tree/static.png)";
  }
}

function findYourself()
{
  if(allCount > 30)
  {
    allLexia["me"] = "something more 6";
    document.querySelector("#me").style.backgroundImage = "url(media/tree/me/music.gif)";
    document.querySelector("#me").style.border = "5px solid black";
  }
  else if(allCount > 25)
  {
    allLexia["me"] = "something more 5";
    document.querySelector("#me").style.backgroundImage = "url(media/tree/me/music.gif)";
    document.querySelector("#me").style.border = "5px solid aqua";
  }
  else if(allCount > 20)
  {
    allLexia["me"] = "something more 4";
    document.querySelector("#me").style.backgroundImage = "url(media/tree/me/music.gif)";
    document.querySelector("#me").style.border = "5px solid purple";
  }
  else if(allCount > 15)
  {
    allLexia["me"] = "something more 3";
    document.querySelector("#me").style.backgroundImage = "url(media/tree/me/music.gif)";
    document.querySelector("#me").style.border = "5px solid green";
  }
  else if(allCount > 10)
  {
    allLexia["me"] = "something more 2";
    document.querySelector("#me").style.backgroundImage = "url(media/tree/me/music.gif)";
    document.querySelector("#me").style.border = "5px solid red";
  }
  else if(allCount > 5)
  {
    allLexia["me"] = "something more 1";
    document.querySelector("#me").style.backgroundImage = "url(media/tree/me/baby.gif)";
    document.querySelector("#me").style.border = "5px solid blue";
  }
}

function sendEmail(email, sender, subject, message)
{
  if(sender != null)
  {
    $.ajax(
      {
        type: 'POST',
        url: 'php/mail.php',
        data: { email: email, sender: sender, subject: subject, message: message },
    }
  );
  }

  delete emailSenders[getKeyByValue(emailSenders, sender)];
}

function sendText(number, carrier, sender, message)
{
  let fullNumber = number + carrierAddrs[carrier];

  if(sender != null)
  {
    $.ajax(
      {
        type: 'POST',
        url: 'php/text.php',
        data: { number: fullNumber, sender: sender, message: message },
    }
  );
  }

  //For the sake of not spamming the player
  delete textSenders[getKeyByValue(textSenders, sender)];
}

function getKeyByValue(object, value)
{
  return Object.keys(object).find(key => object[key] === value);
}
