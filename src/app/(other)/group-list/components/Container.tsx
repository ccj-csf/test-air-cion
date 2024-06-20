'use client';
import { BaseEmpty, Icon, SkeletonList } from '@/components';
import { Input } from '@/components/ui/input';
import { GROUP_LEVEL, ROUTES_GROUP_DETAIL } from '@/constants';
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
}

interface GroupsProps {
  groups: IGroup[];
  loading: boolean;
}
const Groups: React.FC<GroupsProps> = ({ groups, loading }) => {
  const router = useRouter();
  const goGroupDetail = (id: number) => {
    router.push(`${ROUTES_GROUP_DETAIL}/${id}`);
  };
  if (groups?.length <= 0 && loading) {
    return <SkeletonList count={10} />;
  }
  return (
    <main className="space-y-5 rounded-14 bg-gray-400 px-4 py-4">
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
            </section>
            <section className="flex flex-1 items-center justify-between">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium">{group.name}</span>
                <div className="flex items-center space-x-2 text-xs">
                  <Image
                    src={GROUP_LEVEL[group.level].icon}
                    width={16}
                    height={16}
                    alt="group-level"
                  />
                  <span>{GROUP_LEVEL[group.level].desc}</span>
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
    level: 'Bronze',
    coins: 10,
    score: 1234561,
  },
  {
    id: 2,
    name: 'Alice',
    avatarUrl: 'https://github.com/alice.png',
    level: 'Silver',
    coins: 20,
    score: 71234561,
  },
  {
    id: 3,
    name: 'Bob',
    avatarUrl: 'https://github.com/bob.png',
    level: 'Gold',
    coins: 30,
    score: 123456165,
  },
  {
    id: 4,
    name: 'Charlie',
    avatarUrl: 'https://github.com/charlie.png',
    level: 'Platinum',
    coins: 40,
    score: 934561,
  },
  {
    id: 5,
    name: 'Eve',
    avatarUrl: 'https://github.com/eve.png',
    level: 'Diamond',
    coins: 50,
    score: 1234561,
  },
  {
    id: 6,
    name: 'Frank',
    avatarUrl: 'https://github.com/frank.png',
    level: 'Diamond',
    coins: 60,
    score: 1234561,
  },
  {
    id: 7,
    name: 'Grace',
    avatarUrl: 'https://github.com/grace.png',
    level: 'Platinum',
    coins: 70,
    score: 1234561,
  },
  {
    id: 8,
    name: 'Harry',
    avatarUrl: 'https://github.com/harry.png',
    level: 'Silver',
    coins: 80,
    score: 1234561,
  },
  {
    id: 9,
    name: 'Ivy',
    avatarUrl: 'https://github.com/ivy.png',
    level: 'Platinum',
    coins: 90,
    score: 1234561,
  },
];

const Container = () => {
  const [keyword, setKeyword] = useState('');
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<IGroup[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (keyword.trim() === '') {
      setFilteredGroups(groups);
    } else {
      const filtered = groups.filter((group) =>
        group.name.toLowerCase().includes(keyword.toLowerCase()),
      );
      setFilteredGroups(filtered);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
    if (event.target.value.trim() === '') {
      setFilteredGroups(groups);
    }
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      console.log('请求数据Container :>> ');
      setGroups(defaultGroups);
      setFilteredGroups(defaultGroups);
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <main className="mt-4">
      <div className="mb-4 flex  w-full items-center space-x-2">
        <Input
          type="email"
          placeholder="Enter a name for search"
          value={keyword}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Icon name="search" className="!text-20" onClick={handleSearch}></Icon>
      </div>
      <Groups groups={filteredGroups} loading={loading} />
    </main>
  );
};

export default Container;
