/**
 * @author Kate
 */


var grammars = {
    communication : {
	
		abstrOpt : ["<i>A method is developed for representing any communication system geometrically.</i>", "<i>Messages and the corresponding signals are points in two 'function spaces,' and the modulation process is a mapping of one space into the other.</i>",
					"<i>Using this representation, a number of results in communication theory are deduced concerning expansion and compression of bandwidth and the threshold effect.</i>",
					"<i>Formulas are found for the maximum rate of transmission of binary digits over a system when the signal is perturbed by various types of noise.</i>",
					"<i>Some of the properties of 'ideal' systems which transmit at this maximum rate are discussed.</i>",
					"<i>The equivalent number of binary digits per second for certain information sources is calculated.</i>",
					"It's ten p.m. but it feels later.", "All the lights are off in the house but he's still awake, watching television with a pit in his stomach.",
					"She's on the porch.", "She's not drunk, but was so overcome with a wave of nausea as she approached the door that she paused, hand reaching for the doorknob, to drink in the cool night air."],

		infoSrc : ["The source selects one message from a set of possible messages to be transmitted to the receiving terminal.",
					"The message may be of various types; for example:",
					"A sequence of letters or numbers, as in telegraphy or teletype.", "A continuous function of time f(t), as in radio or telephony.",
					"<i>She reminds herself that of course nothing happened, but as she returns her keys to the hook, it strikes her as strange that that is something she would need to be reminded of.</i>",
					"<i>The dishwasher is churning.</i>", "<i>The television is blaring.</i>", "<i>Yet the house seems quiet.</i>", "<i>Yet the house seems quiet, and big.</i>",
					"<i>Slowly, deliberately, she removes her shoes, focusing carefully on undoing each strap.</i>", "<i>She clears her throat, just to fill the noiseless void.</i>"],
		
		transOpt : ["This operates on the message in some way and produces a signal suitable for transmission to the receiving point over the channel.",
					"In telephony, this operation consists of merely changing sound pressure into a proportional electrical current.",
					"In telegraphy, we have an encoding operation which produces a sequence of dots, dashes, and spaces corresponding to the letters of the message.",
					"To take a more concrete example, in the case of multiplex PCM telephony the different speech functions must be sampled, compressed, quantized, and encoded, and finally interleaved properly to construct the signal.",
					"<i>When she can't delay it any longer, she steps into the living room where he is sitting, arms crossed, before the television.</i>",
					"<i>'Have fun?' he asks, glancing away from the television for only a second.</i>",
					"<i>'Yes,' she says, hovering in the threshold.</i>", "<i>She's unsure if he wants her to sit by him, unsure if she wants to sit by him.</i>",
					"<i>A long moment passes, his eyes remaining glued to the television.</i>",
					"<i>She turns and heads upstairs without a word of explanation.</i>"],
		
		chanOpt : ["This is merely the medium used to transmit the signal from the transmitting to the receiving point.",
					"It may be a pair of wires, a coaxial cable, a band of radio frequencies, etc.", "During transmission, or at the receiving terminal, the signal may be perturbed by noise or distortion.",
					"Noise and distortion may be differentiated on the basis that distortion is a fixed operation applied to the signal, while noise involves statistical and unpredictable perturbations.",
					"Distortion can, in principle, be corrected by applying the inverse operation, while a perturbation due to noise cannot always be removed, since the signal does not always undergo the same change during transmission.",
					"<i>She doesn't bother to take off her makeup or change into pajamas besides removing her skirt and leaving it in a lump on the floor.</i>",
					"<i>She doesn't bother to turn on the light either, sliding in between the bedsheets in the dark.</i>",
					"<i>She plugs in her phone, places it on the side table, and rolls over to go to sleep.</i>"],
		
		recOpt : ["This operates on the received signal and attempts to reproduce, from it, the original message.",
					"Ordinarily it will perform approximately the mathematical inverse of the operations of the transmitter, although they may differ somewhat with best design in order to combat noise.",
					"<i>After a moment, she rolls over again, picks up her phone, and types out a message to him.</i>",
					"<i>'I miss you,' she types.</i>", "<i>She pauses, then deletes the message.</i>", "<i>Too melodramatic, too bare.</i>",
					"<i>Same goes for 'I love you'--she doesn't even bother to type that one out.</i>",
					"<i>'Wish you were there tonight!!' she types, and physically winces.</i>",
					"<i>It's just so sweet and artificial, like the brightly-colored sugar cookies sold prepackaged at every grocery store, the ones that turn to sand in your mouth.</i>",
					"<i>She deletes an exclamation point and adds a smiley face--even worse, somehow.</i>",
					"<i>She gives up without pressing send, rolls over, and eventually falls asleep.</i>"],
		
		destOpt : ["This is the person or thing for whom the message is intended.",
					"Following Nyquist and Hartley, it is convenient to use a logarithmic measure of information.",
					"We will use the base 2, and call the resulting units binary digits or bits.",
					"A precise meaning will be given later to the requirement of reliable resolution of the <i>M</i> signals.",
					"<i>When she wakes in the morning, he's in bed with her, as far away as the double mattress will allow.</i>",
					"<i>She props herself up on an elbow and looks at his back, willing her arm to reach out and caress him.</i>",
					"<i>But her arm is made of lead and stays put.</i>",
					"<i>She looks around the room, groggy and exhausted.</i>",
					"<i>Her glance falls on the side table, where two glasses of water stand sentry.</i>",
					"<i>One of them is half-empty.</i>", "<i>The other is full, still waiting for her.</i>"],
       
		abstr :  ["<i><b>Abstract.</b></i> #abstrOpt# #abstrOpt# #abstrOpt# #abstrOpt# #abstrOpt# #abstrOpt# #abstrOpt# #abstrOpt#"],
		intro : ["<h4>I. INTRODUCTION</h4><p>A general communications system is shown schematically in Fig. 1. It consists essentially of five elements."],
		infoSource : ["<p>1) <i>An Information Source:</i> #infoSrc# #infoSrc# #infoSrc# #infoSrc# #infoSrc# #infoSrc# #infoSrc# #infoSrc# #infoSrc# #infoSrc#"],
		transmitter: ["<p>2) <i>The Transmitter:</i> #transOpt# #transOpt# #transOpt# #transOpt# #transOpt# #transOpt# #transOpt# #transOpt# #transOpt# #transOpt#"], 
        channel: ["<p>3) <i>The Channel:</i> #chanOpt# #chanOpt# #chanOpt# #chanOpt# #chanOpt# #chanOpt# #chanOpt# #chanOpt#"],
		receiver : ["<p>4) <i>The Receiver:</i> #recOpt# #recOpt# #recOpt# #recOpt# #recOpt# #recOpt# #recOpt# #recOpt# #recOpt# #recOpt# #recOpt#"],
		destination: ["<p>5) <i>The Destination:</i> #destOpt# #destOpt# #destOpt# #destOpt# #destOpt# #destOpt# #destOpt# #destOpt# #destOpt# #destOpt#"],
		plot : ["#abstr#<p>#intro#<p>#infoSource#<p>#transmitter#<p>#channel#<p>#receiver#<p>#destination#"],
        origin : ["#plot#"]

    },
}
