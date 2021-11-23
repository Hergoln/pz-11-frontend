export default function encodeUtf8(s: string) {
    const encoder = new TextEncoder();
    return encoder.encode(s);
}