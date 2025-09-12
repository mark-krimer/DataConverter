import { lookup } from "./lookup.js";
import * as converters from "./lookup.js";

let from = document.getElementById("from");
let to = document.getElementById("to");
let inputValue = document.getElementById("inputValue");
let output = document.getElementById("output");
let convertButton = document.getElementById("convertButton");

function validateInput(value, fromBase) {
	let regex;
	switch (fromBase) {
		case "decimal":
			regex = /^\d+$/;
			break;
		case "binary":
			regex = /^[01 ]+$/;
			break;
		case "bcd":
			regex = /^([0000|0001|0010|0011|0100|0101|0110|0111|1000|1001](\s)?)+$/;
			break;
		case "hexadecimal":
			regex = /^[0-9A-Fa-f]+$/;
			break;
		case "octal":
			regex = /^[0-7]+$/;
			break;
		default:
			regex = /./; // Match anything
	}
	return regex.test(value);
}

function conversion() {
	// Check for empty fields or unselected options
	if (from.value == "placeholder" || to.value == "placeholder" || from.value === to.value) {
		output.innerHTML = "";
		return;
	}

	// Check if input matches base format
	if (!validateInput(inputValue.value, from.value)) {
		inputValue.style.borderColor = "red";
		output.innerHTML = "Invalid input for " + from.value + ".";
		return;
	}

	// Do conversion
	let conversion = lookup[from.value]?.[to.value];
	if (conversion) {
		inputValue.style.borderColor = "#2a4d8f";
		output.innerHTML = conversion(inputValue.value);
	}
}

inputValue.addEventListener("input", conversion);
from.addEventListener("click", conversion);
to.addEventListener("click", conversion);

// Disabling button until valid state
window.addEventListener("click", function () {
	if (inputValue.value == "" || from.value == "placeholder" || to.value == "placeholder" || from.value == to.value) {
		convertButton.classList.add("disabled");
	} else {
		convertButton.classList.remove("disabled");
	}

	conversion();
});

window.addEventListener("input", function () {
	if (inputValue.value == "" || from.value == "placeholder" || to.value == "placeholder" || from.value == to.value) {
		convertButton.classList.add("disabled");
	} else {
		convertButton.classList.remove("disabled");
	}
});

// todo Fix BCD regex
