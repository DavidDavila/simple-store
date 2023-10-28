export type TemplatesT = { item: string; itemCollapsible: string };

export const TEMPLATES: TemplatesT = {
  item: '<div class="json__item  "><div class="json__key ">%KEY% : <div class="json__value json__value--%TYPE%">%VALUE%</div></div></div>',
  itemCollapsible:
    '<label class="json__item json__item--collapsible"><input type="checkbox" %OPEN% class="json__toggle"/><div class="json__key "><span>%KEY%</span> : <div class="json__value json__value--type-%TYPE%">%VALUE%</div></div>%CHILDREN%</label>',
};
