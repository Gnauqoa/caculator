import Clipboard from "@react-native-clipboard/clipboard";

export const useClipboard = () => {
  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
  };

  const pasteFromClipboard = async (callback: (text: string) => void) => {
    const content = await Clipboard.getString();
    callback(content);
  };

  return { copy: copyToClipboard, paste: pasteFromClipboard };
};
