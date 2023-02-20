import { selectDetails, selectDetailsArray } from "../models/groups";

export const KickNull = async (data: selectDetailsArray, groupname: string) => {
  const sorted: selectDetailsArray = [];
  data.forEach((value: selectDetails) => {
    if (value.groupMember != null) {
      let str = value.groupMember;
      value.groupMember = str.concat(", ", groupname);
      sorted.push(value);
    }
  });
  return sorted;
};

export const AcceptNull = async (data: selectDetailsArray) => {
  const sorted: string[] = [];
  data.forEach((value: selectDetails) => {
    if (value.groupMember == null) sorted.push(value.email);
  });
  return sorted;
};
