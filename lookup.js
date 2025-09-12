export function decToBin(from) {
	if (!from) return "";

	let binary = Number(from).toString(2);

	let bits = binary.split("").reverse();
	let spaced = [];

	for (let i = 0; i < bits.length; i++) {
		spaced.push(bits[i]);
		if ((i + 1) % 4 === 0 && i !== bits.length - 1) {
			spaced.push(" ");
		}
	}

	if (bits.length % 4 !== 0) {
		while (bits.length % 4 !== 0) {
			spaced.push("0");
			bits.push("0");
		}
	}

	return spaced.reverse().join("");
}

export function decToBCD(from) {
	if (!from) return "";

	let decimal = from.toString().split("");
	let result = [];

	decimal.forEach((digit) => {
		result.push(BCDLookup[digit]);
	});

	return result.join(" ");
}

export function decToHex(from) {
	if (!from) return "";

	let hex = Number(from).toString(16);
	hex = hex.toUpperCase();

	let bits = hex.split("").reverse();
	let spaced = [];

	for (let i = 0; i < bits.length; i++) {
		spaced.push(bits[i]);
		if ((i + 1) % 2 === 0 && i !== bits.length - 1) {
			spaced.push(" ");
		}
	}

	return spaced.reverse().join("");
}

export function decToOct(from) {
	if (!from) return "";

	let octal = Number(from).toString(8);

	let bits = octal.split("").reverse();
	let spaced = [];

	for (let i = 0; i < bits.length; i++) {
		spaced.push(bits[i]);
		if ((i + 1) % 3 === 0 && i !== bits.length - 1) {
			spaced.push(" ");
		}
	}

	if (bits.length % 3 !== 0) {
		while (bits.length % 3 !== 0) {
			spaced.push("0");
			bits.push("0");
		}
	}

	return spaced.reverse().join("");
}

export function binToDec(from) {
	let result;
	if (!from) return "";
	result = parseInt(from.split(" ").join(""), 2);

	return result;
}

export function binToBCD(from) {
	if (!from) return "";

	return decToBCD(binToDec(from));
}

export function binToHex(from) {
	if (!from) return "";

	return decToHex(binToDec(from));
}

export function binToOct(from) {
	if (!from) return "";

	return decToOct(binToDec(from));
}

export function BCDToDec(from) {
	if (!from) return "";

	from = from.split(" ").join("");

	console.log(from);

	let bits = from.split("").reverse();
	let spaced = [];

	for (let i = 0; i < bits.length; i++) {
		spaced.push(bits[i]);
		if ((i + 1) % 4 === 0 && i !== bits.length - 1) {
			spaced.push(" ");
		}
	}

	if (bits.length % 4 !== 0) {
		while (bits.length % 4 !== 0) {
			spaced.push("0");
			bits.push("0");
		}
	}

	from = spaced.reverse().join("").split(" ");

	console.log(from);

	let result = [];

	for (let i = 0; i < from.length; i++) {
		for (let key in BCDLookup) {
			if (BCDLookup[key] === from[i]) {
				result.push(key);
				break;
			}
		}
	}

	console.log(result);

	return result.join("");
}

export function BCDToBin(from) {
	if (!from) return "";

	return decToBin(BCDToDec(from));
}

export function BCDToHex(from) {
	if (!from) return "";

	return decToHex(BCDToDec(from));
}

export function BCDToOct(from) {
	if (!from) return "";

	return decToOct(BCDToDec(from));
}

export function hexToDec(from) {
	let result;
	if (!from) return "";
	result = parseInt(from.split(" ").join(""), 16);

	return result;
}

export function hexToBin(from) {
	if (!from) return "";

	return decToBin(hexToDec(from));
}

export function hexToBCD(from) {
	if (!from) return "";

	return decToBCD(hexToDec(from));
}

export function hexToOct(from) {
	if (!from) return "";

	return decToOct(hexToDec(from));
}

export function octToDec(from) {
	let result;
	if (!from) return "";
	result = parseInt(from.split(" ").join(""), 8);

	return result;
}

export function octToBin(from) {
	if (!from) return "";

	return decToBin(octToDec(from));
}

export function octToBCD(from) {
	if (!from) return "";

	return decToBCD(octToDec(from));
}

export function octToHex(from) {
	if (!from) return "";

	return decToHex(octToDec(from));
}

const BCDLookup = {
	0: "0000",
	1: "0001",
	2: "0010",
	3: "0011",
	4: "0100",
	5: "0101",
	6: "0110",
	7: "0111",
	8: "1000",
	9: "1001",
};

export const lookup = {
	decimal: { binary: decToBin, bcd: decToBCD, octal: decToOct, hexadecimal: decToHex },
	binary: { decimal: binToDec, bcd: binToBCD, octal: binToOct, hexadecimal: binToHex },
	bcd: { decimal: BCDToDec, binary: BCDToBin, octal: BCDToOct, hexadecimal: BCDToHex },
	octal: { decimal: octToDec, bcd: octToBCD, binary: octToBin, hexadecimal: octToHex },
	hexadecimal: { decimal: hexToDec, bcd: hexToBCD, binary: hexToBin, octal: hexToOct },
};
