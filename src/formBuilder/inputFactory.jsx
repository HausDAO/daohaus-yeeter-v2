import React from 'react';

import AbiInput from './abiInput';
import AddressInput from './addressInput';
import BoolSelect from './boolSelect';
import CheckGate from './checkGate';
import CheckSwitch from './checkSwitch';
import GatedInput from './gatedInput';
import GenericFormDisplay from './genericFormDisplay';
import GenericInput from './genericInput';
import GenericTextarea from './genericTextArea';
import InputSelect from './inputSelect';
import LinkInput from './linkInput';
import MinionSelect from './minionSelect';
import MultiInput from './multiInput';
import PaymentInput from './paymentInput';
import TargetContract from './targetContract';
import ToggleForm from './toggleForm';
import TributeInput from './tributeInput';
import ListBox from './listBox';
import { createRegisterOptions } from '../utils/formBuilder';
import GenericSwitch from './genericSwitch';

export const InputFactory = props => {
  const { type, formCondition, required } = props;

  if (type === 'formCondition' && props[formCondition]) {
    const nestedInput = { ...props[formCondition] };
    if (nestedInput) {
      return (
        <InputFactory
          {...props}
          {...nestedInput}
          registerOptions={createRegisterOptions(nestedInput, required)}
        />
      );
    }
  }

  if (type === 'input') {
    return <GenericInput {...props} />;
  }
  if (type === 'gatedInput') {
    return <GatedInput {...props} />;
  }
  if (type === 'textarea') {
    return <GenericTextarea {...props} />;
  }
  if (type === 'inputSelect') {
    return <InputSelect {...props} />;
  }
  if (type === 'switch') {
    return <GenericSwitch {...props} />;
  }
  if (type === 'linkInput') {
    return <LinkInput {...props} />;
  }
  if (type === 'applicantInput') {
    return <AddressInput {...props} />;
  }
  if (type === 'tributeInput') {
    return <TributeInput {...props} />;
  }
  if (type === 'paymentInput') {
    return <PaymentInput {...props} />;
  }
  if (type === 'minionSelect') {
    return <MinionSelect {...props} />;
  }
  if (type === 'abiInput') {
    return <AbiInput {...props} />;
  }
  if (type === 'targetContract') {
    return <TargetContract {...props} />;
  }
  if (type === 'multiInput') {
    return <MultiInput {...props} />;
  }
  if (type === 'genericDisplay') {
    return <GenericFormDisplay {...props} />;
  }
  if (type === 'checkSwitch') {
    return <CheckSwitch {...props} />;
  }
  if (type === 'checkGate') {
    return <CheckGate {...props} />;
  }
  if (type === 'listBox') {
    return <ListBox {...props} />;
  }
  if (type === 'toggleForm') {
    return <ToggleForm {...props} />;
  }
  if (type === 'boolSelect') {
    return <BoolSelect {...props} />;
  }
  return null;
};
