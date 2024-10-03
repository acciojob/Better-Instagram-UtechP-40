let images = document.querySelectorAll(".image");

for (let t of images) {
  t.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
    setTimeout(() => {
      e.target.classList.add("dragging");
    }, 0);
  });

  t.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  t.addEventListener("drop", (e) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(draggedId);
    const targetElement = e.target;

    if (draggedElement !== targetElement && targetElement.classList.contains("image")) {
      const draggedParent = draggedElement.parentNode;
      const targetParent = targetElement.parentNode;

      const draggedNextSibling = draggedElement.nextElementSibling === targetElement
        ? draggedElement
        : draggedElement.nextElementSibling;
      const targetNextSibling = targetElement.nextElementSibling === draggedElement
        ? targetElement
        : targetElement.nextElementSibling;

      targetParent.insertBefore(draggedElement, targetNextSibling);
      draggedParent.insertBefore(targetElement, draggedNextSibling);
    }

    draggedElement.classList.remove("dragging");
  });
}

for (let t of images) {
  t.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
  });
}
