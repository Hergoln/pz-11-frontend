
const encoder = new TextEncoder();

export default function encodeUtf8(s: string) {
    return encoder.encode(s);
}