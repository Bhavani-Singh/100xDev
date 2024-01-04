## Counter without setInterval

Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.



function timer(time) {
  console.log(time);

  setTimeout(function() {
    timer(++time);
  }, 1000);  
}

timer(1);































































(Hint: setTimeout)