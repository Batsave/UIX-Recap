import { visit } from 'unist-util-visit';

export default function TableAccessibility() {
  console.log("[rehype] TableAccessibility plugin exécuté");
  return (tree) => {
     console.log("[rehype] TableAccessibility plugin exécuté");
    let tableCount = 0;
    const children = tree.children;

    for (let i = 0; i < children.length; i++) {
      const node = children[i];

      // Cas 1 : <caption value="..."> juste avant un tableau
      if (
        node.type === 'mdxJsxFlowElement' &&
        node.name === 'caption' &&
        children[i + 1] &&
        children[i + 1].type === 'table'
      ) {
        tableCount++;
        const tableNode = children[i + 1];

        // Extraire la valeur du composant <caption value="...">
        const captionAttr = node.attributes?.find(attr => attr.name === 'value');
        const customCaption = typeof captionAttr?.value === 'string'
          ? captionAttr.value
          : `Tableau ${tableCount}`;

        const descId = `table-desc-${tableCount}`;

        // Injecter <caption> dans le tableau
        const hasCaption = tableNode.children.some(child => child.tagName === 'caption');
        if (!hasCaption) {
          tableNode.children.unshift({
            type: 'element',
            tagName: 'caption',
            properties: {
              id: descId,
              className: ['sr-caption'],
            },
            children: [{ type: 'text', value: customCaption }],
          });
        }

        // Ajouter aria-describedby
        tableNode.properties = {
          ...tableNode.properties,
          'aria-describedby': descId,
        };

        // Supprimer le <caption /> externe
        children.splice(i, 1);
        i++; // Avancer au tableau
      }

      // Cas 2 : tableau sans Caption
      else if (node.type === 'table') {
        tableCount++;
        const descId = `table-desc-${tableCount}`;
        const fallback = `Tableau ${tableCount}`;

        const hasCaption = node.children.some(child => child.tagName === 'caption');
        if (!hasCaption) {
          node.children.unshift({
            type: 'element',
            tagName: 'caption',
            properties: {
              id: descId,
              className: ['sr-caption'],
            },
            children: [{ type: 'text', value: fallback }],
          });
        }

        node.properties = {
          ...node.properties,
          'aria-describedby': descId,
        };

        i++; // Passer au tableau suivant
      }
    }
  };
}
