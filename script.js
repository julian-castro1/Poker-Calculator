window.onload = function() {}
let focus = 'none'

// eventListners
document.addEventListener("click", menu_click);
document.getElementById('join_title').addEventListener('click', join_menu);
document.getElementById("host_title").addEventListener("click", host_menu);


function join_menu(){
    console.log('join clicked')
    if(focus != 'join_button'){
        // Select the div with the id 'join_button'
        var joinButtonDiv = document.getElementById('join_button');

        // Create new input elements
        var input1 = document.createElement('input');
        input1.className = 'input';
        input1.id = 'name_field';
        input1.placeholder = 'Name';

        var input2 = document.createElement('input');
        input2.className = 'input';
        input2.id = 'gameID_field';
        input2.placeholder = 'Game ID';

        // Append the created inputs to the 'join_button' div
        joinButtonDiv.appendChild(input1);
        joinButtonDiv.appendChild(input2);

        // add padding
        document.getElementById('join_button').style.paddingBottom = '.5em';

        focus = 'join_button'
    } else if(focus == "join_button") {
        // join was clicked again, ready to start playing
        check_join_inputs()
        window.location.href = "play.html";
    }
}

/* host_menu function description
    remove from DOM: join_button, wiki
    add to DOM: 
        - span 'select chip color and value
        - div x6 poker chips:
            - poker chip svg
            - div
                - '-' button
                - value display
                - '+' button
        - div buy-in
            - 'minimum buy-in' text
            - input
*/
function host_menu(){
    console.log('host clicked')
    if (focus != "host_button") {
      // remove 'join_button' and 'wiki'
      document.getElementById("join_button").remove();
      document.getElementById("wiki").remove();

      // add 'select chip color and value' text
      let host_button = document.getElementById("host_button");
      var select_chip_text = document.createElement("span");
      select_chip_text.style.paddingTop = '1em'
      select_chip_text.style.paddingBottom = ".5em";
      select_chip_text.className = "select_chip_text";
      select_chip_text.innerHTML = "Select chip color and value:";
      select_chip_text.style.gridColumn = "1/-1";
      host_button.appendChild(select_chip_text);

      // add each chip option
      for (let i = 0; i < 6; i++) {
        let chip_option = document.createElement("div");
        chip_option.className = "chip_option";

        // load svg
        let chip_img = document.createElement("img");
        chip_img.src = selectImage(i);
        chip_img.className = "chip_img";
        chip_option.appendChild(chip_img);

        // create value display
        let val_select = document.createElement("div");
        val_select.className = "val_select";
        let val_dec = document.createElement("span");
        let val_disp_div = document.createElement("div");
        let val_disp_dol = document.createElement("span");
        let val_disp_in = document.createElement("span");
        let val_inc = document.createElement("span");

        val_dec.innerHTML = "-";
        val_dec.className = "val_disp";
        val_dec.addEventListener("click", dec_val);

        val_inc.innerHTML = "+";
        val_inc.className = "val_disp";
        val_inc.addEventListener("click", inc_val);

        val_disp_dol.innerHTML = "$";
        val_disp_dol.className = "val_disp";
        val_disp_in.innerHTML = "0.00";
        val_disp_in.className = "val_disp";
        val_disp_in.id = "val_disp_in";
        val_disp_div.appendChild(val_disp_dol);
        val_disp_div.appendChild(val_disp_in);
        val_disp_div.addEventListener("click", disp_val);

        val_select.appendChild(val_dec);
        val_select.appendChild(val_disp_div);
        val_select.appendChild(val_inc);

        chip_option.appendChild(val_select);

        // append
        host_button.appendChild(chip_option);
      }

      // append minimum buy-in field
      let buy_in_div = document.createElement("div");
      buy_in_div.className = "buy_in_div";
      buy_in_div.padding = '0'
      let buy_in_text = document.createElement("span");
      buy_in_text.innerHTML = "Minimum buy-in:";
      buy_in_text.className = "buy_in_text";
      let buy_in_input = document.createElement("input");
      buy_in_input.id = "buy_in_input";
      buy_in_input.className = "input";
      buy_in_input.placeholder = "$20.00";
      buy_in_input.min = "0.00";
      buy_in_div.style.gridColumn = "1/-1";

      buy_in_div.appendChild(buy_in_text);
      buy_in_div.appendChild(buy_in_input);

      host_button.appendChild(buy_in_div);

      // ask for the hosts name
      name_field_div = document.createElement('div')
      name_field_div.id = 'name_field_div';
      name_field_in = document.createElement('input')
      name_field_in.className = 'input'
      name_field_in.id = 'name_field_in'
      name_field_in.placeholder = "Name"
      name_field_div.style.gridColumn = "1/-1"
      name_field_div.appendChild(name_field_in)
      host_button.appendChild(name_field_div)

      focus = "host_button";
    } else if (focus == "host_button") {
      // join was clicked again, ready to start playing
      check_host_inputs();
      window.location.href = "play.html";
    }
}
function disp_val(){
    console.log('display value clicked')
}
function inc_val(){
  console.log("increase value clicked");
  // get poker chip info
  let val_disp_div = this.parentNode; // get the parent node which is 'val_select'
  let disp_ele = val_disp_div.children[1].children[1]; // get the second 'val_disp' that holds '0.00'

  // fetch value in disp_val
  curVal = disp_ele.innerHTML;

  // increase value by $0.05
  newVal = fiveCents("add", curVal);

  // write increased value back to disp_val
  disp_ele.innerHTML = newVal;
}
function dec_val(){
  console.log("decrease value clicked");
  // get poker chip info
  let val_disp_div = this.parentNode; // get the parent node which is 'val_select'
  let disp_ele = val_disp_div.children[1].children[1]; // get the second 'val_disp' that holds '0.00'

  // fetch value in disp_val
  curVal = disp_ele.innerHTML;

  // increase value by $0.05
  newVal = fiveCents("sub", curVal);

  // write increased value back to disp_val
  disp_ele.innerHTML = newVal;
}
function fiveCents(operation, amountString) {
  // Remove the dollar sign and convert the string to a number
  let amount = parseFloat(amountString);

  // Add $0.05 to the amount
  operation == "add" ? (amount += 0.05) : (amount -= 0.05);

  // Check if the amount exceeds $100.00, if so, set it to $100.00
  if (amount > 100) {
    amount = 100;
  } else if (amount < 0) {
    amount = 0;
  }

  // Convert the amount back to a string with two decimal places, add the dollar sign in front
  amountString = amount.toFixed(2);

  return amountString;
}
function selectImage(i){
    switch(i){
        case 0:
            return 'src/chip_black.svg';
        case 1:
            return 'src/chip_blue.svg';
        case 2:
            return 'src/chip_green.svg';
        case 3:
            return 'src/chip_red.svg';
        case 4:
            return 'src/chip_white.svg';
        case 5:
            return 'src/chip_orange.svg';
    }
}
function menu_click(){
    if (event.target === document.body) {
        if(focus == 'host_button')
          remove_host_menu();
        if(focus == 'join_button')
          remove_join_menu();
    }
}
function remove_host_menu() {
  if (focus === "host_button") {
    // Select the div with the id 'host_button'
    var hostButtonDiv = document.getElementById("host_button");

    // Remove the 'select_chip_text' span
    var select_chip_text =
      document.getElementsByClassName("select_chip_text")[0];
    if (select_chip_text) {
      hostButtonDiv.removeChild(select_chip_text);
    }

    // Remove the 'chip_option' divs
    var chipOptions = document.getElementsByClassName("chip_option");
    while (chipOptions[0]) {
      hostButtonDiv.removeChild(chipOptions[0]);
    }

    // Remove the 'buy_in_div' div
    var buyInDiv = document.getElementsByClassName("buy_in_div")[0];
    if (buyInDiv) {
      hostButtonDiv.removeChild(buyInDiv);
    }

    // Remove the 'name_field_div' div
    var name_field_div = document.getElementById("name_field_div");
    if (name_field_div) {
      hostButtonDiv.removeChild(name_field_div);
    }

    // Add back 'join_button' and 'wiki'
    let joinButtonDiv = document.createElement("div");
    joinButtonDiv.className = "button";
    joinButtonDiv.id = "join_button";
    let join_title = document.createElement("span");
    join_title.id = "join_title";
    join_title.innerHTML = "Join";
    let wikiDiv = document.createElement("div");
    wikiDiv.className = "button";
    wikiDiv.id = "wiki";
    let wiki_title = document.createElement("span");
    wiki_title.id = "wiki_title";
    wiki_title.innerHTML = "How does it work?";

    // Add any necessary attributes or content to these divs here...
    joinButtonDiv.appendChild(join_title);
    wikiDiv.appendChild(wiki_title);

    main_button_div = document.getElementsByClassName("main-button")[0];
    main_button_div.insertBefore(joinButtonDiv, hostButtonDiv);
    main_button_div.appendChild(wikiDiv);

    // Reset focus
    focus = null;

    // add eventListener
    document.getElementById("join_title").addEventListener("click", join_menu);
  }
}
function remove_join_menu(){
    console.log("remove join menu");
    if(focus == 'join_button'){
        // Select the div with the id 'join_button'
        var joinButtonDiv = document.getElementById('join_button');

        // Remove the created inputs
        joinButtonDiv.removeChild(document.getElementById('name_field'));
        joinButtonDiv.removeChild(document.getElementById('gameID_field'));

        // remove padding
        document.getElementById('join_button').style.paddingBottom = '0em';

        focus = null
    }
}


function check_join_inputs(){
    // join button was clicked again
    let name_field = document.getElementById('name_field');
    let gameID_field = document.getElementById('gameID_field');

    // no inputs
    if(name_field.value == '' || gameID_field.value == ''){
        // show visual error
        console.log('no inputs')
        
    }
}
function check_host_inputs(){

}

function generateGameId() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}