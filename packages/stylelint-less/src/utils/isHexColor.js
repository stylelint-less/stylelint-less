const HEX = /^#[0-9A-Za-z]+/;

export default function isHexColor({ type, value }) {
	return type === 'word' && HEX.test(value);
}
