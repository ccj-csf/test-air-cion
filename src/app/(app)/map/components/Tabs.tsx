import { BaseTabs } from '@/components';
import { useState } from 'react';
import CityList, { ICityItem } from './CityList';
import CountryList, { ICountryItem } from './CountryList';
const defaultCity = [
  {
    city: 'New York',
    totalUsers: 123456,
    totalScore: 101244,
  },
  {
    city: 'London',
    totalUsers: 123456,
    totalScore: 101244,
  },
  {
    city: 'Paris',
    totalUsers: 123456,
    totalScore: 101244,
  },
  {
    city: 'Berlin',
    totalUsers: 123456,
    totalScore: 101244,
  },
  {
    city: 'Tokyo',
    totalUsers: 123456,
    totalScore: 101244,
  },
];
const defaultCountry = [
  {
    country: 'America',
    totalUsers: 123456,
    totalScore: 101244,
    countryCode: 'US',
  },
  {
    country: 'London',
    totalUsers: 123456,
    totalScore: 101244,
    countryCode: 'GB',
  },
  {
    country: 'Paris',
    totalUsers: 123456,
    totalScore: 101244,
    countryCode: 'FR',
  },
  {
    country: 'Berlin',
    totalUsers: 123456,
    totalScore: 101244,
    countryCode: 'DE',
  },
  {
    country: 'Tokyo',
    totalUsers: 123456,
    totalScore: 101244,
    countryCode: 'JP',
  },
];

const Tabs = () => {
  const [counties, setCounties] = useState<ICountryItem[]>([]);
  const [cities, setCities] = useState<ICityItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeKey, setActiveKey] = useState('City');

  const tabs = [
    {
      key: 'City',
      label: 'City',
      component: (
        <div className=" px-4">
          <CityList items={cities} loading={loading} />
        </div>
      ),
    },
    {
      key: 'Country',
      label: 'Country',
      component: (
        <div className=" px-4">
          <CountryList items={counties} loading={loading} />
        </div>
      ),
    },
  ];
  const handleTabChange = (key: string) => {
    activeKey === 'City' ? setCities([]) : setCounties([]);
    setActiveKey(key);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (activeKey === 'City') {
        console.log('111 :>> ', 111);
        setCities(defaultCity);
      } else {
        console.log('222 :>> ', 222);
        setCounties(defaultCountry);
      }
    }, 1500);
  };
  return (
    <section className="rounded-14 bg-[#50556d] p-4 px-0">
      <BaseTabs activeKey={activeKey} tabs={tabs} onChange={handleTabChange}></BaseTabs>
    </section>
  );
};

export default Tabs;
