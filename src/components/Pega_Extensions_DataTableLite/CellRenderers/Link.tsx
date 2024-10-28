import { Link, NoValue } from '@pega/cosmos-react-core';
import { ReactChild, ReactFragment, ReactPortal } from 'react';

import { isAccessibleValue } from './Utils';

function LinkRenderer(value: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined, { href = '', target = '_self' } = {}) {
  const hrefVal = `${href}${value}`;

  if (!isAccessibleValue(value)) return <NoValue />;

  return (
    <Link href={hrefVal} target={target}>
      {value}
    </Link>
  );
}

export default {
  Email: ({ value }: { value: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined }) => LinkRenderer(value, { href: 'mailto:' }),
  URL: ({ value }: { value: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined }) => LinkRenderer(value, { target: '_blank' }),
  Phone: ({ value }: { value: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined }) => LinkRenderer(value, { href: 'tel:' })
};
