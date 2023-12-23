import { LaunchProps, open } from "@raycast/api";
import { getDestinations } from "@allindevelopers/npmgo";

const destinations = getDestinations();

export default async function Command(
	props: LaunchProps<{ arguments: Arguments.Index }>,
) {
	const destination = destinations.find((d) => d.title === props.arguments.go);
	if (destination) {
		await open(destination.go(props.arguments.pkg));
	}
}
