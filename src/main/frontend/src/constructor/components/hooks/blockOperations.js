export const moveUp = (blocks, blockId) => {
    const index = blocks.findIndex(b => b.id === blockId);
    if (index <= 0) return blocks;
    const newBlocks = [...blocks];
    [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
    return newBlocks;
};

export const moveDown = (blocks, blockId) => {
    const index = blocks.findIndex(b => b.id === blockId);
    if (index === -1 || index >= blocks.length - 1) return blocks;
    const newBlocks = [...blocks];
    [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
    return newBlocks;
};
