import { writeFile } from "node:fs/promises";
import pkg from "../package.json";
import { getDestinations } from "@allindevelopers/npmgo";

const options = getDestinations().map((d) => ({
	title: d.title,
	value: d.title,
}));

const newPkg: typeof pkg = {
	...pkg,
	commands: pkg.commands.map((c) => {
		if (c.name !== "index") return c;
		return {
			...c,
			arguments: c.arguments.map((a) => {
				if (a.name !== "go") return a;
				return {
					...a,
					data: options,
				};
			}),
		};
	}),
};

writeFile("./package.json", JSON.stringify(newPkg, null, "\t") + "\n");
