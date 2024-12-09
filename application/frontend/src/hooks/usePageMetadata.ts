import { useEffect } from "react";

/**
 * usePageMetadata: Custom hook for updating page metadata dynamically.
 *
 * @param title - The title for the page.
 * @param description - (Optional) Meta description for the page.
 */
export function usePageMetadata(title: string, description?: string) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | Brick and Mortar!`;
    }

    if (description) {
      let metaDescription = document.querySelector(
        'meta[name="description"]',
      ) as HTMLMetaElement | null;

      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      } else {
        metaDescription = document.createElement("meta") as HTMLMetaElement;
        metaDescription.name = "description";
        metaDescription.content = description;
        document.head.appendChild(metaDescription);
      }
    }
  }, [title, description]);
}
