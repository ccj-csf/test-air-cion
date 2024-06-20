import { BaseEmpty, Icon, SkeletonList } from '@/components';
import { ROUTES_GROUP_DETAIL, USER_LEVEL } from '@/constants';
import { formatNumberWithCommas } from '@/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface IGroup {
  id: number;
  name: string;
  avatarUrl: string;
  level: string;
  coins: number;
  score: number;
  isMember: boolean;
}

interface FriendsProps {
  groups: IGroup[];
  loading: boolean;
}
const Friends: React.FC<FriendsProps> = ({ groups, loading }) => {
  const router = useRouter();
  const goGroupDetail = (id: number) => {
    router.push(`${ROUTES_GROUP_DETAIL}/${id}`);
  };
  if (groups?.length <= 0 && loading) {
    return <SkeletonList />;
  }
  return (
    <main className="space-y-5  ">
      {!loading && groups.length > 0 ? (
        groups?.map((group) => (
          <div
            key={group.id}
            className="flex space-x-3 py-2"
            onClick={() => goGroupDetail(group.id)}
          >
            <section className="relative inline-block">
              <Image
                src={group.avatarUrl}
                width={48}
                height={48}
                alt="avatar"
                className="rounded-full"
              />
              {group.isMember && (
                <Image
                  src="/icons/member.svg"
                  width={24}
                  height={24}
                  alt="member icon"
                  className="absolute -top-3 right-3"
                />
              )}
            </section>
            <section className="flex flex-1 items-center justify-between">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium">{group.name}</span>
                <div className="flex items-center space-x-2 text-xs">
                  <Image
                    src={USER_LEVEL[group.level].icon}
                    width={16}
                    height={16}
                    alt="user-level"
                  />
                  <span>{USER_LEVEL[group.level].desc}</span>
                  <Image src="/icons/coin1.svg" width={16} height={16} alt="coin" />
                  <span>{formatNumberWithCommas(group.coins)}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2  text-lg font-medium">
                <Icon name="right-arrow" className="!text-base text-gray-700" />
              </div>
            </section>
          </div>
        ))
      ) : (
        <BaseEmpty />
      )}
    </main>
  );
};

const defaultGroups = [
  {
    id: 1,
    name: 'David',
    avatarUrl: 'https://github.com/david.png',
    level: 'Stubborn Bronze',
    coins: 10,
    score: 1234561,
    isMember: true,
  },
  {
    id: 2,
    name: 'Alice',
    avatarUrl: 'https://github.com/alice.png',
    level: 'Glory King',
    coins: 20,
    score: 71234561,
    isMember: false,
  },
  {
    id: 3,
    name: 'Bob',
    avatarUrl: 'https://github.com/bob.png',
    level: 'Noble Platinum',
    coins: 30,
    score: 123456165,
    isMember: false,
  },
  {
    id: 4,
    name: 'Charlie',
    avatarUrl: 'https://github.com/charlie.png',
    level: 'Supreme Star',
    coins: 40,
    score: 934561,
    isMember: false,
  },
];

const SecondarySquadTab = () => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      console.log('请求数据SecondarySquadTab :>> ');
      setGroups(defaultGroups);
      setLoading(false);
    }, 1500);
  }, []);
  return (
    <main className="mt-4 rounded-14 bg-gray-400 px-4 py-4">
      <Friends groups={groups} loading={loading} />
    </main>
  );
};

export default SecondarySquadTab;
