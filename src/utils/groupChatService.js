exports.generateRoomName = (members) => {
  let groupName = members[0].nick_name.split(" ").slice(-1).join(" ");
  if (members.length == 1) {
    return groupName;
  }
  const maxCount = 2;
  const length = members.length > maxCount ? maxCount : members.length;
  for (var i = 1; i < length; i++) {
    groupName =
      groupName + ", " + members[i].nick_name.split(" ").slice(-1).join(" ");
  }
  return groupName + ",...";
};
