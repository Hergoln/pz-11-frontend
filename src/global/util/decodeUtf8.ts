export default function decodeUtf8(bytes: BufferSource) {
    const decoder = new TextDecoder("utf-8");
    return decoder.decode(bytes);
}