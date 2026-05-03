export interface ComposeGreetingInput {
  templateUrl: string;
  userName: string;
  profileUrl: string;
  textX: number;
  textY: number;
  textSize: number;
  photoX: number;
  photoY: number;
  photoSize: number;
}

async function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    image.src = src;
  });
}

export async function composeGreetingImage(input: ComposeGreetingInput) {
  const [templateImage, profileImage] = await Promise.all([
    loadImage(input.templateUrl),
    loadImage(input.profileUrl),
  ]);

  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1080;
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Could not initialize drawing context");
  }

  context.drawImage(templateImage, 0, 0, canvas.width, canvas.height);

  const radius = input.photoSize / 2;
  context.save();
  context.beginPath();
  context.arc(input.photoX, input.photoY, radius, 0, Math.PI * 2);
  context.closePath();
  context.clip();
  context.drawImage(
    profileImage,
    input.photoX - radius,
    input.photoY - radius,
    input.photoSize,
    input.photoSize,
  );
  context.restore();

  context.fillStyle = "#FFFFFF";
  context.strokeStyle = "#000000";
  context.lineWidth = 5;
  context.font = `700 ${input.textSize}px Arial, Helvetica, sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.strokeText(input.userName, input.textX, input.textY);
  context.fillText(input.userName, input.textX, input.textY);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((value) => {
      if (!value) {
        reject(new Error("Failed to export merged image"));
        return;
      }

      resolve(value);
    }, "image/png");
  });

  const dataUrl = canvas.toDataURL("image/png");

  return { blob, dataUrl };
}

