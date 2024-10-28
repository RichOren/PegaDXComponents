import { BooleanDisplay, NoValue } from '@pega/cosmos-react-core';

function CheckCross({ value }: { value: boolean | 'true' | 'false' | null | undefined }) {
  let markup;
  switch (value) {
    case true:
    case 'true':
      // eslint-disable-next-line react/jsx-boolean-value
      markup = <BooleanDisplay value={true} trueLabel='True' falseLabel='False' />;
      break;
    case false:
    case 'false':
      markup = <BooleanDisplay value={false} trueLabel='True' falseLabel='False' />;
      break;
    case null:
    case undefined:
      markup = <NoValue />;
      break;
    default:
      markup = value;
  }
  return markup;
}

export default CheckCross;
