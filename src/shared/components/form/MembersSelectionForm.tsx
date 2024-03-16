import { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import {
  Box,
  Flex,
  Spacer,
  Stack,
  Spinner,
  HStack,
  FormControl,
  Text,
  Input,
  Checkbox,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { UserCardBanner } from '../feed/UserCardBanner';

type Profile = {
  uuid: string;
  screenName: string;
  iconUrl: string | null;
  linkedUser: {
    username: string;
  };
  memo: string;
};

export const MembersSelectionForm = ({
  profiles,
  onChange,
}: {
  profiles: Profile[];
  onChange: (profile: Profile[]) => void;
}) => {
  const [selectedUsers, setSelectedUsers] = useState<Profile[]>([]);
  const [query, setQuery] = useState('');
  // const searchResult = useQuery({
  //   queryKey: ["items", "search", query],
  //   queryFn: async () => {
  //     // return await searchItems(query);
  //   },
  //   // placeholderData: keepPreviousData,
  // });
  const searchResult =
    query == ''
      ? []
      : profiles.filter(member =>
          member.screenName.toLowerCase().includes(query.toLowerCase()),
        );

  return (
    <Box>
      {/* search input form */}
      <FormControl>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <IoMdSearch color='gray.300' />
          </InputLeftElement>
          <Input
            placeholder='ユーザIDで検索'
            onChange={e => {
              setQuery(e.target.value);
            }}
          />
        </InputGroup>
      </FormControl>

      {/* search results */}
      <Stack
        zIndex={2}
        spacing={4}
        padding={2}
        paddingX={4}
        paddingBottom={4}
        bgColor={'white'}
        border={'solid'}
        borderColor={'gray.100'}
        borderRadius={'base'}
      >
        <HStack>
          <Text>検索結果</Text>
          <Spinner size={'xs'} />
        </HStack>
        {searchResult.length === 0 ? (
          <Text size={'xs'} color={'gray.900'}>
            該当する結果はありません
          </Text>
        ) : (
          searchResult.map(result => (
            <Flex key={result.uuid}>
              <Box
                onClick={() => {
                  const existingMember = selectedUsers.find(
                    user => user.uuid === result.uuid,
                  );
                  if (!existingMember) {
                    setSelectedUsers(value => [...value, result]);
                    onChange([...selectedUsers, result]);
                  }
                }}
              >
                <UserCardBanner
                  {...result}
                  iconImageUrl={result.iconUrl ? result.iconUrl : ''}
                />
              </Box>
            </Flex>
          ))
        )}
      </Stack>

      {/* selected users */}
      <Stack spacing={4} padding={2}>
        <Text fontSize='md'>選択中のユーザ</Text>
        {selectedUsers.length === 0 ? (
          <Text fontSize={'sm'} color={'gray.900'}>
            選択中のユーザはいません
          </Text>
        ) : (
          selectedUsers.map(result => (
            <Flex key={result.uuid}>
              <UserCardBanner
                {...result}
                iconImageUrl={result.iconUrl ? result.iconUrl : ''}
              />
              <Spacer />
              <Checkbox
                defaultChecked
                size={'lg'}
                onChange={e => {
                  if (e.target.checked) {
                    setSelectedUsers(value => [...value, result]);
                    onChange([...selectedUsers, result]);
                  } else {
                    setSelectedUsers(value =>
                      value.filter(user => user.uuid !== result.uuid),
                    );
                    onChange(
                      selectedUsers.filter(user => user.uuid !== result.uuid),
                    );
                  }
                }}
              />
            </Flex>
          ))
        )}
      </Stack>
    </Box>
  );
};

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
