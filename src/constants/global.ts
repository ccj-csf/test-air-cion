interface LevelDetail {
  desc: string;
  icon: string;
}
export const DEFAULT_LOCALE = 'en';

// 用户等级
// 定义一个接口，用于 `USER_LEVEL` 对象，其中每个键都遵循 `LevelDetail` 结构

interface UserLevel {
  [key: string]: LevelDetail;
}
export const USER_LEVEL: UserLevel = {
  'Stubborn Bronze': {
    desc: 'Stubborn Bronze',
    icon: '/icons/user-level1.svg',
  },
  'Order Silver': {
    desc: 'Order Silver',
    icon: '/icons/user-level2.svg',
  },
  'Glory Gold': {
    desc: 'Glory Gold',
    icon: '/icons/user-level3.svg',
  },
  'Noble Platinum': {
    desc: 'Noble Platinum',
    icon: '/icons/user-level4.svg',
  },
  'Eternal Diamond': {
    desc: 'Eternal Diamond',
    icon: '/icons/user-level5.svg',
  },
  'Supreme Star': {
    desc: 'Supreme Star',
    icon: '/icons/user-level6.svg',
  },
  'Glory King': {
    desc: 'Glory King',
    icon: '/icons/user-level7.svg',
  },
};

// 群等级
interface GroupLevel {
  [key: string]: LevelDetail;
}
export const GROUP_LEVEL: GroupLevel = {
  Bronze: {
    desc: 'Bronze',
    icon: '/icons/group-level1.svg',
  },
  Silver: {
    desc: 'Silver',
    icon: '/icons/group-level2.svg',
  },
  Gold: {
    desc: 'Gold',
    icon: '/icons/group-level3.svg',
  },
  Platinum: {
    desc: 'Platinum',
    icon: '/icons/group-level4.svg',
  },
  Diamond: {
    desc: 'Diamond',
    icon: '/icons/group-level5.svg',
  },
};
