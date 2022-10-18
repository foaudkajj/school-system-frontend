import { GenericList } from "./generic-list.model";

export class GenericListItem {
  id: string;
  name: string;
  listId: string;
  list: GenericList;
}
