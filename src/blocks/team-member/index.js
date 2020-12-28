import { registerBlockType } from "@wordpress/blocks";
import { RichText } from "@wordpress/editor";
import { __ } from "@wordpress/i18n";

import "./parent";
import Edit from "./edit";
import "./style.editor.scss";

const attributes = {
	title: {
		type: "string",
		source: "html",
		selector: "h4",
	},
	info: {
		type: "string",
		source: "html",
		selector: "p",
	},

	id: {
		type: "number",
	},
	url: {
		type: "string",
		source: "attribute",
		selector: "img",
		attribute: "src",
	},
	alt: {
		type: "string",
		source: "attribute",
		selector: "img",
		attribute: "alt",
		defatul: "",
	},
};

registerBlockType("firsttheme-blocks/team-member", {
	title: __("Team Member", "firsttheme-blocks"),

	description: __("Block showing a Team Member", "firsttheme-blocks"),

	keywords: [
		__("team", "firsttheme-blocks"),
		__("member", "firsttheme-blocks"),
		__("person", "firsttheme-blocks"),
	],

	icon: "admin-users",

	supports: {
		reusable: false,
		html: false, // Disable edit as html
	},

	attributes,

	// Prevent using this block outsite of parents
	parent: ["firsttheme-blocks/team-members"],

	edit: Edit,

	save({ attributes }) {
		const { title, info, url, alt, id } = attributes;

		return (
			<div>
				{url && (
					<img
						className={id ? `wp-image-${id}` : ""} // Responsive image class
						src={url}
						alt={alt}
					/>
				)}
				{title && (
					<RichText.Content
						className={`wp-block-firsttheme-blocks-team-member__title`}
						tagName="h4"
						value={title}
					/>
				)}
				{info && (
					<RichText.Content
						className={`wp-block-firsttheme-blocks-team-member__info`}
						tagName="p"
						value={info}
					/>
				)}
			</div>
		);
	},
});
