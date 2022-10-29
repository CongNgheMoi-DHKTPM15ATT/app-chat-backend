exports.generateRoomName = (members) => {
  let groupName = members[0].nick_name.split(' ').slice(-1).join(' ');
  for (var i = 1; i < 2; i++) {
    groupName = groupName + ', ' + members[i].nick_name.split(' ').slice(-1).join(' ')
  }
  return groupName + ',...';
}