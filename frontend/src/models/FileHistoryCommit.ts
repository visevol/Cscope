import { TypeFileCommitEvolution } from "../enum/TypeFileCommitEvolution";

export interface FileHistoryCommit {
  fileId: number;
  fileName: string;
  typeEvolution: TypeFileCommitEvolution;
  filetype: string;
  Date: Date;
}
