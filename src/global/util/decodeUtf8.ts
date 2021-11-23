
const utf8Decoder = new TextDecoder("utf-8");

export default function decodeUtf8(bytes: BufferSource) {
    return utf8Decoder.decode(bytes);
}