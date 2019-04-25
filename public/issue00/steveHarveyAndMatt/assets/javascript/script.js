var email1 = {  to: "To: Buch, Peter[Buch.Peter@epa.gov] Cc: Fagan, Susan[Fagan.Susan@epa.gov]; Shirey, John[Shirey.John@epa.gov]; WCSD Webteam[WCSD _ Webteam@epa.gov]; Darlington, Lin[Darlington .Lin@epa.gov]; Shahan, Alison[Shahan .Aiison@epa .gov]",
                from: "From: Hessling, Michael Sent: Tue 5/9/2017 11:19:23 AM",
                subject:  "Subject: RE: Danny said you can archive Clean Power Plan. How do we keep it from getting into our own search results?",
                body: "All right. This took me about 90 minutes to do 108 pages, and it's not going to get easier, I don't think. I've finally figured out why bulk archive" +
                "doesn't work 100% ... we get rate limited by Akamai. Bulk archive goes too fast. I resorted to doing the archiving 1-by-1. It's not too slow once you get a" +
                "rhythm (gonna get you), but tedious since I waited until the page was definitely archived before hitting the next." +
                "The bulk archive missed four files, highlighted in yellow in the attached spreadsheet. I found three of them stuck in the queue for archiving state (so at least that fails gracefully)." +
                "(All three are attached.) Missing: clean-power-plan-and-carbon-pollution-standards-regulatory-actions. I find no evidence of a redirect to some other page" +
                "(like clean-power-plan-existing-power-plants-regulatory actions??), but I could be wrong. What's the best way to get those three files over to archive? ~Mike"
              };
var email2 = { to: "To: Buch, Peter Cc: Fagan, Susan; Shirey, John; WCSD Webteam; Darlington, Lin; Shahan, Alison",
               from: "From: Hessling, Michael Sent: Monday, May 8, 2017 4:14:48 PM",
               subject: "Subject: Re: Danny said you can archive Clean Power Plan. How do we keep it from getting into our own search results?",
               body: "Tomorrow morning, I will archive clean-power-plan. Tomorrow during the day, you'll want to rename the ARCHIVED clean-power-plan back to cleanpowerplan using your Perl script.~Mike",
             };
var email3 = { to: "To: Fine, Steven Leopard, Matthew Cc: Grantham, Nancy",
               from: "From: Freire, JP Sent: Friday, April 28, 2017 5:51 PM",
               subject: "Subject: Request for time-sensitive website assistance",
               body: "Steve, Harvey and Matt, As discussed with Nancy, we would like the content at the links below removed and archived as soon as possible." +
                  "The removed climate change pages will be replaced with a custom page that will explain why the change is happening, include a link to the" +
                  "January 19, 2017 snapshot of the EPA website, and a link to the press release we'll be putting out." +
                  "The clean power plan pages will be redirected to the newly posted energy independence pages.We appreciate your assistance in this time-sensitive matter." +
                  "Please let us know if you have questions. Thank you"
                };
var email4 = { to: "To: Shirey, John Cc: Fagan, Susan; Buch, Peter; WCSD Webteam; Darlington, Lin; Shahan, Alison",
               from: "From: Hessling, Michael Sent: Monday, May 8, 2017 2:23:37 PM",
               subject: "Subject: Re: Danny said you can archive Clean Power Plan. How do we keep it from getting into our own search results?",
               body: "I would do this archiving early in the morning and go as fast as I can. Wouldn't that prevent the indexing? The URL pattern" +
               "would be 'clean-power-plan' if that helps (changed from 'cleanpowerplan'). ~Mike"
             };
var email5 = { to: "To: Hessling, Michael Buch, Peter Darlington, Lin",
               from: "From: Fagan, Susan Sent: Monday, May 08,2017 2:05PM",
               subject: "Subject: Danny said you can archive Clean Power Plan. How do we keep it from getting into our own search results?",
               body: "He understands that you will need to temporarily rename it with an obscure appendage or something to make it not caught by the redirect." +
               "He also understands that it will appear on the Web Topics Published list for a bit. I told him it would not appear in our EPA search results," +
               "so Peter what do you need to do to not feed yourself the (new) web area when Mike renames it? Thanks Susan Fagan US EPA," +
               "Office of Environmental Information, Office of Information Management"
             };
var email6 = { to: "To: Hull, George Cc: Hart, Daniel Milbourn, Cathy",
               from: "From: Konkus, John Sent: Saturday, April 01, 2017 6:40 PM",
               subject: "Subject: Website work this weekend",
               body: "George: per my voice message, we need to start building an updated page for the clean power plan ASAP with the goal of having it go live sometime on Monday." +
               "Below is the outline that we would like. We have the photo we need already from Eric. Some of the links below we already have, others we will have to create. And we" +
               "are creating content for those links on a parallel track. Therefore you can leave those blank and can add the link in when we have the new documents." +
               "Is there any way we can get a little time put in on this project over the weekend so that we're off on the right foot on Monday morning?" +
               "Please call me with any questions or reply to this email. I'll be working all weekend and ready to help make this happen on time. Thank you very much! John"
             };

/*
  show email upon being clicked
*/
function showSelected(e){
  switch (e.id) {
    case "firstMail":
      loadMail(email1);
      break;
    case "secondMail":
      loadMail(email2);
      break;
    case "thirdMail":
      loadMail(email3);
      break;
    case "fourthMail":
      loadMail(email4);
      break;
    default:
      break;
    }
}

/*
  loads the mail element based on param mail
  child nodes are every other because DOM childNodes
  includes the space in between elements
*/
function loadMail(mail){
  var selected = document.getElementById('selected');
  selected.childNodes[1].innerHTML = mail.to;
  selected.childNodes[3].innerHTML = mail.from;
  selected.childNodes[5].innerHTML = mail.subject;
  selected.childNodes[7].innerHTML = mail.body;
}

/*
  displays the dropdown menu in nav
*/
function displayDropdown(e){
  var selected = document.getElementsByClassName('dropdown')[0];
  selected.style.display = "block";
}

/*
  binds an email img to mouse when mousebutton is dropdown
  if mouse is released over the trash icon, redirect to Steve,
  Harvey, and Matt page
*/
function grabMail(element){
  makeDragIcon();
  $(document).bind('mousemove', function(e){
    $('#dragImg').css({
      left: e.pageX + 5,
      top: e.pageY
    });
  });
  document.addEventListener('mouseup', function(){
    var HOVERWIDTH = 20;
    //determines if trashicon is being hovered over
    if($('#trashIcon').width() >= HOVERWIDTH){
      window.location.href = "https://epa.archive.work/";
    }
    $('#dragImg').remove()});
}

/*
  creates the html image element to follow mouse
*/
function makeDragIcon(){
  var $img = document.createElement('img');
  $img.id = 'dragImg';
  $('#main').append($img);
  $('#dragImg').attr("src", "assets/images/webinterface.gif");
  $('#dragImg').css({"width": '25px', "position": "absolute", "z-index": "1"});
  $('#dragImg').css("maxWidth", "100%");
}

function showTitle(){
  hideEverything();
}