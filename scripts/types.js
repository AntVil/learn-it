/**
 * @typedef {number & {__type: "cardId"}} CardId
 * @typedef {string & {__type: "folder"}} Folder
 * @typedef {{id: CardId, folder: Folder, front: string, back: string, hint: string?}} RawCard
 * @typedef {RawCard & {stared: boolean}} Card
 */
