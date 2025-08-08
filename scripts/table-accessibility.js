export default function TableAccessibility() {

  return (tree) => {
    let tableCount = 0;
    const children = tree.children;

    for (let i = 0; i < children.length; i++) {
      const node = children[i];

      // Cas 1 : <caption value="..."/> suivi d’un tableau
      if (node.type === "mdxJsxFlowElement" && node.name === "caption") {
        // Sauter les nœuds texte vides entre <caption> et <table>
        let j = i + 1;
        while (
          j < children.length &&
          children[j].type === "text" &&
          children[j].value.trim() === ""
        ) {
          j++;
        }

        const tableNode = children[j];
        if (tableNode?.type === "element" && tableNode.tagName === "table") {
          tableCount++;
          const descId = `table-desc-${tableCount}`;

          const captionAttr = node.attributes?.find((attr) => attr.name === "value");
          const captionText = typeof captionAttr?.value === "string"
            ? captionAttr.value
            : `Tableau ${tableCount}`;

          const hasCaption = tableNode.children.some(
            (child) => child.tagName === "caption"
          );

          if (!hasCaption) {
            tableNode.children.unshift({
              type: "element",
              tagName: "caption",
              properties: {
                id: descId,
                className: ["sr-caption"],
              },
              children: [{ type: "text", value: captionText }],
            });
          }

          tableNode.properties = {
            ...tableNode.properties,
            "aria-describedby": descId,
          };

          // Supprime <caption> + \n intermédiaires
          children.splice(i, j - i);
          i++; // continuer après <table>
        }
      }

      // Cas 2 : tableau sans caption ni <caption /> précédent
      else if (node.type === "element" && node.tagName === "table") {
        tableCount++;
        const descId = `table-desc-${tableCount}`;

        const hasCaption = node.children.some((child) => child.tagName === "caption");
        if (!hasCaption) {
          // 🔍 Chercher le heading le plus proche avant ce tableau
          let headingText = null;
          for (let k = i - 1; k >= 0; k--) {
            const prevNode = children[k];
            if (
              prevNode.type === "element" &&
              ["h1", "h2", "h3", "h4", "h5", "h6"].includes(prevNode.tagName)
            ) {
              headingText = prevNode.children
                .filter((c) => c.type === "text")
                .map((c) => c.value)
                .join(" ")
                .trim();
              break;
            }
          }

          const fallbackText = headingText
            ? `Table : ${headingText}`
            : `Table ${tableCount}`;

          node.children.unshift({
            type: "element",
            tagName: "caption",
            properties: {
              id: descId,
              className: ["sr-caption"],
            },
            children: [{ type: "text", value: fallbackText }],
          });
        }

        node.properties = {
          ...node.properties,
          "aria-describedby": descId,
        };

        i++;
      }
    }
  };
}
