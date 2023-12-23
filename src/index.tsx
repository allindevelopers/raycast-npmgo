import { ActionPanel, Action, List } from "@raycast/api";
import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { getFavicon } from "@raycast/utils";
import { getDestinations } from "@allindevelopers/npmgo";

export default function Command() {
	const [searchText, setSearchText] = useState("");

	const destinations = useMemo(getDestinations, []);
	const fuse = useMemo(
		() => new Fuse(destinations, { keys: ["title"] }),
		[destinations],
	);

	const { pkg, go } = useMemo(() => {
		const [pkg = "", go = ""] = searchText.split(" ");
		return { pkg: pkg.trim(), go: go.trim() };
	}, [searchText]);

	const data = useMemo(() => {
		if (pkg && go) {
			return fuse.search(go).map((result) => result.item);
		} else {
			return destinations;
		}
	}, [pkg, go]);

	return (
		<List
			onSearchTextChange={setSearchText}
			searchBarPlaceholder="Search npm packages..."
		>
			<List.Section title="Results">
				{data.map((destination) => (
					<SearchListItem
						key={destination.title}
						title={destination.title}
						url={destination.go(pkg)}
					/>
				))}
			</List.Section>
		</List>
	);
}

function SearchListItem({ title, url }: { title: string; url: string }) {
	return (
		<List.Item
			title={title}
			accessories={[{ icon: getFavicon(url) }]}
			actions={
				<ActionPanel>
					<ActionPanel.Section>
						<Action.OpenInBrowser title="Open in Browser" url={url} />
					</ActionPanel.Section>
				</ActionPanel>
			}
		/>
	);
}
