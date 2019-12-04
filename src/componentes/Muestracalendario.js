
const showCall = ( ) => {
  var iframe = document.getElementById('calendarEmbed');
  var email = document.getElementById('email').value;
  var blocker = document.getElementById('calendarEmbedBlocker');
  if (email && /.+\@.+/.test(email)){
      iframe.src = 'https://calendar.google.com/calendar/embed?src=' + encodeURI(email);
      blocker.style.display = 'none';
  }
  else {
      alert("That doesn't look like a valid email...");
      blocker.style.display = 'block';
  }
}
export default showCall;