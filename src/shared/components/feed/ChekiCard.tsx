import { Box, Card, CardBody, Heading, Stack, Text, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion'
import React from 'react'

export const ChekiCard = () => {
  const [flip, setFlip] = React.useState(true);
  return (
    <Box width={'100%'}>
      {/* カードの領域 */}
      <motion.div
        transition={{ duration: 0.3 }}
        animate={{ rotateY: flip ? 0 : 180 }}
        onClick={() => setFlip((prevState) => !prevState)}
      >
        {/* both side content */}
        <motion.div
          transition={{ duration: 0.3 }}
          animate={{ rotateY: flip ? 0 : 180 }}
          style={{ width: '100%', height: '100%', position: 'relative' }}
        >
          {/* frontside content */}
          <motion.div
            style={{ backfaceVisibility: 'hidden', position: 'absolute', width: '100%', height: '100%' }}
            transition={{ duration: 0.3 }}
            animate={{ rotateY: flip ? 0 : 180 }}
          >
            <FrontFace />
          </motion.div>

          {/* backside content */}
          <motion.div
            style={{ backfaceVisibility: 'hidden', position: 'absolute', width: '100%', height: '100%' }}
            initial={{ rotateY: 180 }}
            animate={{ rotateY: flip ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <BackFace />
          </motion.div>
          {/* カードがある領域の高さを維持するため、不可視のカード要素を導入 */}
          <Box visibility={'hidden'}>
            <FrontFace />
          </Box>
        </motion.div>
      </motion.div>
    </Box>
  )
}

const FrontFace = () => {
  return (
    <Card maxW='sm'>
      <CardBody>
        <Image
          src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
          alt='Green double couch with wooden legs'
          borderRadius='sm'
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md'>Front side</Heading>
          <Text>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces, earthy toned spaces and for people who love a chic design with a
            sprinkle of vintage design.
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}
const BackFace = () => {
  return (
    <Card maxW='sm' position='absolute' height={'100%'} width={'100%'}>
      <CardBody>
        <Stack mt='6' spacing='3'>
          <Heading size='md'>Back side</Heading>
          {/* <Text>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces, earthy toned spaces and for people who love a chic design with a
            sprinkle of vintage design.
          </Text> */}
        </Stack>
      </CardBody>
    </Card>
  );
}