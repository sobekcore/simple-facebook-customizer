export default {
  name: 'option',
  title: 'Option',
  type: 'document',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'selector',
      title: 'Selector',
      type: 'string',
    },
    {
      name: 'style',
      title: 'Style',
      type: 'text',
    },
    {
      name: 'depends',
      title: 'Depends on being enabled',
      type: 'reference',
      to: {
        type: 'option',
      },
    }
  ],
  preview: {
    select: {
      title: 'label',
    },
  },
};
