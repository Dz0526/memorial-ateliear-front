import { useState } from 'react';
import { IoMdSearch } from "react-icons/io";
import { Box, Flex, Spacer, Stack, Spinner, HStack, FormControl, Text, Input, Checkbox, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { UserCardBanner } from '../feed/UserCardBanner';



type Member = {
  id: string;
  screenName: string;
  iconImageUrl: string;
};

const mockedMembers: Member[] = [
  {
    id: '1',
    screenName: 'Daiki Ito',
    iconImageUrl: '',
  },
  {
    id: '2',
    screenName: 'Manato Kato',
    iconImageUrl: '',
  },
  {
    id: '3',
    screenName: 'Taishi Naka',
    iconImageUrl: '',
  },
  {
    id: '4',
    screenName: 'Yuta Fukino',
    iconImageUrl: '',
  },
];
export const MembersSelectionForm = () => {
  const [selectedUsers, setSelectedUsers] = useState<Member[]>([]);
  const [query, setQuery] = useState('');
  // const searchResult = useQuery({
  //   queryKey: ["items", "search", query],
  //   queryFn: async () => {
  //     // return await searchItems(query);
  //   },
  //   // placeholderData: keepPreviousData,
  // });
  const searchResult = query == "" ? [] : mockedMembers.filter(member => member.screenName.toLowerCase().includes(query.toLowerCase()));

  return (
    <Box>
      {/* search input form */}
      <FormControl>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <IoMdSearch color='gray.300' />
          </InputLeftElement>
          <Input placeholder='ユーザIDで検索' onChange={(e) => {
            setQuery(e.target.value);
          }} />
        </InputGroup>
      </FormControl>

      {/* search results */}
      <Stack zIndex={2} spacing={4} padding={2} paddingX={4} paddingBottom={4} bgColor={'white'} border={'solid'} borderColor={'gray.100'} borderRadius={'base'}>
        <HStack>
          <Text>検索結果</Text>
          <Spinner size={'xs'} />
        </HStack>
        {
          searchResult.length === 0
            ? <Text size={'xs'} color={'gray.900'}>該当する結果はありません</Text>
            : (
              searchResult.map(result => (
                <Flex key={result.id}>
                  <Box onClick={() => {
                    const existingMember = selectedUsers.find(user => user.id === result.id);
                    if (!existingMember) {
                      setSelectedUsers(value => [...value, result]);
                    }
                  }}>
                    <UserCardBanner  {...result} />
                  </Box>
                </Flex>
              ))
            )
        }
      </Stack>

      {/* selected users */}
      <Stack spacing={4} padding={2}>
        <Text fontSize='md'>選択中のユーザ</Text>
        {
          selectedUsers.length === 0
            ? <Text fontSize={'sm'} color={'gray.900'}>選択中のユーザはいません</Text>
            : (
              selectedUsers.map(result => (
                <Flex key={result.id}>
                  <UserCardBanner  {...result} />
                  <Spacer />
                  <Checkbox
                    defaultChecked
                    size={'lg'}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(value => [...value, result]);
                      } else {
                        setSelectedUsers(value => value.filter(user => user.id !== result.id));
                      }
                    }}
                  />
                </Flex>
              ))
            )
        }
      </Stack>


    </Box>
  )
}

// const MembersSelectionFrom = () => {
//   const [query, setQuery] = useState('');
//   const searchResult = mockedMembers.filter(member => member.name.includes(query));
//   // const searchResult = useQuery({
//   //   queryKey: ["items", "search", query],
//   //   queryFn: async () => {
//   //     return await searchItems(query);
//   //   },
//   //   placeholderData: keepPreviousData,
//   // });
//   return (
//     <FormControl>
//       <InputGroup>
//         <InputLeftElement pointerEvents='none'>
//           <IoMdSearch color='gray.300' />
//         </InputLeftElement>
//         <InputRightElement>

//         </InputRightElement>
//         <Input type='tel' placeholder='Phone number' />

//       </InputGroup>
//       <Stack>
//       </Stack>
//     </FormControl>
//   )

// }