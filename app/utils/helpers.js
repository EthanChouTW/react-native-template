export const arrayToIds = ary => ary.map(o => o.id);

export const arrayToObjectById = ary =>
  ary.reduce((carry, current) => ({ ...carry, [current.id]: current }), {});

export const normalizedElements = elements => ({
  byId: arrayToObjectById(elements),
  Ids: arrayToIds(elements)
});

export const normalizedElementsWithMeta = (elements, meta) => ({
  ...normalizedElements(elements),
  meta
});
