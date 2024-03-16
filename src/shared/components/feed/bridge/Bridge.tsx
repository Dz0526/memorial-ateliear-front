import { Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { BridgeChekiCard } from './BridgeChekiCard';
import { Rainbow } from './Rainbow';

export const Bridge = () => {
  const [h, setH] = useState('0%');
  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (ref.current) {
      const scrollAmount = window.scrollY;
      const scrollHeight = ref.current.scrollHeight - window.innerHeight + 400;
      setH(`${(scrollAmount / scrollHeight) * 100}%`);
    }
    return;
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [h, ref]);

  return (
    <VStack pb={32}>
      <Text fontWeight={'bold'} zIndex={1}>
        温泉後のチキンから始まる架け橋
      </Text>
      <VStack position={'relative'} ref={ref}>
        <VStack spacing={'300px'} zIndex={1}>
          <BridgeChekiCard
            imageUrl='https://i.postimg.cc/Gt8cbL7B/image-10.png'
            caption='温泉後のチキン'
            memoryTimeContext='班長時代'
          />
          <BridgeChekiCard
            imageUrl='https://i.postimg.cc/7L9PVQJL/image-9.png'
            caption='シーシャチキン'
            memoryTimeContext='マンズの合格発表後'
          />
          <BridgeChekiCard
            imageUrl=''
            caption='Kcloudにて'
            memoryTimeContext='卒業前'
          />
        </VStack>
        <Rainbow
          as={motion.div}
          w={'20%'}
          position={'absolute'}
          top={0}
          sx={{
            '--bridge-feed-height': h,
            height: 'var(--bridge-feed-height)',
          }}
          transition={'0.1s ease'}
        />
      </VStack>
    </VStack>
  );
};
