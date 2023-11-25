import * as Clipboard from "expo-clipboard";

export const useClipboard = () => {
  const copyToClipboard = async (text: string) => {
    if (Clipboard) await Clipboard.setStringAsync(text);
  };

  const pasteFromClipboard = async (callback: (text: string) => void) => {
    const content = await Clipboard.getStringAsync();
    callback(content);
  };

  return { copy: copyToClipboard, paste: pasteFromClipboard };
};
