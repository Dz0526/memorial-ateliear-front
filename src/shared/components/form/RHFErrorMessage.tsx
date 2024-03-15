import { useFormState } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Text } from '@chakra-ui/react';

type FormErrorProps = {
  name: string;
  control: any;
};

export const RHFErrorMessage = ({ name, control }: FormErrorProps) => {
  const { errors } = useFormState({ control });
  return (
    <ErrorMessage
      name={name}
      errors={errors}
      render={({ message }) => <Text color={'danger'}>{message}</Text>}
    />
  );
};
