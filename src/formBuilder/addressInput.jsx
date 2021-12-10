import React, { useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/react';

import GenericInput from './genericInput';
import { isEthAddress } from '../utils/general';
import { lookupENS } from '../utils/ens';

const AddressInput = props => {
  const { name, localForm, localValues } = props;

  const [helperText, setHelperText] = useState('Use ETH address or ENS');

  const { setValue } = localForm;

  useEffect(() => {
    if (localValues?.memberAddress) {
      setValue(name, localValues.memberAddress);
    }
  }, [localValues?.memberAddress]);

  const handleLookupENS = async ens => {
    setHelperText(<Spinner />);
    const result = await lookupENS(ens);
    if (result) {
      setHelperText(ens);
      setValue(name, result);
    } else {
      setHelperText('No ENS Set');
    }
  };

  const checkApplicant = e => {
    if (e?.target?.value == null) return;
    const input = e.target.value;
    if (isEthAddress(input)) {
      setHelperText('Valid Address');
    } else if (input.endsWith('.eth')) {
      handleLookupENS(input);
    } else {
      setHelperText('Use ETH address or ENS');
    }
  };

  return (
    <>
      <GenericInput
        {...props}
        onChange={checkApplicant}
        helperText={helperText}
      />
    </>
  );
};

export default AddressInput;
