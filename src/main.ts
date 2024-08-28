import "./style.css";

let timeout: number | undefined;
let idle = false;

function switchColors() {
	const body = document.body;
	const brand = document.querySelector("#brand") as HTMLElement;

	type BlueOrWhite = typeof blue | typeof white;

	const blue = "var(--wck-blue)";
	const white = "white";

	const getOtherColor = (c: BlueOrWhite) => (c === white ? blue : white);

	body.style.backgroundColor = getOtherColor(
		body.style.backgroundColor as BlueOrWhite,
	);
	brand.style.color = getOtherColor(brand.style.color as BlueOrWhite);
}

function onIdle() {
	if (typeof timeout === "number") {
		clearTimeout(timeout);
	}

	if (idle) {
		idle = false;
		switchColors();
	} else {
		timeout = setTimeout(() => {
			idle = true;
			switchColors();
		}, 10_000);
	}
}

document.addEventListener("mousemove", () => onIdle());

onIdle();
