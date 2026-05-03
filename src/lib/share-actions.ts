export function downloadBlob(blob: Blob, filename: string) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

export async function copyImageToClipboard(blob: Blob): Promise<boolean> {
  try {
    if (!navigator.clipboard || !window.ClipboardItem) {
      return false;
    }
    await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
    return true;
  } catch {
    return false;
  }
}

export async function shareWithNativeSheet(file: File, title: string, text: string): Promise<boolean> {
  if (!navigator.share) return false;
  const payload = { title, text, files: [file] };
  if (!navigator.canShare?.(payload)) return false;
  try {
    await navigator.share(payload);
    return true;
  } catch {
    return false;
  }
}

export function openMailto(subject: string, body: string) {
  const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

