// @ts-nocheck
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import ExampleTable from './index';

const meta: Meta<typeof ExampleTable> = {
  title: 'ExampleTable',
  component: ExampleTable,
  excludeStories: /.*Data$/,
  getPConnect: {
    getChildren: () => {
    },
    getPageReference: () => {
    },
    getInheritedProps: () => {
    },
    createComponent: config => {
    }
  },
  parameters: {
    type: 'TwoColumnForm'
  }
};

export default meta;
type Story = StoryObj<typeof ExampleTable>;

export const BaseExampleTable: Story = args => {
  const props = {
    getPConnect: () => {
      return {
        getChildren: () => {

        },
        getInheritedProps: () => {
        },
        createComponent: config => {
        }
      };
    }
  };

  return (
    <ExampleTable {...props} {...args}>
      {/* {regionAChildren}*/}
    </ExampleTable>
  );
};

BaseExampleTable.args = {
};
