import { cursorPosition } from "../hooks/cursor";

export function displayFloatingText(
  scene: Phaser.Scene,
  count: number,
  icon: string,
) {
  const text = scene.add
    .text(cursorPosition.x, cursorPosition.y, `+${count}`, {
      color: "#247B7F",
      fontSize: "24px",
    })
    .setShadow(2, 2, "#000000", 2, true, true)
    .setOrigin(0.5);

  const itemIcon = scene.add
    .image(cursorPosition.x + 40, cursorPosition.y, icon)
    .setOrigin(0.5);

  scene.tweens.add({
    targets: text,
    y: cursorPosition.y - 50,
    alpha: 0,
    duration: 1000,
    ease: "Linear",
    onComplete: () => {
      text.destroy();
    },
  });
  scene.tweens.add({
    targets: itemIcon,
    y: cursorPosition.y - 50,
    alpha: 0,
    duration: 1000,
    ease: "Linear",
    onComplete: () => {
      text.destroy();
    },
  });
}
