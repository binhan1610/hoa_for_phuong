const initializeGarden = () => {
  const garden = document.querySelector(".garden");
  if (!garden) {
    throw new Error("The flower garden container is missing.");
  }

  const flowerCountPerLayer = 24;
  const layerCount = 3;
  const colors = ["pink", "peach", "lilac"];
  const isMobile = window.matchMedia("(max-width: 600px)").matches;
  const flowers = document.createDocumentFragment();

  for (let layer = 0; layer < layerCount; layer += 1) {
    for (let index = 0; index < flowerCountPerLayer; index += 1) {
      const position = document.createElement("span");
      const bloom = document.createElement("span");
      const color = colors[(index + layer) % colors.length];
      const height = 34 + ((index * 7 + layer * 5) % 23) - layer * 8;
      const bloomWidth = 32 + ((index * 5 + layer * 3) % 15);
      const bloomHeight = 38 + ((index * 7 + layer * 4) % 17);
      const x = 1.5 + index * 4.05 + layer * 1.1;
      const growDelay = isMobile
        ? 0.35 + index * 0.035 + layer * 0.12
        : 0.9 + index * 0.07 + layer * 0.18;
      const bloomDelay = isMobile
        ? 1.1 + index * 0.05 + layer * 0.15
        : 2.2 + index * 0.11 + layer * 0.5;

      position.className = `garden__tulip garden__tulip--${color}`;
      position.style.setProperty("--x", `${x}%`);
      position.style.setProperty("--height", `${height}vh`);
      position.style.setProperty("--bloom-width", `${bloomWidth}px`);
      position.style.setProperty("--bloom-height", `${bloomHeight}px`);
      position.style.setProperty("--grow-delay", `${growDelay}s`);
      position.style.setProperty("--bloom-delay", `${bloomDelay}s`);
      position.style.setProperty("--delay", `${-growDelay}s`);
      position.style.setProperty("--layer", `${layer}`);

      bloom.className = "garden__bloom";
      ["left", "center", "right"].forEach((side) => {
        const petal = document.createElement("span");
        petal.className = `garden__petal garden__petal--${side}`;
        bloom.append(petal);
      });
      position.append(bloom);
      flowers.append(position);
    }
  }

  garden.append(flowers);
  document.body.classList.remove("not-loaded");
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeGarden, { once: true });
} else {
  initializeGarden();
}