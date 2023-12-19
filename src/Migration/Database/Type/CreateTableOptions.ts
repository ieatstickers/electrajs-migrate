import { TableCollationEnum } from "../Enum/TableCollationEnum";
import { TableEncodingEnum } from "../Enum/TableEncodingEnum";

export type CreateTableOptions = {
  collation?: TableCollationEnum;
  encoding?: TableEncodingEnum;
}
