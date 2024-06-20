'use strict';
import { useToast } from '@/components';
import { CircleCheck, Info } from 'lucide-react';
import { useMemo } from 'react';

const useMessage = () => {
  const { toast } = useToast();

  const showMessage = useMemo(
    () => ({
      success: (content: string) => {
        toast({
          description: (
            <div className="flex h-[30px] items-center justify-center  space-x-1">
              <CircleCheck color="#19e166" size={18} /> <span>{content}</span>
            </div>
          ),
        });
      },
      error: (content: string) => {
        toast({
          description: (
            <div className="flex h-[30px] items-center justify-center space-x-1 text-red-500">
              <Info color="#FF4665" size={18} /> <span className="flex-1">{content}</span>
            </div>
          ),
        });
      },
    }),
    [toast],
  );

  return { showMessage };
};

export default useMessage;
