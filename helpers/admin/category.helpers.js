const generateCategoryTree = (categories, parentId = "") => {
  let tree = [];

  categories.forEach((item) => {
    if (item.parent == parentId) {
      const children = generateCategoryTree(categories, item.id);
      tree.push({
        id: item.id,
        name: item.name,
        children: children,
      });
    }
  });
  return tree;
};

module.exports.generateCategoryTree = generateCategoryTree;
