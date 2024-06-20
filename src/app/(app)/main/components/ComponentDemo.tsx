'use client';
import { BaseButton, BasePopup, BaseProgress, BaseSlideUpModal, BaseTabs } from '@/components';
import { SlideUpModalRef } from '@/components/base-slide-up-modal';
import useMessage from '@/hooks/useMessage';
import { IExampleData } from '@/types';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FC, memo, useRef, useState } from 'react';

interface ComponentDemoProps {}
const ComponentDemo: FC<ComponentDemoProps> = memo((props) => {
  const t = useTranslations('app');
  const [examples, setExamples] = useState<IExampleData>([]);
  const { showMessage } = useMessage();

  const handleClick1 = () => {
    console.log('1111 :>> ', 1111);
    showMessage.success('成功得消息');
    setTimeout(() => {
      showMessage.error(
        '失败得消息失败得消息失败得消息失败得消息失败得消息失败得消息失败得消息失败得消息失败得消息失败得消息失败得消息失败得消息',
      );
    }, 1000);
  };
  const handleClick = () => {
    console.log('111 :>> ', 111);
    setValue(value + 100);
  };
  const [value, setValue] = useState(100);
  const [activeKey, setActiveKey] = useState('tab1');

  const tabs = [
    {
      key: 'tab1',
      label: 'Tab 1',
      component: <div className="px-4">This is Tab 1 content</div>,
    },
    {
      key: 'tab2',
      label: 'Tab 2',
      component: <div>This is Tab 2 content</div>,
    },
    {
      key: 'tab3',
      label: 'Tab 3',
      component: <div>This is Tab 3 content</div>,
    },
  ];

  const handleTabChange = (key: string) => {
    console.log('key :>> ', key);
    setActiveKey(key);
  };
  const handleClick2 = () => {
    console.log('12456789 :>> ', 12456789);
    setIsOpen(true);
  };
  const [isOpen, setIsOpen] = useState(false);
  // useAsyncEffect(async () => {
  //   // 测试 CSR 请求
  //   const { data } = await getExample({ example: 'example' });
  //   data && setExamples(data);
  // }, []);
  const modalRef = useRef<SlideUpModalRef>(null);
  const modalRef1 = useRef<SlideUpModalRef>(null);
  const handleTale = () => {
    // window.Telegram.WebApp?.;
  };
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    alert('关闭弹窗');
    setIsVisible(false);
  };
  const handleOpen = () => {
    modalRef.current?.open();
    // setIsVisible(true);
  };
  const handleOpen1 = () => {
    modalRef1.current?.open();
    // setIsVisible(true);
  };
  return (
    <div>
      <h1>{t('title')}</h1>
      {/* <DrawerPopup isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div>ccj</div>
      </DrawerPopup> */}
      <BaseButton onClick={handleOpen}>打开弹窗</BaseButton>

      <BaseButton onClick={handleOpen1}>打开弹窗1</BaseButton>
      <Link href="/booster">
        <BaseButton>跳转到二级页面</BaseButton>
      </Link>
      <BaseSlideUpModal ref={modalRef}>
        <p>这是弹窗内容</p>
        <BaseButton onClick={() => modalRef.current?.close()}>关闭弹窗</BaseButton>
        <button onClick={handleClose}>关闭弹窗</button>
      </BaseSlideUpModal>
      <BaseSlideUpModal ref={modalRef1}>
        <p>这是弹窗内容1</p>
        <button onClick={handleClose}>关闭弹窗1</button>
      </BaseSlideUpModal>
      <BaseButton onClick={handleTale}>发送链接</BaseButton>
      {/* <BasePopover content="12345asdhjakdghjagdhasjgdasjh">
        <BaseButton>解释</BaseButton>
      </BasePopover>
      <BasePopover content="12345asdhjakdghjagdhasjgdasjh"></BasePopover> */}
      <BaseTabs activeKey={activeKey} tabs={tabs} onChange={handleTabChange} />
      <BasePopup isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div>12456</div>
      </BasePopup>
      <BaseButton className=" mt-10 w-[200px]" onClick={handleClick1}>
        测试消息按钮
      </BaseButton>
      <BaseButton className=" mt-10 w-[150px]" onClick={handleClick2}>
        测试弹窗按钮
      </BaseButton>
      <BaseButton className=" mt-10" onClick={handleClick} variant="custom">
        按钮
      </BaseButton>
      <BaseProgress value={value} max={1000}></BaseProgress>
    </div>
  );
});
ComponentDemo.displayName = 'ComponentDemo';
export default ComponentDemo;
